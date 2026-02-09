import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Terminal, ChevronDown, Activity, Shield } from 'lucide-react';

const countries = [
    { code: 'IN', name: 'India', dial: '+91' },
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'AE', name: 'UAE', dial: '+971' },
    { code: 'SG', name: 'Singapore', dial: '+65' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'CA', name: 'Canada', dial: '+1' },
    { code: 'DE', name: 'Germany', dial: '+49' },
    { code: 'FR', name: 'France', dial: '+33' },
    { code: 'JP', name: 'Japan', dial: '+81' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
    { code: 'NL', name: 'Netherlands', dial: '+31' },
];

const FireParticle = ({ x, y, edge, onComplete }) => {
    const sizeBase = Math.random() * 20 + 10;
    const duration = Math.random() * 0.6 + 0.4;
    let xDrift = (Math.random() - 0.5) * 60;
    let yEnd = -100 - Math.random() * 80;
    const initialScale = Math.random() * 0.5 + 0.8;

    useEffect(() => {
        const timer = setTimeout(onComplete, duration * 1000);
        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0.2, initialScale, initialScale * 0.5, 0],
                x: [0, xDrift * 0.3, xDrift],
                y: [0, yEnd * 0.4, yEnd]
            }}
            transition={{ duration: duration, ease: "easeOut", times: [0, 0.2, 0.6, 1] }}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: sizeBase,
                height: sizeBase * 1.5,
                background: `radial-gradient(circle at 50% 80%, white 0%, gold 20%, orange 50%, orangered 80%, transparent 100%)`,
                borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                pointerEvents: 'none',
                boxShadow: `0 0 ${sizeBase}px rgba(255, 69, 0, 0.6)`,
                filter: 'blur(2px)',
                mixBlendMode: 'screen',
                zIndex: 60
            }}
        />
    );
};

// System Terminal Component (Standalone Left Panel)
const SystemTerminal = ({ formData }) => {
    const [lines, setLines] = useState([
        { text: "INITIALIZING_SYSTEM_CORE...", type: 'system' },
        { text: "CONNECTING_TO_MANDELBROT_NETWORK...", type: 'system' },
        { text: "ESTABLISHING_SECURE_CHANNEL...", type: 'success' },
        { text: "WAITING_FOR_USER_INPUT...", type: 'info' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        const activityInterval = setInterval(() => {
            const activities = [
                "OPTIMIZING_NEURAL_PATHWAYS...",
                "CALCULATING_PROBABILITIES...",
                "SCANNING_FOR_ANOMALIES...",
                "UPDATING_SECURITY_PROTOCOLS...",
                "SYNCING_WITH_MAIN_DATABASE...",
                "ALLOCATING_VIRTUAL_RESOURCES..."
            ];
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            setLines(prev => [...prev.slice(-15), { text: randomActivity, type: 'debug' }]);
        }, 2000); // Slightly faster activity

        return () => clearInterval(activityInterval);
    }, []);

    useEffect(() => {
        if (formData.name) {
            setLines(prev => [...prev.slice(-15), {
                text: `DETECTED_USER: ${formData.name.toUpperCase()}`,
                type: 'input'
            }]);
        }
    }, [formData.name]);

    useEffect(() => {
        if (formData.service) {
            setLines(prev => [...prev.slice(-15), {
                text: `ANALYZING_REQUEST: ${formData.service.toUpperCase()}`,
                type: 'input'
            }]);
        }
    }, [formData.service]);

    useEffect(() => {
        if (formData.country) {
            setLines(prev => [...prev.slice(-15), {
                text: `LOCATING_REGION_NODE: ${formData.country}`,
                type: 'info'
            }]);
        }
    }, [formData.country]);

    const getLineColor = (type) => {
        switch (type) {
            case 'system': return 'text-slate-500';
            case 'success': return 'text-emerald-500';
            case 'input': return 'text-cyan-400';
            case 'debug': return 'text-slate-700';
            case 'info': return 'text-orange-400';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="h-full flex flex-col font-mono text-xs overflow-hidden relative bg-[#030303] p-5">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2 z-10">
                <div className="flex items-center gap-2 text-slate-400">
                    <Activity size={12} className="text-cyan-500 animate-pulse" />
                    <span>SYSTEM_LOG</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                </div>
            </div>

            {/* Terminal Output */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-none z-10 font-['Fira_Code',_monospace]">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-2 ${getLineColor(line.type)}`}
                    >
                        <span className="opacity-30 select-none">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
                        <span>{'>'}</span>
                        <span>{line.text}</span>
                    </motion.div>
                ))}
                <div className="flex gap-2 text-cyan-500 animate-pulse">
                    <span className="opacity-30 select-none invisible">00:00:00</span>
                    <span>{'>'}</span>
                    <span className="w-2 h-4 bg-cyan-500" />
                </div>
            </div>

            {/* Stats Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-4 z-10">
                <div>
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Status</div>
                    <div className="text-emerald-500 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        ONLINE
                    </div>
                </div>
                <div>
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Security</div>
                    <div className="text-orange-400 flex items-center gap-1.5">
                        <Shield size={10} />
                        ENCRYPTED
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookDemo = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        email: '',
        country: 'IN',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [particles, setParticles] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const particleIdRef = useRef(0);
    const formRef = useRef(null);
    const lastSpawnTime = useRef(0);

    const selectedCountry = countries.find(c => c.code === formData.country) || countries[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountrySelect = (code) => {
        setFormData(prev => ({ ...prev, country: code }));
        setShowCountryDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const fullPhone = `${selectedCountry.dial} ${formData.phone}`;
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', businessName: '', email: '', country: 'IN', phone: '', service: '', message: '' });
            onClose();
        }, 2500);
    };

    const spawnBorderFlames = useCallback(() => {
        if (!formRef.current) return;
        const rect = formRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const newParticles = [];
        const count = Math.floor(Math.random() * 4) + 4;

        for (let i = 0; i < count; i++) {
            const edge = ['left', 'right', 'bottom'][Math.floor(Math.random() * 3)];
            let x, y;
            if (edge === 'left') {
                x = -10 + Math.random() * 15;
                y = Math.random() * height;
            } else if (edge === 'right') {
                x = width - 5 + Math.random() * 15;
                y = Math.random() * height;
            } else {
                x = Math.random() * width;
                y = height - 5 + Math.random() * 15;
            }
            newParticles.push({ id: particleIdRef.current++, x, y, edge });
        }
        setParticles(prev => [...prev, ...newParticles]);
    }, []);

    const handleMouseMove = useCallback(() => {
        const now = Date.now();
        if (now - lastSpawnTime.current > 30) {
            lastSpawnTime.current = now;
            spawnBorderFlames();
        }
    }, [spawnBorderFlames]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        for (let i = 0; i < 3; i++) spawnBorderFlames();
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const removeParticle = useCallback((id) => {
        setParticles(prev => prev.filter(p => p.id !== id));
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setParticles([]);
            setIsHovering(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                />

                {/* Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"
                    />
                    {isHovering && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-600/30 rounded-full blur-[120px]"
                        />
                    )}
                </div>

                {/* Main Content: Flex Container for Split Panels */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-stretch justify-center max-w-5xl w-full">

                    {/* LEFT PANEL: System Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ delay: 0.1 }}
                        className="hidden md:block w-72 border border-white/10 bg-[#050505] shadow-2xl relative"
                    >
                        <SystemTerminal formData={formData} />
                        {/* Card Reflection/Glow */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] to-transparent" />
                    </motion.div>

                    {/* RIGHT PANEL: The Form (Restored Compact Layout) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-md"
                    >
                        {/* Outer Glow - changes to fire when hovering */}
                        <div className={`absolute -inset-1 blur-xl opacity-60 transition-all duration-300 ${isHovering
                            ? 'bg-gradient-to-t from-red-600/40 via-orange-500/30 to-yellow-500/20'
                            : 'bg-gradient-to-b from-cyan-500/20 via-transparent to-cyan-500/10'
                            }`} />

                        {/* Fire Particles Container - Attached to Form Panel */}
                        <div className="absolute -inset-16 pointer-events-none overflow-visible z-50">
                            <div className="relative w-full h-full" style={{ left: 64, top: 64 }}>
                                <AnimatePresence>
                                    {particles.map(particle => (
                                        <FireParticle
                                            key={particle.id}
                                            x={particle.x}
                                            y={particle.y}
                                            edge={particle.edge}
                                            onComplete={() => removeParticle(particle.id)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div
                            ref={formRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`relative bg-[#080808] border overflow-hidden transition-all duration-300 h-full flex flex-col ${isHovering
                                ? 'border-orange-500/50 shadow-[0_0_100px_rgba(255,69,0,0.3)]'
                                : 'border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.15)]'
                                }`}
                        >
                            {/* Top Border Accent */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r transition-all duration-300 ${isHovering
                                ? 'from-transparent via-orange-500 to-transparent'
                                : 'from-transparent via-cyan-500 to-transparent'
                                }`} />

                            <div className="flex items-center justify-between px-4 py-2 bg-[#0c0c0c] border-b border-white/[0.06]">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_10px_rgba(255,95,87,0.5)]" />
                                        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_10px_rgba(254,188,46,0.5)]" />
                                        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_10px_rgba(40,200,64,0.5)]" />
                                    </div>
                                    <span className="text-[11px] font-mono text-slate-500 tracking-widest">
                                        mandelbrot://contact
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={16} />
                                </motion.button>
                            </div>

                            <div className="p-4 md:p-5 flex-1">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.1 }}
                                            className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                                        >
                                            <Terminal className="w-10 h-10 text-emerald-400" />
                                        </motion.div>
                                        <h3 className="text-2xl font-mono text-white mb-3">
                                            // REQUEST_RECEIVED
                                        </h3>
                                        <p className="text-slate-500 font-mono text-sm">
                                            We will reach out to you within 24 hrs
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="mb-4"
                                        >
                                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-4">
                                                <span className={`w-2 h-2 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors ${isHovering ? 'bg-orange-500 shadow-[0_0_15px_orange]' : 'bg-cyan-400'
                                                    }`} />
                                                {isHovering ? <span className="text-orange-500 animate-pulse font-bold">🔥 SYSTEM OVERHEAT</span> : 'SYSTEM READY'}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
                                                Let's build your<br />
                                                <span className="text-slate-600">automation system</span>
                                            </h2>
                                        </motion.div>

                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <div className="grid grid-cols-2 gap-4">
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.15 }}
                                                >
                                                    <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                        Name <span className="text-cyan-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Full name"
                                                        className="w-full bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light"
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                        Company
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="businessName"
                                                        value={formData.businessName}
                                                        onChange={handleChange}
                                                        placeholder="Company"
                                                        className="w-full bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light"
                                                    />
                                                </motion.div>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.25 }}
                                            >
                                                <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                    Email <span className="text-cyan-400">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="you@company.com"
                                                    className="w-full bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                    Phone <span className="text-cyan-400">*</span>
                                                </label>
                                                <div className="flex gap-3">
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                            className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-2 py-1.5 text-white hover:bg-white/[0.06] hover:border-white/20 transition-all min-w-[110px]"
                                                        >
                                                            <span className="text-sm font-mono">{selectedCountry.dial}</span>
                                                            <span className="text-[9px] text-slate-500 font-mono">{selectedCountry.code}</span>
                                                            <ChevronDown size={14} className={`text-slate-500 ml-auto transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        <AnimatePresence>
                                                            {showCountryDropdown && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: -10 }}
                                                                    className="absolute top-full left-0 mt-1 w-60 max-h-40 overflow-y-auto bg-[#0a0a0a] border border-white/10 z-[60] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                                                                >
                                                                    {countries.map((country) => (
                                                                        <button
                                                                            key={country.code}
                                                                            type="button"
                                                                            onClick={() => handleCountrySelect(country.code)}
                                                                            className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-cyan-500/10 transition-colors border-b border-white/[0.03] last:border-0 ${country.code === formData.country ? 'bg-cyan-500/10 text-cyan-400' : 'text-white'
                                                                                }`}
                                                                        >
                                                                            <span className="text-sm font-mono w-14">{country.dial}</span>
                                                                            <span className="text-xs text-slate-400">{country.name}</span>
                                                                        </button>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="98765 43210"
                                                        className="flex-1 bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light"
                                                    />
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.35 }}
                                            >
                                                <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                    What do you need? <span className="text-cyan-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="AI Agent, Chatbot, Automation..."
                                                    className="w-full bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                                                    Tell us more
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={1}
                                                    placeholder="Describe your project briefly..."
                                                    className="w-full bg-white/[0.02] border-b border-white/10 py-1.5 px-1 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/[0.03] transition-all font-light resize-none"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.45 }}
                                                className="pt-2"
                                            >
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group relative w-full flex items-center justify-between bg-white text-black px-4 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                                                    <span className="relative">
                                                        {isSubmitting ? 'Sending...' : 'Submit'}
                                                    </span>
                                                    <ArrowRight
                                                        size={16}
                                                        className={`relative transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-2'}`}
                                                    />
                                                </button>
                                            </motion.div>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-[9px] font-mono text-slate-600 text-center"
                                            >
                                                We respect your privacy. No spam, ever.
                                            </motion.p>
                                        </form>
                                    </>
                                )}
                            </div>

                            {/* Bottom Gradient Bar */}
                            <div className={`h-1.5 transition-all duration-300 ${isHovering
                                ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500'
                                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
                                }`} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default BookDemo;
