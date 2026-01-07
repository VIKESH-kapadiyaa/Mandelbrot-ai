
import { motion } from "framer-motion";

const partners = [
    "NEXUS SYSTEMS", "CYBERDYNE", "OMNI CORP", "MASSIVE DYNAMIC", "HOSAKA",
    "TYRELL", "WEYLAND", "SOYLENT", "BLUE SUN", "GLOBEX"
];

export const Partners = () => {
    return (
        <div className="py-10 bg-black border-y border-white/5 relative overflow-hidden z-20">
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-slate-500">
                    Trusted by Industry Leaders
                </p>
            </div>

            <div className="flex overflow-hidden group">
                <motion.div
                    className="flex gap-16 md:gap-32 min-w-full items-center justify-around px-8"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...partners, ...partners].map((partner, i) => (
                        <span
                            key={i}
                            className="text-xl md:text-2xl font-black tracking-tighter text-slate-700 whitespace-nowrap uppercase hover:text-cyan-500 transition-colors cursor-default select-none"
                            style={{ fontFamily: 'monospace' }} // Ensuring a tech feel
                        >
                            {partner}
                        </span>
                    ))}
                </motion.div>

                {/* Duplicate logic for seamless loop if needed, but the array doubling above usually handles it if width is sufficient. 
            For true infinite loop with Flexbox, we usually need two identical motion divs. 
        */}
                <motion.div
                    className="flex gap-16 md:gap-32 min-w-full items-center justify-around px-8"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...partners, ...partners].map((partner, i) => (
                        <span
                            key={i}
                            className="text-xl md:text-2xl font-black tracking-tighter text-slate-700 whitespace-nowrap uppercase hover:text-cyan-500 transition-colors cursor-default select-none"
                            style={{ fontFamily: 'monospace' }}
                        >
                            {partner}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
