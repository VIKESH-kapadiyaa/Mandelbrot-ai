import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CTO, FinTech Sol",
        text: "The Neural Workflow Engine automated 80% of our manual data processing in week one. It's like hiring 20 engineers instantly.",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        name: "David Chen",
        role: "Founder, ScaleUp",
        text: "We replaced our entire support tier 1 with Aether's Conversational Agent. Customer satisfaction actually went UP.",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        name: "Elena Rodriguez",
        role: "Head of Growth, OmniChannel",
        text: "The Social Media Orchestrator is terrifyingly good. It predicts trends before they happen. Our engagement tripled.",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        name: "Marcus Thorne",
        role: "Director, DataCorp",
        text: "Aether's extraction agents can parse unstructured PDFs better than any human. Absolute game changer for legal tech.",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
                >
                    TRUSTED BY <span className="text-cyan-500">INNOVATORS</span>
                </motion.h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto" />
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-hidden mask-linear-gradient">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shrink-0 hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-300 italic leading-relaxed whitespace-normal relative">
                                <span className="text-4xl text-cyan-500/20 absolute -top-4 -left-2 font-serif">"</span>
                                {t.text}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
