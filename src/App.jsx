import React, { useState, useEffect, Suspense, lazy } from "react";
import { Hero } from "./components/Hero";
import { ScrollVideo } from "./components/ScrollProgress";
import { ChatWidget } from "./components/ChatWidget";
import { BookingModal } from "./components/BookingModal";
import AntigravityBackground from "./components/AntigravityBackground";
import RefundPolicy from "./components/RefundPolicy";
import PrivacyModal from "./components/PrivacyModal";
import TermsOfService from "./components/TermsOfService";
import AiUsePolicy from "./components/AiUsePolicy";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "./components/RevealOnScroll";
import SectionLoader from "./components/SectionLoader";

// Lazy Load Sections
const Services = lazy(() => import("./components/Services").then(module => ({ default: module.Services })));
const Pricing = lazy(() => import("./components/Pricing").then(module => ({ default: module.Pricing })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));
const Process = lazy(() => import("./components/Process").then(module => ({ default: module.Process })));
const Architecture = lazy(() => import("./components/Architecture").then(module => ({ default: module.Architecture })));
const Work = lazy(() => import("./components/Work").then(module => ({ default: module.Work })));
const Testimonials = lazy(() => import("./components/Testimonials").then(module => ({ default: module.Testimonials })));

import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useLanguage } from "./context/LanguageContext";
import { useUISound } from "./hooks/useUISound";
import { StatusDashboard } from "./components/StatusDashboard";

import { HelmetProvider, Helmet } from 'react-helmet-async';
import MobileDock from "./components/MobileDock";
import { TopNavbar } from "./components/TopNavbar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  const [isAiUsePolicyOpen, setIsAiUsePolicyOpen] = useState(false);
  const { t } = useLanguage();
  const { playClick, playHover } = useUISound();

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
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.razorpay.com https://lumberjack-cx.razorpay.com; frame-src https://api.razorpay.com;" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </Helmet>
      <div className="bg-[#020202] min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30 relative">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[10000] px-4 py-2 bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs rounded-full opacity-0 focus:opacity-100 focus:outline-none pointer-events-none focus:pointer-events-auto transition-opacity"
        >
          Skip to Content
        </a>
        <AntigravityBackground />
        <ScrollVideo />

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
              {/* Navigation Overlay */}
              <TopNavbar />

              <RevealOnScroll direction="up" delay={0.2}>
                <section id="hero" className="snap-start">
                  <Hero setIsBookingOpen={setIsBookingOpen} setIsDashboardOpen={setIsDashboardOpen} />
                </section>
              </RevealOnScroll>

              <div className="h-20" /> {/* Spacer */}

              <div className="h-20" /> {/* Spacer */}

              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <section id="services" className="snap-start">
                    <Services />
                  </section>
                </RevealOnScroll>
              </Suspense>
              <div className="h-20" /> {/* Spacer */}
              {/* Process Section can be added here as a separate component */}
              {/* Process Section */}
              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <Process />
                </RevealOnScroll>
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <Architecture />
                </RevealOnScroll>
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <Testimonials />
                </RevealOnScroll>
              </Suspense>

              <div className="h-20" /> {/* Spacer */}
              <div className="h-20" /> {/* Spacer */}
              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <section id="work" className="snap-start">
                    <Work />
                  </section>
                </RevealOnScroll>
              </Suspense>

              <div className="h-20" /> {/* Spacer */}
              <Suspense fallback={<SectionLoader />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <section id="pricing" className="snap-start">
                    <Pricing />
                  </section>
                </RevealOnScroll>
              </Suspense>

              <Suspense fallback={<div className="h-20 bg-black" />}>
                <RevealOnScroll direction="up" delay={0.1}>
                  <Footer
                    onOpenRefundPolicy={() => setIsRefundPolicyOpen(true)}
                    onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
                    onOpenTermsOfService={() => setIsTermsOfServiceOpen(true)}
                    onOpenAiUsePolicy={() => setIsAiUsePolicyOpen(true)}
                  />
                </RevealOnScroll>
              </Suspense>
              <ChatWidget />
              <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
              <AnimatePresence>
                {isDashboardOpen && <StatusDashboard key="dashboard" onClose={() => setIsDashboardOpen(false)} />}
                <RefundPolicy key="refund" isOpen={isRefundPolicyOpen} onClose={() => setIsRefundPolicyOpen(false)} />
                <PrivacyModal key="privacy" isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
                <TermsOfService key="terms" isOpen={isTermsOfServiceOpen} onClose={() => setIsTermsOfServiceOpen(false)} />
                <AiUsePolicy key="ai-policy" isOpen={isAiUsePolicyOpen} onClose={() => setIsAiUsePolicyOpen(false)} />
              </AnimatePresence>
              <MobileDock />
            </main>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
};

export default App;
