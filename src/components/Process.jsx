import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const steps = [
        { id: "01", title: "Analysis", desc: "We map your entire operational workflow to identify bottlenecks." },
        { id: "02", title: "Strategy", desc: "Architecting a custom multi-agent system tailored to your data." },
        { id: "03", title: "Deployment", desc: "Seamless integration with your existing stack (CRM, ERP, Slack)." },
        { id: "04", title: "Optimization", desc: "Continuous learning loops to improve efficiency over time." }
    ];

    return (
        <section ref={containerRef} className="py-40 bg-black relative overflow-hidden" id="process">
            {/* Connecting Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10">
                <motion.div
                    className="absolute top-0 w-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"
                    style={{ height: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 50, damping: 20 }) }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10"
                    >
                        THE FLOW
                    </motion.h2>
                </div>

                <div className="space-y-32">
                    {steps.map((step, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 ${isEven ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}
                            >
                                <div className={`flex-1 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">{step.title}</h3>
                                    <p className="text-slate-400 text-lg">{step.desc}</p>
                                </div>

                                <div className="relative">
                                    <div className="w-16 h-16 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 relative">
                                        <span className="text-cyan-500 font-mono font-bold">{step.id}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-cyan-500/20 blur-[40px] rounded-full" />
                                </div>

                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
