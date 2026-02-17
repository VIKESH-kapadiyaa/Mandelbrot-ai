import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AntigravityBackground from "./components/AntigravityBackground";
import { ScrollVideo } from "./components/ScrollProgress";
import { AnimatePresence, motion } from "framer-motion";

import { HelmetProvider, Helmet } from 'react-helmet-async';

import { useLanguage } from "./context/LanguageContext";
import { useUISound } from "./hooks/useUISound";

// Pages
import Home from "./pages/Home";
const NeuralEngine = lazy(() => import("./pages/NeuralEngine"));
const ConversationalAI = lazy(() => import("./pages/ConversationalAI"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { playClick } = useUISound();

  // Global Click Sound
  useEffect(() => {
    const handleGlobalClick = () => playClick();
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [playClick]);

  useEffect(() => {
    // Simulate initial system boot
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.razorpay.com https://lumberjack-cx.razorpay.com https://api.groq.com https://openrouter.ai http://localhost:8000; frame-src https://api.razorpay.com;" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </Helmet>
      <div className="bg-[#020202] min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30 relative">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[10000] px-4 py-2 bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs rounded-full opacity-0 focus:opacity-100 focus:outline-none pointer-events-none focus:pointer-events-auto transition-opacity"
        >
          Skip to Content
        </a>

        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
            >
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-xs font-mono uppercase tracking-[0.4em] text-cyan-500"
              >
                Initializing Mandelbrot...
              </motion.div>
            </motion.div>
          ) : (
            <main id="main-content">
              <Routes>
                <Route path="/" element={
                  <>
                    <AntigravityBackground />
                    <ScrollVideo />
                    <Home />
                  </>
                } />
                <Route path="/work/conversational-ai" element={
                  <Suspense fallback={
                    <div className="fixed inset-0 bg-[#020202] flex items-center justify-center">
                      <div className="text-xs font-mono uppercase tracking-[0.4em] text-purple-500 animate-pulse">
                        Booting Context Processor...
                      </div>
                    </div>
                  }>
                    <ConversationalAI />
                  </Suspense>
                } />
                <Route path="/work/neural-engine" element={
                  <Suspense fallback={
                    <div className="fixed inset-0 bg-[#020202] flex items-center justify-center">
                      <div className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-500 animate-pulse">
                        Loading Neural Engine...
                      </div>
                    </div>
                  }>
                    <NeuralEngine />
                  </Suspense>
                } />
              </Routes>
            </main>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
};

export default App;
