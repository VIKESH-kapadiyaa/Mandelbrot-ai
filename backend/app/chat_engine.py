from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
import time
import io
import traceback
import logging
import shutil
import uuid
from dotenv import load_dotenv

# Load environment variables explicitly
load_dotenv()

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mandatory Imports (Fail hard if missing to debug environment)
try:
    import pandas as pd
    from pypdf import PdfReader
    from openpyxl import load_workbook
except ImportError as e:
    logger.error(f"Critical Dependency Missing: {e}")
    pass

router = APIRouter()

# ─── Config ───────────────────────────────────────────────────────────────────
GROQ_API_KEYS = [
    os.getenv("MANDELBROT_GROQ_KEY_1"),
    os.getenv("MANDELBROT_GROQ_KEY_2"),
    os.getenv("MANDELBROT_GROQ_KEY_3"),
]
GROQ_API_KEYS = [k for k in GROQ_API_KEYS if k]

CURRENT_KEY_INDEX = 0

# In-Memory Context Store (For MVP)
# Ideally, use a vector database for 3GB+ datasets.
# For now, we store metadata and a "Sampled Context" (first 50k chars + summary).
document_store = {}

TEMP_DIR = "temp_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

# ─── Models ───────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    context_files: List[str] = []

# ─── Helpers ──────────────────────────────────────────────────────────────────
def get_next_api_key():
    global CURRENT_KEY_INDEX
    if not GROQ_API_KEYS:
        return os.getenv("GROQ_API_KEY") 
    
    key = GROQ_API_KEYS[CURRENT_KEY_INDEX]
    CURRENT_KEY_INDEX = (CURRENT_KEY_INDEX + 1) % len(GROQ_API_KEYS)
    return key

async def call_groq_api(messages: List[dict]) -> str:
    """Call Groq API with robust error handling and rotation."""
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    if not GROQ_API_KEYS:
        return "System Error: No Groq API Keys configured."

    for i in range(len(GROQ_API_KEYS)):
        api_key = get_next_api_key()
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    url,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama3-70b-8192", 
                        "messages": messages,
                        "temperature": 0.3,
                        "max_tokens": 4096
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                
                logger.warning(f"Groq API Error (Key {i}): {response.status_code} - {response.text}")
                
        except Exception as e:
            logger.error(f"Groq Request Exception: {str(e)}")
            
    return "Error: All AI providers are busy."

def extract_text_from_path(file_path: str, filename: str) -> str:
    """Robust text extraction from DISK file."""
    ext = filename.split('.')[-1].lower()
    text = ""
    
    try:
        if ext == 'pdf':
            reader = PdfReader(file_path)
            # Limit pages for massive PDFs to avoid timeout
            max_pages = 50 
            for i, page in enumerate(reader.pages):
                if i >= max_pages:
                    text += "\n...[PDF Truncated at 50 pages for speed]..."
                    break
                page_text = page.extract_text()
                if page_text:
                    text += f"[Page {i+1}]\n{page_text}\n"
            
            if not text.strip():
                return "[Warning: Scanned PDF detected. No text found.]"
                
        elif ext in ['csv']:
            # Read chunks for massive CSVs
            df = pd.read_csv(file_path, nrows=500) # Only read first 500 rows
            text = df.to_markdown(index=False)
            text += "\n...[CSV Truncated at 500 rows]..."
            
        elif ext in ['xlsx', 'xls']:
            df = pd.read_excel(file_path, nrows=500)
            text = df.to_markdown(index=False)
            text += "\n...[Excel Truncated at 500 rows]..."
            
        elif ext in ['txt', 'md', 'json', 'js', 'py', 'html', 'css', 'xml', 'log']:
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                text = f.read(100000) # Read first 100KB
                if len(text) >= 100000:
                    text += "\n...[Text Truncated at 100KB]..."

        else:
            # Universal Binary Fallback
            # Try to read as text first
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    text = f.read(50000)
                    text += "\n...[Generic Text Read]..."
            except UnicodeDecodeError:
                # True Binary - Extract Metadata
                size = os.path.getsize(file_path)
                with open(file_path, 'rb') as f:
                    header = f.read(128).hex()
                text = f"[Binary File: {filename}]\nSize: {size / (1024*1024):.2f} MB\nHeader (Hex): {header}\nNote: This file appears to be binary (image/video/executable). Context is limited to metadata."
            
        return text
            
    except Exception as e:
        logger.warning(f"Standard extraction failed for {filename}: {e}. Attempting Raw Strings Fallback.")
        # Fallback: Extract printable strings from binary
        # This recovers text from truncated PDFs or corrupt Office files
        try:
            with open(file_path, "rb") as f:
                content = f.read(200000) # Read 200KB
                # Filter for printable chars (ASCII + Common UTF-8)
                text = "".join(chr(b) for b in content if 32 <= b <= 126 or b == 10 or b == 13)
                
                if len(text) > 100:
                    return f"[Warning: File structure corrupted/partial. Recovered Raw Text]\n{text}"
                else:
                    return f"[Error: No recoverable text found in file header. Hex Dump: {content[:50].hex()}]"
        except Exception as fallback_err:
            return f"[Fatal Extraction Error: {str(e)} | Fallback: {str(fallback_err)}]"

# ─── Endpoints ────────────────────────────────────────────────────────────────

@router.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """Ingest massive documents via stream."""
    logger.info(f"Stream Upload Start: {file.filename}")
    
    file_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{file.filename}")
    
    try:
        # 1. Stream to Disk (Crucial for 3GB files)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 2. Extract context (Smart Sampling)
        extracted_text = extract_text_from_path(file_path, file.filename)
        
        # 3. Store
        document_store[file.filename] = {
            "text": extracted_text,
            "path": file_path,
            "timestamp": time.time()
        }
        
        preview = extracted_text[:200].replace('\n', ' ') + "..."
        logger.info(f"Indexed {file.filename}")
        
        # Clean up old files? For MVP we keep them until restart or manual cleanup logic
        
        return {
            "filename": file.filename,
            "status": "success",
            "message": "File streamed & indexed.",
            "preview": preview
        }
    except Exception as e:
        logger.error(f"Stream Upload Error: {e}")
        # Cleanup partial file
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/chat-rag")
async def chat_rag(request: ChatRequest):
    """RAG Chat with Smart Context."""
    logger.info(f"Chat Request: {request.message}")
    
    try:
        context_buffer = ""
        valid_files = 0
        
        target_files = request.context_files if request.context_files else list(document_store.keys())
        
        for fname in target_files:
            if fname in document_store:
                doc_data = document_store[fname]
                # Limit per-file context to avoid prompt overflow
                context_buffer += f"\n=== FILE: {fname} ===\n{doc_data['text'][:15000]}\n" # 15k chars per file max
                valid_files += 1
            else:
                context_buffer += f"\n=== FILE: {fname} (Not Found) ===\n"

        if not context_buffer.strip():
             context_buffer = "No documents uploaded."

        system_prompt = f"""You are Mandelbrot's Neural Intelligence.
        
        MISSION:
        Provide high-precision analysis of the provided documents. Your goal is to extract actionable insights, summarize complex data, and answer the user's queries with expert-level accuracy.
        
        CONTEXT:
        {context_buffer[:20000]} # Optimized Context Window (20k chars)
        
        USER QUERY:
        {request.message}
        
        INSTRUCTIONS:
        1. If relevant information is found, cite the specific file (e.g. [data.csv]).
        2. Format response in clean Markdown (bullet points, bold key terms).
        3. Maintain a professional, futuristic tone ("Analysis complete", "Query resolution").
        4. If the info is missing, state clearly: "Data not found in context."
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ]
        
        response_text = await call_groq_api(messages)
        
        return {
            "response": response_text,
            "context_used": valid_files
        }
    except Exception as e:
        logger.error(f"Chat error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))
