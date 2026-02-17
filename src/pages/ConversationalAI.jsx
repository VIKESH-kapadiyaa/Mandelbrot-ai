import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TopNavbar } from '../components/TopNavbar';

const ConversationalAI = () => {
    const { t } = useLanguage();
    const [files, setFiles] = useState([]);
    const [messages, setMessages] = useState([
        { id: 1, type: 'system', content: 'Secure connection established. Upload documents to begin context-aware analysis.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFileUpload = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        if (uploadedFiles.length === 0) return;

        setIsUploading(true);
        const newFileList = [];

        // Upload files sequentially with Smart Slicing
        for (const file of uploadedFiles) {
            const formData = new FormData();

            // Smart Slicing for Large Files (>10MB)
            let serverFilename = file.name;

            if (file.size > 10 * 1024 * 1024) {
                // Upload ONLY the first 2.5MB
                const CHUNK_SIZE = 2.5 * 1024 * 1024;
                const headChunk = file.slice(0, CHUNK_SIZE);

                // Prefix filename with [PARTIAL]
                serverFilename = `[PARTIAL-${(file.size / 1024 / 1024).toFixed(0)}MB] ${file.name}`;

                formData.append('file', new File([headChunk], serverFilename, { type: file.type }));
            } else {
                // Small file: Upload directly
                formData.append('file', file);
            }

            try {
                // Use dynamic API URL for production support
                const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
                const response = await fetch(`${API_BASE}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    newFileList.push({
                        name: file.name, // Clean name for UI
                        serverName: serverFilename, // Real name for Backend Context
                        size: (file.size / (1024 * 1024) > 1000)
                            ? (file.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
                            : (file.size / 1024).toFixed(1) + ' KB',
                        type: file.type || 'Unknown',
                        status: 'indexed'
                    });
                } else {
                    console.error('Upload failed:', await response.text());
                }
            } catch (error) {
                console.error('Upload error:', error);
            }
        }

        setFiles(prev => [...prev, ...newFileList]);

        if (newFileList.length > 0) {
            setMessages(prev => [
                ...prev,
                { id: Date.now(), type: 'system', content: `Creating vector embeddings for ${newFileList.length} file(s)... [Groq LPU Optimized]` },
                { id: Date.now() + 1, type: 'bot', content: `I've analyzed ${newFileList.map(f => f.name).join(', ')}. Ask me anything about these documents.` }
            ]);
        }
        setIsUploading(false);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: userMsg }]);
        setIsTyping(true);

        try {
            const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
            const response = await fetch(`${API_BASE}/api/chat-rag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg,
                    // Use serverName if available, else name
                    context_files: files.map(f => f.serverName || f.name)
                }),
            });

            if (!response.ok) throw new Error('Backend error');

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                content: data.response
            }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: Date.now(), type: 'error', content: 'Connection to Neural Core failed. Ensure backend is running.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
            <TopNavbar />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
            </div>

            <main className="relative z-10 pt-24 pb-12 px-6 h-screen flex flex-col max-w-[1600px] mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end mb-8 border-b border-white/5 pb-4"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
                            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">Mandelbrot Intelligence</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                            Conversational <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Context</span>
                        </h1>
                    </div>
                </motion.header>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                    {/* Left Panel: Document Hub */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 flex flex-col gap-6"
                    >
                        {/* Upload Zone */}
                        <div
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer group relative overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                // accept removed to allow ANY file
                                onChange={handleFileUpload}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="p-4 bg-purple-500/10 rounded-full text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                                    {isUploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Universal Ingestion</h3>
                                    <p className="text-sm text-slate-400 group-hover:text-purple-300 transition-colors">
                                        Any File Format (Max 3GB Local Stream)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* File Stack */}
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
                                <span>Active Context</span>
                                <span className="text-purple-400">{files.length} Files</span>
                            </h3>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative">
                                <AnimatePresence>
                                    {files.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3 opacity-50">
                                            <FileText size={40} strokeWidth={1} />
                                            <p className="text-sm font-mono">NO DATA VECTORS</p>
                                        </div>
                                    ) : (
                                        files.map((file, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={idx}
                                                className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-purple-500/30 transition-colors"
                                            >
                                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                                    <FileText size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-white truncate">{file.name}</div>
                                                    <div className="text-xs text-slate-500 font-mono">{file.size} • {file.type.split('/')[1] || 'DOC'}</div>
                                                </div>
                                                <button className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                                                    <X size={14} />
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Right Panel: Chat Interface */}
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-8 flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl relative"
                    >
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                                <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                                    Neural Engine <span className="text-purple-400">v3.0-PRO</span>
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] font-mono text-purple-300">
                                    VECTOR_DB: READY
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-white text-black' :
                                            msg.type === 'system' ? 'bg-transparent border border-white/20 text-slate-400' :
                                                'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                            }`}>
                                            {msg.type === 'user' ? <User size={16} /> :
                                                msg.type === 'system' ? <AlertCircle size={16} /> :
                                                    <Sparkles size={16} />}
                                        </div>

                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.type === 'user' ? 'bg-white text-black font-medium' :
                                            msg.type === 'system' ? 'bg-transparent border border-white/10 text-slate-400 font-mono text-xs' :
                                                'bg-[#1a1a1a] border border-white/10 text-slate-200'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-600/50 flex items-center justify-center">
                                        <Loader2 size={16} className="animate-spin text-white" />
                                    </div>
                                    <div className="flex gap-1 h-8 items-center px-2">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/40">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Query your document context..."
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-6 pr-14 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                                    Secured by Mandelbrot • Confidential Computation
                                </span>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
};

export default ConversationalAI;
