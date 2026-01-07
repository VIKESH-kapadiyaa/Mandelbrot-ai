
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Aether reduced our operational overhead by 60% within the first quarter. The autonomous agents are indistinguishable from human experts.",
        author: "Sarah Chen",
        role: "CTO, Nexus Dynamics",
        metric: "60% Cost Reduction"
    },
    {
        quote: "We replaced our entire tier-1 support with Aether's neural network. Customer satisfaction scores actually went up.",
        author: "Marcus Thorne",
        role: "VP Operations, Orbital Tech",
        metric: "24/7 Uptime"
    },
    {
        quote: "The predictive CRM logic is terrifyingly accurate. It knows what our clients need before they sign the contract.",
        author: "Elena Vos",
        role: "Director, Helios Capital",
        metric: "3x Conversion Rate"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-32 bg-[#020202] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase"
                    >
                        Client <span className="text-cyan-500">Intel.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                        >
                            {/* Glowing Corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 blur-[40px] rounded-full group-hover:bg-cyan-500/20 transition-all" />

                            <div className="mb-8 font-mono text-cyan-500 text-xs tracking-widest uppercase border-b border-white/5 pb-4 inline-block">
                        // {item.metric}
                            </div>

                            <p className="text-xl text-slate-300 font-light leading-relaxed mb-8">
                                "{item.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">
                                    {item.author[0]}
                                </div>
                                <div>
                                    <div className="text-white font-bold">{item.author}</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-wider">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
