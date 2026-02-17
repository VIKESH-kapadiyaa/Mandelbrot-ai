"""
Neural Workflow Engine — Real FastAPI Backend
Uses OpenRouter (Gemini 3 Pro) for AI-powered task planning & execution.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import uvicorn
import uuid
import json
import httpx
import asyncio
import os
from datetime import datetime
from app.tools_registry import TOOL_CATEGORIES, get_tool_count, get_planner_tool_summary

# ─── Config ───────────────────────────────────────────────────────────────────
OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY",
    "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"
)
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
AI_MODEL = "google/gemini-2.0-flash-001"  # Fast + capable via OpenRouter

# ─── App Init ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Neural Workflow Engine API",
    description="Real AI-powered workflow engine for Mandelbrot",
    version="3.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import Chat Engine (RAG)
from app.chat_engine import router as chat_router
app.include_router(chat_router)

# ─── Models ───────────────────────────────────────────────────────────────────
class WorkflowRequest(BaseModel):
    prompt: str
    user_id: Optional[str] = None

class ExecuteStepRequest(BaseModel):
    workflow_id: str
    step_id: int
    tool: str
    action: str
    context: Optional[str] = None

# ─── In-Memory Store ──────────────────────────────────────────────────────────
workflows_store = {}

# ─── AI Helper ────────────────────────────────────────────────────────────────
async def call_ai(system_prompt: str, user_prompt: str, temperature: float = 0.3) -> str:
    """Call AI model via OpenRouter."""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://mandelbrot.ai",
                "X-Title": "Mandelbrot Neural Engine",
            },
            json={
                "model": AI_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": temperature,
                "max_tokens": 4096,
            },
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail=f"AI service error: {response.status_code} - {response.text}"
            )

        data = response.json()
        return data["choices"][0]["message"]["content"]


# ─── SYSTEM PROMPTS ──────────────────────────────────────────────────────────

PLANNER_PROMPT = f"""You are the Neural Workflow Engine Planner — an AI that breaks down complex business tasks into structured execution plans.

You are used by solo founders and small businesses to automate their workflows.

When given a task, you must:
1. Analyze the intent
2. Break it into 3-8 concrete, actionable steps
3. For each step, assign the best tool from this list:
4. You must ONLY use tools from the provided list. Do not make up tool names.

AVAILABLE TOOLS ({get_tool_count()} total across {len(TOOL_CATEGORIES)} categories):

{get_planner_tool_summary()}

RESPOND WITH VALID JSON ONLY. No markdown, no explanation. Just this format:
{{
  "workflow_name": "Short descriptive name",
  "steps": [
    {{
      "id": 1,
      "tool": "tool.name",
      "action": "What this step does",
      "input_description": "What context/data this step needs"
    }}
  ]
}}"""

EXECUTOR_PROMPT = """You are the Neural Workflow Engine Executor — an AI that produces REAL, USABLE output for each step of a workflow.

You are helping a solo founder or small business automate their work. Your outputs must be PRODUCTION-READY — not placeholders, not examples, but actual content they can copy-paste and use immediately.

WORKFLOW CONTEXT:
{context}

CURRENT STEP:
Tool: {tool}
Action: {action}

RULES:
1. Produce the ACTUAL deliverable for this step
2. If drafting an email, write the FULL email with subject line, greeting, body, and signature
3. If writing content, write the COMPLETE piece
4. If generating code, write WORKING code with comments
5. If analyzing, provide SPECIFIC insights with data points
6. If researching, provide REAL findings with actionable recommendations
7. Be professional, concise, and immediately useful
8. Format your output nicely with markdown headers and sections

Produce the output now:"""


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "service": "Neural Workflow Engine API",
        "version": "3.0.0",
        "status": "operational",
        "model": AI_MODEL,
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/api/plan")
async def plan_workflow(request: WorkflowRequest):
    """
    Takes a natural language prompt and returns a real AI-generated task plan.
    """
    try:
        raw_response = await call_ai(PLANNER_PROMPT, request.prompt)

        # Clean response (strip markdown code fences if present)
        cleaned = raw_response.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1]  # Remove first line
        if cleaned.endswith("```"):
            cleaned = cleaned.rsplit("```", 1)[0]  # Remove last fence
        cleaned = cleaned.strip()

        plan = json.loads(cleaned)

        workflow_id = str(uuid.uuid4())[:8]
        workflow = {
            "workflow_id": workflow_id,
            "prompt": request.prompt,
            "workflow_name": plan.get("workflow_name", "Untitled Workflow"),
            "status": "planned",
            "steps": plan.get("steps", []),
            "results": {},
            "created_at": datetime.utcnow().isoformat(),
        }

        workflows_store[workflow_id] = workflow
        return workflow

    except json.JSONDecodeError as e:
        # If AI doesn't return valid JSON, return the raw response for debugging
        return {
            "workflow_id": str(uuid.uuid4())[:8],
            "prompt": request.prompt,
            "workflow_name": "Workflow",
            "status": "planned",
            "steps": [
                {"id": 1, "tool": "ai.analyze_data", "action": "Process your request", "input_description": request.prompt}
            ],
            "results": {},
            "created_at": datetime.utcnow().isoformat(),
            "parse_note": "AI response was reformatted into a single step"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/execute-step")
async def execute_step(request: ExecuteStepRequest):
    """
    Execute a single step of a workflow and return real AI-generated output.
    """
    try:
        # Build context from previous results
        context = f"Original prompt: {request.context or 'N/A'}"
        if request.workflow_id in workflows_store:
            wf = workflows_store[request.workflow_id]
            context = f"Original prompt: {wf['prompt']}\n"
            if wf.get("results"):
                context += "Previous step results:\n"
                for step_id, result in wf["results"].items():
                    context += f"  Step {step_id}: {result[:200]}...\n"

        # Get real AI output
        executor_prompt = EXECUTOR_PROMPT.format(
            context=context,
            tool=request.tool,
            action=request.action,
        )

        result = await call_ai(
            "You are a professional AI assistant that produces real, usable business outputs.",
            executor_prompt,
            temperature=0.4,
        )

        # Store result
        if request.workflow_id in workflows_store:
            workflows_store[request.workflow_id]["results"][str(request.step_id)] = result

        return {
            "workflow_id": request.workflow_id,
            "step_id": request.step_id,
            "tool": request.tool,
            "action": request.action,
            "status": "completed",
            "output": result,
            "timestamp": datetime.utcnow().isoformat(),
        }

    except Exception as e:
        return {
            "workflow_id": request.workflow_id,
            "step_id": request.step_id,
            "status": "error",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat(),
        }


@app.post("/api/execute-workflow")
async def execute_full_workflow(request: WorkflowRequest):
    """
    Plan AND execute an entire workflow end-to-end.
    Returns all results.
    """
    # Step 1: Plan
    plan_response = await plan_workflow(request)
    workflow_id = plan_response["workflow_id"]
    steps = plan_response["steps"]

    results = []

    # Step 2: Execute each step
    for step in steps:
        step_request = ExecuteStepRequest(
            workflow_id=workflow_id,
            step_id=step["id"],
            tool=step["tool"],
            action=step["action"],
            context=request.prompt,
        )
        result = await execute_step(step_request)
        results.append(result)

        # Small delay to avoid rate limiting
        await asyncio.sleep(0.5)

    return {
        "workflow_id": workflow_id,
        "prompt": request.prompt,
        "workflow_name": plan_response.get("workflow_name"),
        "status": "completed",
        "plan": steps,
        "results": results,
        "completed_at": datetime.utcnow().isoformat(),
    }


@app.get("/api/workflows/{workflow_id}")
async def get_workflow(workflow_id: str):
    """Get a workflow and its results."""
    if workflow_id not in workflows_store:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflows_store[workflow_id]


@app.get("/api/tools")
async def list_tools():
    """List all available tools."""
    return {
        "count": get_tool_count(),
        "categories": TOOL_CATEGORIES,
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# Force Reload: Updated Chat Engine Logic

# Force Reload: Upgraded 3GB Stream Logic

# Force Reload: Partial Upload Fix
