import React, { useState, Suspense, lazy } from "react";
import { Hero } from "../components/Hero";
import { ChatWidget } from "../components/ChatWidget";
import { BookingModal } from "../components/BookingModal";
import RefundPolicy from "../components/RefundPolicy";
import PrivacyModal from "../components/PrivacyModal";
import TermsOfService from "../components/TermsOfService";
import AiUsePolicy from "../components/AiUsePolicy";
import BookDemo from "../components/BookDemo";
import ChatBot from "../components/ChatBot";
import { AnimatePresence } from "framer-motion";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionLoader from "../components/SectionLoader";
import { TopNavbar } from "../components/TopNavbar";
import MobileDock from "../components/MobileDock";

// Lazy Load Sections
const Services = lazy(() => import("../components/Services").then(module => ({ default: module.Services })));
const Pricing = lazy(() => import("../components/Pricing").then(module => ({ default: module.Pricing })));
const Footer = lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));
const Process = lazy(() => import("../components/Process").then(module => ({ default: module.Process })));
const Architecture = lazy(() => import("../components/Architecture").then(module => ({ default: module.Architecture })));
const Work = lazy(() => import("../components/Work").then(module => ({ default: module.Work })));
const Testimonials = lazy(() => import("../components/Testimonials").then(module => ({ default: module.Testimonials })));

import { useBookDemo } from "../context/BookDemoContext";
import { useChatBot } from "../context/ChatBotContext";
import { StatusDashboard } from "../components/StatusDashboard";

const Home = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);
    const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
    const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
    const [isAiUsePolicyOpen, setIsAiUsePolicyOpen] = useState(false);
    const { isBookDemoOpen, openBookDemo, closeBookDemo } = useBookDemo();
    const { isChatBotOpen, closeChatBot } = useChatBot();

    return (
        <>
            {/* Navigation Overlay */}
            <TopNavbar onOpenBookDemo={openBookDemo} />

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
                <BookDemo key="book-demo" isOpen={isBookDemoOpen} onClose={closeBookDemo} />
                <ChatBot key="chatbot" isOpen={isChatBotOpen} onClose={closeChatBot} />
            </AnimatePresence>
            <MobileDock />
        </>
    );
};

export default Home;
