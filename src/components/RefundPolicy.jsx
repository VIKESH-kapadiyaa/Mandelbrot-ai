import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';

const RefundPolicy = ({ isOpen, onClose }) => {
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
                            <ShieldCheck className="w-6 h-6 text-cyan-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">Refund, Cancellation & Termination Policy</h2>
                            <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">Aether AI Legal Framework</p>
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
                            <strong className="text-cyan-400 block mb-2 uppercase tracking-wider text-xs">Effective Date: {new Date().toLocaleDateString()}</strong>
                            This Refund, Cancellation & Termination Policy ("Policy") governs your relationship with <strong>Aether AI</strong> ("Company", "we", "us"). By engaging our services, subscribing to plans, or paying setup fees, you ("Client", "you") agree to be bound by these terms.
                        </p>
                    </div>

                    {/* Section 1: Definitions */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">01.</span> Definitions
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li><strong>"Service"</strong>: AI automation workflows, AI agent development, consulting, and associated software solutions provided by Aether AI.</li>
                            <li><strong>"Setup Fee"</strong>: A one-time non-refundable charge for initial architecture design, resource allocation, and workflow onboarding.</li>
                            <li><strong>"Subscription"</strong>: Recurring monthly fees for ongoing access to services, maintenance, and compute credits.</li>
                            <li><strong>"Cycle"</strong>: The 30-day billing period starting from the date of payment.</li>
                        </ul>
                    </section>

                    {/* Section 2: Setup Fees */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">02.</span> Setup Fees
                        </h3>
                        <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                            <p className="text-sm text-white/90">
                                <strong>Strictly Non-Refundable:</strong> The Setup Fee is 100% non-refundable once payment is processed.
                            </p>
                            <p className="text-sm mt-2 text-slate-400">
                                <em>Reasoning:</em> Setup work—including system architecture design, API provisioning, and dedicated resource allocation—commences immediately upon payment. These resources are consumed instantly and cannot be recovered.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Monthly Subscriptions */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">03.</span> Monthly Subscriptions
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>Prepaid Nature:</strong> All subscriptions are prepaid for the upcoming month.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>Cancellation:</strong> You may cancel your subscription at any time. However, cancellation will only take effect at the <strong>end of the current billing cycle</strong>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>No Partial Refunds:</strong> We do not offer refunds for partial months, unused services, or remaining credits within an active billing cycle, except as explicitly stated in the Cooling-Off Period (Section 4).</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 4: 14-Day Cooling-Off Period */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">04.</span> 14-Day Cooling-Off Period
                        </h3>
                        <div className="space-y-4 text-sm">
                            <p>This specifically applies to <strong>Solo Founder</strong> and <strong>Company Systems</strong> plans only (Enterprise plans are excluded).</p>
                            <p>If you cancel within the first 14 days of your <strong>initial</strong> subscription:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                <li>We will refund the <strong>unused portion</strong> of the monthly subscription fee on a pro-rata basis.</li>
                                <li>The <strong>Setup Fee remains non-refundable</strong>.</li>
                                <li>Access during this period is limited to a "Sandbox" environment to prevent abuse.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Exclusions */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">05.</span> Non-Refundable Items
                        </h3>
                        <p className="text-sm mb-3">No refunds will be issued for:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            {[
                                "Completed billing cycles",
                                "Setup fees (under any circumstance)",
                                "Third-party API costs (OpenAI, Anthropic, etc.) incurred on your behalf",
                                "Custom development hours already utilized",
                                "Dissatisfaction with AI creative outputs or business results",
                                "Gateway transaction fees and currency conversion charges"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/5 text-slate-300">
                                    <X size={14} className="text-red-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Section 6: No Guarantees */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">06.</span> No Guarantees & AI Disclaimer
                        </h3>
                        <p className="text-sm mb-4">
                            You acknowledge that Aether AI provides tools and automation services, not guaranteed business outcomes.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li><strong>Performance:</strong> We do not guarantee specific revenue, ROI, or efficiency gains.</li>
                            <li><strong>AI Nature:</strong> Artificial Intelligence outputs may contain errors, inaccuracies, or "hallucinations". It is the Client's responsibility to verify all outputs before use.</li>
                            <li><strong>Compliance:</strong> Client is solely responsible for ensuring their use of our agents complies with local laws and regulations.</li>
                        </ul>
                    </section>

                    {/* Section 7: Termination */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">07.</span> Termination by Aether AI
                        </h3>
                        <p className="text-sm mb-3">
                            We reserve the right to terminate services immediately <strong>without refund</strong> if the Client:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-400">
                            <li>Engages in illegal, abusive, or unethical use of our AI systems.</li>
                            <li>Violates our Terms of Service or Acceptable Use Policy.</li>
                            <li>Fails to make payments on time.</li>
                            <li>Attempts to reverse-engineer or misuse our proprietary technology.</li>
                        </ul>
                    </section>

                    {/* Section 8: Liability */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">08.</span> Limitation of Liability
                        </h3>
                        <p className="text-sm text-slate-300 bg-white/5 p-4 rounded-lg border border-white/10">
                            To the maximum extent permitted by law, Aether AI's total liability for any claim arising out of or relating to these services shall be limited to the <strong>lower of</strong>: (a) the total fees paid by the Client in the three (3) months preceding the claim, or (b) the total amount paid by the Client to Aether AI.
                        </p>
                    </section>

                    {/* Section 9: Dispute Resolution */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">09.</span> Dispute Resolution
                        </h3>
                        <p className="text-sm text-slate-400">
                            Any disputes arising under this Policy shall be resolved through binding arbitration under the <strong>Arbitration and Conciliation Act, 1996</strong>. The seat of arbitration and exclusive jurisdiction shall be <strong>Bengaluru, Karnataka, India</strong>. The language of arbitration shall be English.
                        </p>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[#0A0A0A] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest rounded hover:bg-cyan-400 transition-colors"
                    >
                        Close Policy
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default RefundPolicy;
