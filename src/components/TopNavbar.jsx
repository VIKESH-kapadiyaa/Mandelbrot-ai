import React, { useState, useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";
import { useUISound } from "../hooks/useUISound";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export const TopNavbar = ({ onOpenBookDemo }) => {
    const { t } = useLanguage();
    const { playClick, playHover } = useUISound();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide navbar when scrolling down (mobile behavior requested), 
            // but usually top navbar hides on scroll down on all devices in these styles
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 inset-x-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none mix-blend-difference"
                    aria-label="Main Navigation"
                >
                    <div
                        className="flex items-center gap-3 pointer-events-auto cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={t('nav.home')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        onClick={() => {
                            playClick();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onMouseEnter={playHover}
                    >
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-black" aria-hidden="true">M</div>
                        <span className="font-bold tracking-widest hidden md:block">{t('nav.home')}</span>
                    </div>
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <LanguageSwitcher />
                        <button
                            onClick={() => {
                                playClick();
                                if (onOpenBookDemo) onOpenBookDemo();
                            }}
                            onMouseEnter={playHover}
                            className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-colors"
                            aria-label="Book a call with Mandelbrot agents"
                        >
                            {t('nav.book')}
                        </button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};
