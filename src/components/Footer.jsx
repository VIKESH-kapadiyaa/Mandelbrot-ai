import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative bg-[#020202] text-white pt-32 pb-10 overflow-hidden" id="footer">

            {/* Top Border with glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/10 blur-[80px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between gap-20">

                {/* Left Brand Area */}
                <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            A
                        </div>
                        <span className="text-2xl font-bold tracking-widest uppercase">Aether AI</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm mb-12 max-w-sm">
                        We build the autonomous nervous systems for the next generation of enterprise.
                        Replace manual chaos with intelligent order.
                    </p>

                    {/* Contact Emails - Updated */}
                    <div className="space-y-4">
                        <a href="mailto:aether.business.ai@gmail.com" className="flex items-center gap-4 group p-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-cyan-500/30 transition-all">
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">@</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Business Inquiries</span>
                                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">aether.business.ai@gmail.com</span>
                            </div>
                        </a>

                        <a href="mailto:atherai.caredesk@gmail.com" className="flex items-center gap-4 group p-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-cyan-500/30 transition-all">
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">?</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Support Desk</span>
                                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">atherai.caredesk@gmail.com</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right Links Area */}
                <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-12 border-l border-white/5 md:pl-20">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 mb-8">System</h4>
                        <ul className="space-y-6 text-sm text-slate-400">
                            {['Services', 'Architecture', 'Pricing'].map(item => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>



                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 mb-8">Social Grid</h4>
                        <div className="flex gap-4">
                            {/* X (Twitter) */}
                            <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110">
                                <Linkedin size={18} />
                            </a>

                            {/* Instagram */}
                            <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110">
                                <Instagram size={18} />
                            </a>

                            {/* Discord */}
                            <a href="#" className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7.5 12h.01M16.5 12h.01" />
                                    <path d="M6.5 17c-2.3-2.1-3.6-5.8-3.6-5.8C4.5 9 7.4 8.7 7.4 8.7L8 10a11.5 11.5 0 0 1 8 0l.6-1.3s2.9.3 4.5 2.5c0 0-1.3 3.7-3.6 5.8 0 0-2.3 2-6.5 0-3.1 1.4-4.5 0-4.5 0" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            {/* Bottom Copyright */}
            <div className="max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-widest font-mono">
                <div>
                    © 2026 Aether AI Automation Agency
                </div>

                {/* Enhanced Status Indicator */}
                <div className="flex items-center gap-4 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-slate-400">
                        System Status: <span className="text-green-500 font-bold">OPERATIONAL</span>
                    </span>
                    <div className="h-3 w-px bg-white/10" />
                    <span className="text-slate-600">v2.4.0-stable</span>
                </div>
            </div>
        </footer>
    );
}
