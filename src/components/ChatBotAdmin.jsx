import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, Key, FileText, X, AlertTriangle, CheckCircle, Activity, Thermometer } from 'lucide-react';

const ADMIN_PIN = "230725"; // Default PIN

const ChatBotAdmin = ({ isOpen, onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    // Config State
    const [config, setConfig] = useState({
        groqKey1: "",
        groqKey2: "",
        openRouterKey: "",
        geminiKey: "",
        gptKey: "",
        customInstructions: "",
        temperature: 0.7
    });

    // Status State
    const [providerStatus, setProviderStatus] = useState([
        { name: "Groq Primary", online: false, latency: 0 },
        { name: "Groq Backup", online: false, latency: 0 },
        { name: "OpenRouter", online: false, latency: 0 },
        { name: "Google Gemini", online: false, latency: 0 },
        { name: "OpenAI GPT", online: false, latency: 0 }
    ]);

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Load from localStorage
            setConfig({
                groqKey1: localStorage.getItem('MANDELBROT_GROQ_KEY_1') || "",
                groqKey2: localStorage.getItem('MANDELBROT_GROQ_KEY_2') || "",
                openRouterKey: localStorage.getItem('MANDELBROT_OPENROUTER_KEY') || "",
                geminiKey: localStorage.getItem('MANDELBROT_GEMINI_KEY') || "",
                gptKey: localStorage.getItem('MANDELBROT_GPT_KEY') || "",
                customInstructions: localStorage.getItem('MANDELBROT_CUSTOM_INSTRUCTIONS') || "",
                temperature: parseFloat(localStorage.getItem('MANDELBROT_TEMPERATURE')) || 0.7
            });
            setIsAuthenticated(false);
            setPin("");
            setError("");

            // Check Connectivity
            const checkProviders = async () => {
                const endpoints = [
                    { name: "Groq Primary", url: "https://api.groq.com/openai/v1/models" },
                    { name: "Groq Backup", url: "https://api.groq.com/openai/v1/models" },
                    { name: "OpenRouter", url: "https://openrouter.ai/api/v1/models" },
                    { name: "Google Gemini", url: "https://generativelanguage.googleapis.com/v1beta/models" },
                    { name: "OpenAI GPT", url: "https://api.openai.com/v1/models" }
                ];

                const results = await Promise.all(endpoints.map(async (ep) => {
                    const start = Date.now();
                    try {
                        await fetch(ep.url);
                        return { name: ep.name, online: true, latency: Date.now() - start };
                    } catch (e) {
                        return { name: ep.name, online: false, latency: 0 };
                    }
                }));

                setProviderStatus(results);
            };

            checkProviders();
        }
    }, [isOpen]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Access Denied: Invalid Security Code");
            setPin("");
        }
    };

    const handleSave = () => {
        localStorage.setItem('MANDELBROT_GROQ_KEY_1', config.groqKey1);
        localStorage.setItem('MANDELBROT_GROQ_KEY_2', config.groqKey2);
        localStorage.setItem('MANDELBROT_OPENROUTER_KEY', config.openRouterKey);
        localStorage.setItem('MANDELBROT_GEMINI_KEY', config.geminiKey);
        localStorage.setItem('MANDELBROT_GPT_KEY', config.gptKey);
        localStorage.setItem('MANDELBROT_CUSTOM_INSTRUCTIONS', config.customInstructions);
        localStorage.setItem('MANDELBROT_TEMPERATURE', config.temperature);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-[#0a0a0a] border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl relative"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-red-900/10">
                    <div className="flex items-center gap-2 text-red-400">
                        <Lock size={16} />
                        <span className="text-xs font-mono font-bold tracking-widest uppercase">
                            Admin Console // Restricted
                        </span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    <AnimatePresence mode='wait'>
                        {!isAuthenticated ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLogin}
                                className="space-y-6 max-w-sm mx-auto py-10"
                            >
                                <div className="text-center space-y-2">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                        <Lock size={32} className="text-red-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Security Clearance Required</h3>
                                    <p className="text-slate-400 text-sm">Enter the 6-digit overrides code.</p>
                                </div>

                                <div className="space-y-2">
                                    <input
                                        type="password"
                                        maxLength={6}
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        placeholder="• • • • • •"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:border-red-500 focus:outline-none transition-colors"
                                        autoFocus
                                    />
                                    {error && (
                                        <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                                            <AlertTriangle size={12} /> {error}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Lock size={16} /> Verify Access
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {/* Left Column: Status & Simple Config */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-emerald-400 mb-2 border-b border-white/5 pb-2">
                                            <Activity size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Network Status</span>
                                        </div>
                                        <div className="space-y-2">
                                            {providerStatus.map((status, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${status.online ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-red-500'}`} />
                                                        <span className="text-slate-300 font-medium">{status.name}</span>
                                                    </div>
                                                    <span className={`font-mono ${status.online ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {status.online ? `${status.latency}ms` : 'OFFLINE'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-orange-400 mb-2 border-b border-white/5 pb-2">
                                            <div className="flex items-center gap-2">
                                                <Thermometer size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Creativity (Temperature)</span>
                                            </div>
                                            <span className="text-xs font-mono text-orange-400">{config.temperature}</span>
                                        </div>
                                        <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                            <input
                                                type="range"
                                                min="0"
                                                max="2"
                                                step="0.1"
                                                value={config.temperature}
                                                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                            />
                                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                                <span>PRECISE (0.0)</span>
                                                <span>BALANCED (1.0)</span>
                                                <span>RANDOM (2.0)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Advanced Config */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-cyan-400 mb-2 border-b border-white/5 pb-2">
                                            <Key size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">API Configuration (Overrides)</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-500 uppercase tracking-widest">Groq Primary Key</label>
                                                <input
                                                    type="password"
                                                    value={config.groqKey1}
                                                    onChange={(e) => setConfig({ ...config, groqKey1: e.target.value })}
                                                    placeholder="gsk_..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-slate-700"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-500 uppercase tracking-widest">Groq Backup Key</label>
                                                <input
                                                    type="password"
                                                    value={config.groqKey2}
                                                    onChange={(e) => setConfig({ ...config, groqKey2: e.target.value })}
                                                    placeholder="gsk_..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-slate-700"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-500 uppercase tracking-widest">OpenRouter Key</label>
                                                <input
                                                    type="password"
                                                    value={config.openRouterKey}
                                                    onChange={(e) => setConfig({ ...config, openRouterKey: e.target.value })}
                                                    placeholder="sk-or-..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-slate-700"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-500 uppercase tracking-widest">Gemini API Key</label>
                                                <input
                                                    type="password"
                                                    value={config.geminiKey}
                                                    onChange={(e) => setConfig({ ...config, geminiKey: e.target.value })}
                                                    placeholder="AIza..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-slate-700"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-500 uppercase tracking-widest">OpenAI GPT Key</label>
                                                <input
                                                    type="password"
                                                    value={config.gptKey}
                                                    onChange={(e) => setConfig({ ...config, gptKey: e.target.value })}
                                                    placeholder="sk-..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-slate-700"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-purple-400 mb-2 border-b border-white/5 pb-2">
                                            <FileText size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Additional Knowledge</span>
                                        </div>
                                        <textarea
                                            value={config.customInstructions}
                                            onChange={(e) => setConfig({ ...config, customInstructions: e.target.value })}
                                            placeholder="Add specific facts, new pricing, or rules here..."
                                            className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none resize-none custom-scrollbar placeholder-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 pt-4 border-t border-white/10">
                                    <button
                                        onClick={handleSave}
                                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                                    >
                                        {showSuccess ? <CheckCircle size={18} /> : <Save size={18} />}
                                        {showSuccess ? "Configuration Saved" : "Save System Configuration"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            </motion.div >
        </div >
    );
};

export default ChatBotAdmin;
