import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Grid, CreditCard, Layers } from 'lucide-react';

const MobileDock = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');
    const [lastScrollY, setLastScrollY] = useState(0);

    const navItems = [
        { id: 'hero', icon: Home, label: 'Home' },
        { id: 'work', icon: Grid, label: 'Work' },
        { id: 'services', icon: Layers, label: 'Services' },
        { id: 'pricing', icon: CreditCard, label: 'Pricing' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide dock when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);

            // Determine active section
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden pointer-events-none">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="flex items-center gap-1 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto"
                    >
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="dock-active"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon
                                        size={20}
                                        className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-400'
                                            }`}
                                    />
                                    {isActive && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MobileDock;
