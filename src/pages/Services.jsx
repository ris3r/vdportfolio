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
            id: 'premium-mentorship',
            title: "Premium Mentorship",
            subtitle: "Real Time Market Analysis",
            specialHighlight: "Best Entry Point",
            price: (
                <div className="flex flex-col gap-3 mt-1">
                    <div className="flex justify-between items-center border border-green-500/30 bg-green-500/10 rounded-lg p-3 -mx-2 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-green-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex flex-col">
                            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">Start Here</span>
                            <span className="text-gray-300 text-sm">Monthly Plan</span>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-heading font-bold text-white">₹6,000</span>
                            <span className="text-xs text-gray-500 block">+ GST</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-1 px-1 opacity-70 hover:opacity-100 transition-opacity">
                        <span className="text-gray-300">Half-Yearly</span>
                        <span><span className="text-xl font-heading font-bold text-gold">₹30,000</span> <span className="text-xs text-gray-500">+ GST</span></span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-300">Yearly</span>
                        <span><span className="text-2xl font-heading font-bold text-gold">₹50,000</span> <span className="text-xs text-gray-500">+ GST</span></span>
                    </div>
                </div>
            ),
            // priceSuffix: "(Yearly Plan inc GST)", // Removed as we show breakdown
            features: [
                "Options, Futures Recommendations (Intraday & Delivery)",
                "Real Time Market Analysis",
                "Strong Equity Picks for Wealth Creation",
                "Minimum Capital: ₹10,000 - ₹15,000",
                "Monthly & Half-Yearly Plans Available"
            ],
            isPopular: false
        },
        {
            id: 'golden-mentorship',
            title: "The Golden Mentorship",
            subtitle: "Collaborative Bundle Offer",
            price: "₹1,53,000",
            priceSuffix: "(Inclusive of all taxes)",
            renewal: "Renewal: ₹15,000 + 18% GST / Year",
            features: [
                "VD Financepedia: Advanced Course Strategies & Software",
                "Vinith Dcosta & Associates : Daily Recommendations on Trading & Investing",
                "Weekly Live Demo Trading Sessions",
                "Financial astro Prediction Software & Stock Screeners",
                "Educational Seminars, Classes & Coaching on Smart Money Concepts & Advanced Price Action",
                "Premium Discord Channel Access"
            ],
            isPopular: true
        },
        {
            id: 'cfo-program',
            title: "CFO Program",
            subtitle: "Personal Finance & Portfolio Management",
            specialHighlight: "WEALTH ARCHITECT",
            highlightColor: "purple",
            price: "₹1,29,499",
            priceSuffix: "(Inclusive of all taxes)",
            renewal: "Renewal: ₹12,000 + 18% GST / Year",
            features: [
                "Stocks & Mutual Fund Picks",
                "Custom Smallcases",
                "Rebalancing Discipline (Quarterly/Half-yearly)",
                "Actionable Calls (Buy/Sell signals)",
                "Yearly Renewal Available"
            ],
            isPopular: false
        },
        {
            id: 'money-code-international',
            title: "THE MONEY CODE (INTERNATIONAL)",
            subtitle: "Decode. Invest. Dominate.",
            specialHighlight: "FUTURE READY",
            highlightColor: "cyan",
            price: (
                <div className="flex flex-col gap-3 mt-1">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                        <span className="text-gray-300">Yearly</span>
                        <span><span className="text-2xl font-heading font-bold text-gold">₹60,000</span> <span className="text-xs text-gray-500">+ GST</span></span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-300">Lifetime</span>
                        <span><span className="text-2xl font-heading font-bold text-gold">₹1,20,000</span> <span className="text-xs text-gray-500">+ GST</span></span>
                    </div>
                </div>
            ),
            priceSuffix: null,
            features: [
                "Funded Account Training on International Markets",
                "Future of Digital Wealth",
                "Logic, Discipline, and Mastery",
                "Lifetime Access Option Available"
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
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-8">
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
