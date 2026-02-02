import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, FileCheck, AlertTriangle } from 'lucide-react';

const TermsOfService = ({ isOpen, onClose }) => {
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
                            <Scale className="w-6 h-6 text-cyan-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">Terms of Service</h2>
                            <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">Aether AI Usage Agreement</p>
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
                            These Terms of Service ("Terms") enable a legal agreement between you ("Client", "User") and <strong>Aether AI</strong> ("Company", "we", "us"). By accessing our website, dashboard, or using our AI automation services, you agree to be bound by these Terms.
                        </p>
                    </div>

                    {/* Section 1: Acceptance */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">01.</span> Acceptance of Terms
                        </h3>
                        <p className="text-sm text-slate-400">
                            By using our services, registering an account, or making a payment, you expressly agree to these Terms. If you do not agree, you must immediately cease using our services.
                        </p>
                    </section>

                    {/* Section 2: Scope of Services */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">02.</span> Scope of Services
                        </h3>
                        <p className="text-sm mb-3">Aether AI provides technology services, including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li>Development of AI agents and chatbots.</li>
                            <li>Workflow automation architecture (using n8n Cloud).</li>
                            <li>Integration with third-party APIs (OpenAI, Google, etc.).</li>
                        </ul>
                        <p className="text-sm mt-3 text-slate-400">
                            <strong>Note:</strong> We provide technology implementation services, not business, legal, or financial consulting. We do not guarantee specific revenue, ROI, or business outcomes.
                        </p>
                    </section>

                    {/* Section 3: Account & Access */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">03.</span> Account & Access
                        </h3>
                        <p className="text-sm text-slate-400">
                            Access to our dashboard or services may be provisioned manually by our team. Depending on your subscription plan ("Solo Founder", "Company Systems", or "Enterprise"), your access may be limited to a "Sandbox" environment or granted full production capabilities. You are responsible for maintaining the confidentiality of your credentials.
                        </p>
                    </section>

                    {/* Section 4: Fees & Payments */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">04.</span> Fees & Payments
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>Setup Fee:</strong> A one-time, non-refundable fee required to initiate services and architecture design.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>Subscription:</strong> Monthly fees are prepaid. Failure to pay may result in immediate service suspension.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span><strong>Taxes:</strong> Any applicable taxes, levies, or duties imposed by taxing authorities shall be the Client's responsibility.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 5: Refunds & Cancellations */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">05.</span> Refunds & Cancellations
                        </h3>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3">
                            <FileCheck className="text-cyan-500 shrink-0 mt-1" size={18} />
                            <p className="text-sm text-slate-300">
                                All refunds and cancellations are strictly governed by our <strong className="text-white">Refund, Cancellation & Termination Policy</strong>, which is incorporated into these Terms by reference. Please review that policy for details on cooling-off periods, non-refundable fees, and termination procedures.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Client Responsibilities */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">06.</span> Client Responsibilities
                        </h3>
                        <p className="text-sm mb-3">You are solely responsible for:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li>The legality and accuracy of any data or inputs provided to our systems.</li>
                            <li>Reviewing all AI-generated outputs for accuracy before use.</li>
                            <li>Compliance with all applicable laws and regulations in your jurisdiction.</li>
                        </ul>
                    </section>

                    {/* Section 7: AI & Automation Disclaimer */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">07.</span> AI & Automation Disclaimer
                        </h3>
                        <p className="text-sm text-slate-400">
                            Artificial Intelligence is probabilistic, not deterministic. You acknowledge that AI outputs may be inaccurate, incomplete, misleading, or offensive ("Hallucinations"). Aether AI is not responsible for any decisions, actions, or damages resulting from your reliance on AI-generated content.
                        </p>
                    </section>

                    {/* Section 8: Third-Party Services */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">08.</span> Third-Party Services
                        </h3>
                        <p className="text-sm text-slate-400">
                            We rely on third-party platforms (e.g., n8n, OpenAI, Razorpay). We are not responsible for outages, service failures, API changes, or data handling practices of these third-party providers.
                        </p>
                    </section>

                    {/* Section 9: Intellectual Property */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">09.</span> Intellectual Property
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><strong>Aether AI Ownership:</strong> We retain all rights to our proprietary tools, pre-built templates, codebases, and internal workflow architectures.</li>
                            <li><strong>Client Ownership:</strong> You retain ownership of your customer data and specific content inputs.</li>
                            <li><strong>No Transfer:</strong> These Terms do not transfer any Intellectual Property rights unless explicitly agreed to in a separate written agreement.</li>
                        </ul>
                    </section>

                    {/* Section 10: Prohibited Use */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">10.</span> Prohibited Use
                        </h3>
                        <p className="text-sm text-slate-400">
                            You agree not to use our services for any illegal purpose, to facilitate abuse, to violate third-party rights, or to attempt to reverse-engineer our systems. Violation of this clause constitutes grounds for immediate termination without refund.
                        </p>
                    </section>

                    {/* Section 11: Limitation of Liability */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">11.</span> Limitation of Liability
                        </h3>
                        <p className="text-sm text-slate-300 bg-white/5 p-4 rounded-lg border border-white/10">
                            To the maximum extent permitted by law, Aether AI's total liability shall be limited to the <strong>lower of</strong>: (a) the fees paid by you in the three (3) months preceding the claim, or (b) the total amount paid by you to Aether AI. We shall not be liable for any indirect, incidental, or consequential damages.
                        </p>
                    </section>

                    {/* Section 12: Governing Law & Dispute Resolution */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">12.</span> Governing Law & Dispute Resolution
                        </h3>
                        <p className="text-sm text-slate-400">
                            These Terms shall be governed by the laws of <strong>India</strong>. Any disputes arising out of or regarding these Terms shall be resolved through <strong>binding arbitration</strong> in accordance with the <strong>Arbitration and Conciliation Act, 1996</strong>. The seat of arbitration and exclusive jurisdiction shall be <strong>Bengaluru, Karnataka, India</strong>.
                        </p>
                    </section>

                    {/* Section 13: Changes to Terms */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">13.</span> Changes to Terms
                        </h3>
                        <p className="text-sm text-slate-400">
                            We reserve the right to update these Terms at any time. We will notify you of any changes by posting the new Terms on this site. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">14.</span> Contact Us
                        </h3>
                        <p className="text-sm text-slate-400">
                            For any questions regarding these Terms, please contact us at: <a href="mailto:aether.business.ai@gmail.com" className="text-cyan-400 hover:underline">aether.business.ai@gmail.com</a>
                        </p>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[#0A0A0A] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest rounded hover:bg-cyan-400 transition-colors"
                    >
                        Accept & Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
