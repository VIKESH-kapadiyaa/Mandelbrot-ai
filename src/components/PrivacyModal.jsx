import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, ShieldAlert } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
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
                            <Lock className="w-6 h-6 text-cyan-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">Privacy Policy</h2>
                            <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">Mandelbrot Data Protection</p>
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
                            This Privacy Policy describes how <strong>Mandelbrot</strong> ("Company", "we", "us") collects, uses, and protects your information when you use our website, dashboard, and AI automation services. By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>

                    {/* Section 1: Information We Collect */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">01.</span> Information We Collect
                        </h3>
                        <p className="text-sm mb-3">We collect the following types of information to provide and improve our services:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li><strong>Identity Data:</strong> Name, Company Name.</li>
                            <li><strong>Contact Data:</strong> Email address, Phone number.</li>
                            <li><strong>Use Data:</strong> Information about how you use our website and services.</li>
                        </ul>
                    </section>

                    {/* Section 2: Information We DO NOT Collect */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">02.</span> Information We DO NOT Collect
                        </h3>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <p className="text-sm text-slate-300">
                                <strong>Payment Details:</strong> We do NOT store your credit card, debit card, UPI info, or banking details. All payment processing is handled entirely by our secure third-party payment processor, <strong>Razorpay</strong>.
                            </p>
                            <p className="text-sm text-slate-300 mt-2">
                                <strong>Sensitive Personal Data:</strong> We do NOT collect government IDs, biometric data, or passwords for your personal accounts unless explicitly required and authorized for a specific automation workflow.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: How We Use Your Data */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">03.</span> How We Use Your Data
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span>To provide, operate, and maintain our AI automation services.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span>To communicate with you regarding updates, support, and billing.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span>To process transactions via Razorpay.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-cyan-500">•</span>
                                <span>To configure and run automation workflows on <strong>n8n Cloud</strong>.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 4: Third-Party Services & AI */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">04.</span> Third-Party Services & AI Models
                        </h3>
                        <p className="text-sm mb-3">
                            Our services integrate with various third-party tools and AI models. Data processed by these tools is subject to their respective privacy policies.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            {[
                                "OpenAI / LLM APIs (for AI generation)",
                                "n8n Cloud (for workflow orchestration)",
                                "Google APIs (if integrated)",
                                "Razorpay (for payments)",
                                "WhatsApp / Meta APIs (if integrated)",
                                "Email Services (SMTP/Gmail)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/5 text-slate-300">
                                    <ShieldAlert size={14} className="text-cyan-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm mt-4 text-slate-400 italic">
                            Mandelbrot does not own the data processed within your specific workflows. We act as a facilitator and architect of these automations.
                        </p>
                    </section>

                    {/* Section 5: Data Security */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">05.</span> Data Security
                        </h3>
                        <p className="text-sm text-slate-400">
                            We implement reasonable security measures to protect your data. Access to internal systems is limited to founders and authorized developers. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Section 6: Cookies & Tracking */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">06.</span> Cookies & Tracking
                        </h3>
                        <p className="text-sm text-slate-400">
                            We may use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies. We reserve the right to introduce analytics tools in the future to improve user experience.
                        </p>
                    </section>

                    {/* Section 7: User Rights */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">07.</span> Your Rights
                        </h3>
                        <p className="text-sm mb-3">Depending on your location, you may have the right to:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                            <li>Access specific personal data we hold about you.</li>
                            <li>Request correction of inaccurate data.</li>
                            <li>Request deletion of your data (subject to legal and contractual data retention obligations).</li>
                        </ul>
                    </section>

                    {/* Section 8: International Data Transfers */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">08.</span> International Data Transfers
                        </h3>
                        <p className="text-sm text-slate-400">
                            Information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                        </p>
                    </section>

                    {/* Section 9: Changes to Policy */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">09.</span> Changes to This Policy
                        </h3>
                        <p className="text-sm text-slate-400">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-cyan-500">10.</span> Contact Us
                        </h3>
                        <p className="text-sm text-slate-400">
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:mandelbrot.business.ai@gmail.com" className="text-cyan-400 hover:underline">mandelbrot.business.ai@gmail.com</a>
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

export default PrivacyModal;
