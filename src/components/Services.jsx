import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
    {
        title: "AI Neural Agents",
        desc: "Autonomous agents that handle support, sales, and internal logic 24/7 without fatigue.",
        colSpan: "md:col-span-8",
        bg: "bg-white/[0.02] border-white/10"
    },
    {
        title: "Predictive CRM",
        desc: "Systems that know your customer's next move before they do.",
        colSpan: "md:col-span-4",
        bg: "bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20"
    },
    {
        title: "Ops Automation",
        desc: "Self-healing workflows.",
        colSpan: "md:col-span-4",
        bg: "bg-white/[0.02] border-white/10"
    },
    {
        title: "API Fusion",
        desc: "Connecting isolated apps into a single, breathing ecosystem.",
        colSpan: "md:col-span-8",
        bg: "bg-[#050505] border-white/10"
    }
];

export const Services = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section
            ref={targetRef}
            className="relative py-32 bg-black overflow-hidden"
            id="services"
        >
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6"
                >
                    CORE<br /><span className="text-slate-700">MODULES.</span>
                </motion.h2>
            </div>

            {/* Floating Bento Grid that responds to scroll */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        whileHover={{ scale: 0.98 }}
                        className={`group relative rounded-[2rem] border p-12 overflow-hidden flex flex-col justify-between min-h-[400px] ${service.colSpan} ${service.bg}`}
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] group-hover:bg-cyan-500/10 transition-colors duration-700 pointer-events-none -mr-20 -mt-20" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 text-xs font-mono text-slate-400">
                      // 0{i + 1}
                            </div>
                            <h3 className="text-4xl font-black tracking-tight mb-4">{service.title}</h3>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">{service.desc}</p>
                        </div>

                        <div className="relative z-10 flex justify-end">
                            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-xl">
                                ↗
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
