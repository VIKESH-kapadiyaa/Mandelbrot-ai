import React from 'react';
import { motion } from 'framer-motion';
import { X, Bot, AlertTriangle, ShieldCheck, Siren } from 'lucide-react';

const AiUsePolicy = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <Bot className="w-6 h-6 text-cyan-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">AI Use Policy</h2>
                            <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">Responsible AI Governance</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-slate-300 leading-relaxed font-light scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">

                    {/* Introduction */}
                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl mb-8">
                        <p className="text-sm">
                            <strong className="text-cyan-400 block mb-2 uppercase tracking-wider text-xs">Last Updated: {new Date().toLocaleDateString()}</strong>
                            This AI Use Policy outlines the responsible, lawful, and ethical use of Artificial Intelligence services provided by <strong>Aether AI</strong> ("Company", "we"). By using our AI-enabled features, you agree to comply with this policy.
                        </p>
                    </div>

                    {/* Section 1: Purpose */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">01.</span> Purpose
                        </h3>
                        <p className="text-sm text-slate-400">
                            The purpose of this policy is to define the boundaries of acceptable use for our AI services, ensuring they are used safely, ethically, and in compliance with applicable laws.
                        </p>
                    </section>

                    {/* Section 2: Scope */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">02.</span> Scope
                        </h3>
                        <p className="text-sm text-slate-400">
                            This policy applies to all users, clients, and entities accessing Aether AI's services, including but not limited to AI agents, workflow automations, and generated content.
                        </p>
                    </section>

                    {/* Section 3: Nature of AI Outputs */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">03.</span> Nature of AI Outputs
                        </h3>
                        <div className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={18} />
                            <div className="text-sm text-slate-300">
                                <p className="mb-2"><strong>Probabilistic Nature:</strong> AI models generate responses based on probability, not truth. Outputs may be:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                                    <li>Inaccurate or factually incorrect.</li>
                                    <li>Incomplete or outdated.</li>
                                    <li>Biased based on training data.</li>
                                </ul>
                                <p className="mt-2">All AI outputs are provided for <strong>informational purposes only</strong>.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Prohibited Uses */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">04.</span> Prohibited Uses
                        </h3>
                        <p className="text-sm mb-3">You typically agree NOT to use Aether AI services for:</p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex gap-2">
                                <Siren size={14} className="text-red-400 mt-1 shrink-0" />
                                <span><strong>Illegal Activities:</strong> Any act violating local, national, or international laws.</span>
                            </li>
                            <li className="flex gap-2">
                                <Siren size={14} className="text-red-400 mt-1 shrink-0" />
                                <span><strong>Fraud & Deception:</strong> Generating misleading content, scams, or impersonating others.</span>
                            </li>
                            <li className="flex gap-2">
                                <Siren size={14} className="text-red-400 mt-1 shrink-0" />
                                <span><strong>Harassment:</strong> Creating content that bullies, threatens, or promotes hate speech.</span>
                            </li>
                            <li className="flex gap-2">
                                <Siren size={14} className="text-red-400 mt-1 shrink-0" />
                                <span><strong>Surveillance:</strong> Misusing AI for unauthorized monitoring or facial recognition.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 5: Human Oversight & Responsibility */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">05.</span> Human Oversight
                        </h3>
                        <p className="text-sm text-slate-300 mb-3">
                            <strong>The Client is solely responsible for reviewing and validating all AI outputs before use.</strong>
                        </p>
                        <p className="text-sm text-slate-400">
                            Our AI services must NOT be relied upon for critical decision-making, including:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-400">
                            <li>Legal advice or contract drafting.</li>
                            <li>Medical diagnoses or treatment advice.</li>
                            <li>Financial, investment, or trading decisions.</li>
                        </ul>
                    </section>

                    {/* Section 6: Data & Privacy Safeguards */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">06.</span> Data & Privacy
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex gap-2 items-start">
                                <ShieldCheck size={14} className="text-emerald-500 mt-1 shrink-0" />
                                <span><strong>Sensitive Data:</strong> Do NOT input government IDs, biometric data, or highly sensitive financial information into AI prompts.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <ShieldCheck size={14} className="text-emerald-500 mt-1 shrink-0" />
                                <span><strong>Rights:</strong> You represent that you have all necessary rights and consents for any data you provide to the AI system.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 7: Third-Party AI Providers */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">07.</span> Third-Party Providers
                        </h3>
                        <p className="text-sm text-slate-400">
                            Aether AI integrates with third-party models and APIs (e.g., OpenAI, n8n). We do not control the internal decision-making processes of these models and are not liable for their independent failures or changes in policy.
                        </p>
                    </section>

                    {/* Section 8: Suspension & Enforcement */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">08.</span> Suspension & Enforcement
                        </h3>
                        <p className="text-sm text-slate-400">
                            Aether AI reserves the right to immediately suspend or terminate access to services without refund if we detect usage in violation of this Policy.
                        </p>
                    </section>

                    {/* Section 9: No Guarantees */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">09.</span> No Guarantees
                        </h3>
                        <p className="text-sm text-slate-400">
                            We provide AI services "AS IS". We explicitly disclaim all warranties, guarantees of accuracy, or fitness for a particular purpose regarding AI-generated outputs.
                        </p>
                    </section>

                    {/* Section 10: Updates */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">10.</span> Updates to Policy
                        </h3>
                        <p className="text-sm text-slate-400">
                            As AI regulations evolve globally, we may update this policy. Continued use of our services constitutes acceptance of the revised AI Use Policy.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">11.</span> Contact Us
                        </h3>
                        <p className="text-sm text-slate-400">
                            For questions regarding AI safety or governance, contact: <a href="mailto:aether.business.ai@gmail.com" className="text-cyan-400 hover:underline">aether.business.ai@gmail.com</a>
                        </p>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[#0A0A0A] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest rounded hover:bg-cyan-400 transition-colors"
                    >
                        Acknowledge & Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AiUsePolicy;
