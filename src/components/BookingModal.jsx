import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookingModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        clientType: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.clientType) {
            alert("Please select your identity (Solo Founder or Company System).");
            return;
        }

        setStatus('loading');

        try {
            // Placeholder for the correct Booking Webhook URL
            // Please provide the separate URL for the "Book a Call" automation
            const bookingWebhookUrl = "YOUR_BOOKING_WEBHOOK_URL_HERE";

            const response = await fetch(bookingWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Booking failed');

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '', company: '' });
            }, 3000);

        } catch (error) {
            console.error('Booking error:', error);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                        aria-hidden="true"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 id="modal-title" className="text-xl font-bold text-white tracking-wide uppercase">
                                        Client Onboarding Contract
                                    </h3>
                                    <p className="text-slate-500 text-xs mt-1">
                                        Identity Verification & Service Agreement
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                                    aria-label="Close booking modal"
                                >
                                    ✕
                                </button>
                            </div>

                            {status === 'success' ? (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        ✓
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Request Transmitted</h4>
                                    <p className="text-slate-400 text-sm">Our neural agents will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/[0.07] outline-none transition-all text-sm"
                                                placeholder="ENTER FULL NAME"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal Entity</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/[0.07] outline-none transition-all text-sm"
                                                placeholder="ENTER COMPANY NAME"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/[0.07] outline-none transition-all text-sm"
                                            placeholder="ENTER EMAIL ADDRESS"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/[0.07] outline-none transition-all text-sm"
                                            placeholder="ENTER PHONE NUMBER"
                                        />
                                    </div>

                                    {/* Client Type Selection */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, clientType: 'solo' })}
                                            className={`p-4 rounded-xl border transition-all text-left group ${formData.clientType === 'solo'
                                                ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            <div className="mb-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${formData.clientType === 'solo' ? 'bg-cyan-500 text-black' : 'bg-white/10'}`}>
                                                    👤
                                                </div>
                                                <div className="font-bold text-xs uppercase tracking-widest">Solo Founder</div>
                                            </div>
                                            <div className="text-[10px] opacity-60">Rapid deployment for individuals.</div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, clientType: 'company' })}
                                            className={`p-4 rounded-xl border transition-all text-left group ${formData.clientType === 'company'
                                                ? 'bg-purple-500/10 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            <div className="mb-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${formData.clientType === 'company' ? 'bg-purple-500 text-white' : 'bg-white/10'}`}>
                                                    🏢
                                                </div>
                                                <div className="font-bold text-xs uppercase tracking-widest">Company System</div>
                                            </div>
                                            <div className="text-[10px] opacity-60">Enterprise-grade automation.</div>
                                        </button>
                                    </div>

                                    {/* Contract Section */}
                                    <div className="mt-6 border border-white/10 rounded-xl overflow-hidden bg-black/40">
                                        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-widest text-slate-400">
                                                SERVICE_AGREEMENT_DOC_V1
                                            </span>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                            </div>
                                        </div>

                                        <div className="p-4 relative">
                                            {/* Scanline */}
                                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20" />

                                            <div className="font-mono text-[10px] text-cyan-500/80 leading-relaxed space-y-3">
                                                <p className="opacity-70">{`// AETHER AI SERVICE AGREEMENT`}</p>
                                                <p className="opacity-70">{`// CLIENT: ${formData.name || 'PENDING...'}`}</p>
                                                <p className="opacity-70">{`// TYPE: ${formData.clientType ? formData.clientType.toUpperCase() : 'UNDEFINED'}`}</p>

                                                <div className="pl-2 border-l border-white/10 space-y-2 mt-2 text-slate-400">
                                                    <p>1. <span className="text-white">NO GUARANTEE OF OUTCOME:</span> The Provider delivers technology services ("Agents"). Business results (revenue, ROI) are NOT guaranteed.</p>
                                                    <p>2. <span className="text-white">AI DISCLAIMER:</span> Artificial Intelligence may produce inaccurate or biased outputs ("Hallucinations"). Client explicitly accepts responsibility for reviewing all agent outputs.</p>
                                                    <p>3. <span className="text-white">LIABILITY:</span> Provider is not liable for data loss, service interruptions, or third-party API changes.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 p-3 border-t border-white/10">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <div className="relative mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        id="consent"
                                                        className="peer sr-only"
                                                    />
                                                    <div className="w-4 h-4 border border-white/30 bg-black peer-checked:bg-white peer-checked:border-white transition-all" />
                                                    <div className="absolute inset-0 flex items-center justify-center text-black opacity-0 peer-checked:opacity-100 pointer-events-none text-xs font-bold">
                                                        ✓
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors leading-relaxed uppercase">
                                                    I agree to the <span className="text-white underline decoration-white/30 underline-offset-2">Terms of Service</span>, <span className="text-white underline decoration-white/30 underline-offset-2">Refund Policy</span>, and <span className="text-white underline decoration-white/30 underline-offset-2">Privacy Policy</span> provided by the company. I confirm I am authorized to execute this agreement.
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        disabled={status === 'loading'}
                                        className="w-full mt-4 bg-white text-black font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {status === 'loading' ? 'PROCESSING CONTRACT...' : 'SIGN DIGITAL CONTRACT'}
                                    </button>

                                    {status === 'error' && (
                                        <p className="text-red-500 text-xs text-center pt-2">Transmission failed. Please try again.</p>
                                    )}
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
