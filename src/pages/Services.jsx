import React, { useRef } from 'react';
import ServiceCard from '../components/ServiceCard';
import FAQSection from '../components/FAQSection';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const gridRef = useRef(null);

    const serviceFaqs = [
        {
            question: "How are the trading signals delivered?",
            answer: "All actionable calls and market insights are delivered continuously via our exclusive WhatsApp community and Discord server for real-time access."
        },
        {
            question: "Can I upgrade from Premium to Golden Mentorship later?",
            answer: "Yes, you can upgrade at any time. You will only pay the difference in the prorated fees. Contact our support team to facilitate the upgrade."
        },
        {
            question: "Do you offer a refund policy?",
            answer: "Due to the digital nature of our educational content and immediate access to proprietary research, we generally do not offer refunds. We encourage you to watch our free content to understand our style before committing."
        },
        {
            question: "What tools do I need for the course?",
            answer: "You will need a laptop/desktop with a stable internet connection for the live classes and charting. We will guide you on setting up the necessary free trading software."
        }
    ];

    const services = [
        {
            id: 'golden-mentorship',
            title: "The Golden Mentorship",
            subtitle: "Collaborative Bundle Offer",
            price: "₹1,53,000",
            features: [
                "Vinith D'costa & Associates: Market Analysis, Software & Screener",
                "VD Financepedia: Weekly Classes (Tuesdays)",
                "Complete Training Recording of Screeners",
                "Educational Views on Market Trends",
                "Pre-market Discussion"
            ],
            isPopular: true
        },
        {
            id: 'premium-mentorship',
            title: "Premium Mentorship",
            subtitle: "Real Time Market Analysis",
            price: (
                <div className="flex flex-col">
                    <span className="text-xl">Monthly: ₹6,000 <span className="text-sm text-gold/70">+ 18% GST</span></span>
                    <span className="text-lg text-gray-300 font-normal mt-1">Half Yearly: ₹30,000 <span className="text-xs text-gray-500">+ 18% GST</span></span>
                    <span className="text-lg text-gray-300 font-normal">Yearly: ₹50,000 <span className="text-xs text-gray-500">+ 18% GST</span></span>
                </div>
            ),
            features: [
                "Daily Markets Insights (NIFTY, BANKNIFTY, SENSEX)",
                "Real Time Market Analysis",
                "Strong Equity Picks for Wealth Creation",
                "Minimum Capital: ₹10,000 - ₹15,000",
                "Half-Yearly & Yearly Plans Available"
            ],
            isPopular: false
        },
        {
            id: 'cfo-program',
            title: "CFO Program",
            subtitle: "Personal Finance & Portfolio Management",
            price: "₹1,29,499",
            features: [
                "Stocks & Mutual Fund Picks",
                "Custom Smallcases",
                "Rebalancing Discipline (Quarterly/Half-yearly)",
                "Actionable Calls (Buy/Sell signals)",
                "Yearly Renewal: ₹12,000 + GST"
            ],
            isPopular: false
        }
    ];

    useGSAP(() => {
        // Hero Animations
        const tl = gsap.timeline();
        tl.from(".hero-content > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Grid Animation
        gsap.from(".service-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-black min-h-screen pt-20">
            {/* Services Hero */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,215,0,0.1)_0%,transparent_60%)] pointer-events-none"></div>

                <div className="container relative z-10 hero-content">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gold mb-6 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                        Choose Your Path
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
                        Whether you're looking for comprehensive mentorship, expert market views, or personal wealth management, we have a tailored plan for your financial ascent.
                    </p>
                    <ArrowDown size={30} className="text-gold animate-bounce mx-auto" />
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-neutral-900/30">
                <div className="container">
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="service-card h-full">
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection data={serviceFaqs} />
        </div>
    );
};

export default Services;
