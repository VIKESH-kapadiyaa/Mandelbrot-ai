import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Pricing = () => {
    return (
        <section className="py-40 px-6 bg-black relative overflow-hidden" id="pricing">
            <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-black tracking-tighter mb-4"
                >
                    ACCESS <span className="text-cyan-500">GRANTED</span>
                </motion.h2>
                <p className="text-slate-500 text-lg uppercase tracking-widest font-mono">Select your protocol level</p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 relative z-10 perspective-1000">

                {/* SOLO */}
                <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center backdrop-blur-sm"
                >
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 px-4 py-2 border border-white/10 rounded-full">Solo Founder</div>
                    <div className="text-5xl font-black mb-2">₹30,000</div>
                    <div className="text-sm font-mono text-cyan-500 mb-8">+ ₹15,000 / mo</div>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        The essential automation stack for individual operators.
                    </p>
                    <button className="w-full py-4 border border-white/10 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors mt-auto">
                        Deploy Solo
                    </button>
                </motion.div>

                {/* BUSINESS (Holographic Card) */}
                <motion.div
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-gradient-to-b from-cyan-950/20 to-black border border-cyan-500/50 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute -top-4 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        Recommended Protocol
                    </div>

                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-8 mt-4">Company Systems</div>
                    <div className="text-6xl font-black mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">₹50,000</div>
                    <div className="text-sm font-mono text-cyan-500 mb-8">+ ₹30,000 / mo</div>
                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                        Full-scale agency automation. Multi-agent swarms and deep CRM integration.
                    </p>
                    <button className="relative z-10 w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
                        Initialize Business
                    </button>
                </motion.div>

                {/* CUSTOM */}
                <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center backdrop-blur-sm"
                >
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 px-4 py-2 border border-white/10 rounded-full">Enterprise</div>
                    <div className="text-5xl font-black mb-2">CUSTOM</div>
                    <div className="text-sm font-mono text-slate-500 mb-8">Quote based</div>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        Unique architectures for high-volume operations and custom LLM training.
                    </p>
                    <button className="w-full py-4 border border-white/10 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors mt-auto">
                        Contact Sales
                    </button>
                </motion.div>

            </div>

            <div className="mt-20 text-center">
                <p className="inline-block text-[10px] font-mono uppercase tracking-widest text-slate-600 border border-white/5 px-6 py-3 rounded-full">
                    * Pricing is indicative. Complexity varies.
                </p>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
}
