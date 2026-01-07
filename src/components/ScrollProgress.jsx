import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollVideo = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[1000]"
            style={{ scaleX }}
        />
    );
};
