import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import HomeHero from '../components/HomeHero';
import YouTubeSection from '../components/YouTubeSection';
import FAQSection from '../components/FAQSection';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Users, Award, GraduationCap, Briefcase, Home as HomeIcon, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { user } = useAuth();
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    const features = [
        {
            icon: <Shield size={40} className="text-gold" />,
            title: "SEBI Registered",
            description: "Only SEBI Licensed Firm in South Karnataka with organic 5K+ Followers ✅"
        },
        {
            icon: <TrendingUp size={40} className="text-gold" />,
            title: "Financial Astrology",
            description: "A distinctive edge combining technicals with financial astrology for market timing."
        },
        {
            icon: <Award size={40} className="text-gold" />,
            title: "Institutional Research",
            description: "Rigorous, data-driven analysis for equities and derivatives."
        },
        {
            icon: <Users size={40} className="text-gold" />,
            title: "Vinith D'costa Financepedia",
            description: "Dedicated education arm focused on financial literacy and practical skills."
        }
    ];

    return (
        <div className="bg-black min-h-screen">
            <HomeHero />

            {/* Market Stats Section */}
            <div className="border-b border-white/10 bg-white/[0.02] py-8 w-full overflow-hidden">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: "1,500+", label: "Students Mentored" },
                        { number: "SEBI", label: "Registered Analyst" },
                        { number: "2019", label: "Established" },
                        { number: "NISM", label: "Certified" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center group cursor-default">
                            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 transform transition-transform duration-300 group-hover:scale-110">{stat.number}</div>
                            <div className="text-gray-muted text-xs md:text-sm uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <section ref={addToRefs} className="section-padding bg-black relative">
                <div className="container">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Our <span className="text-gold">Core Strengths</span></h2>
                        <p className="text-gray-muted max-w-2xl mx-auto text-lg">
                            We operate with an ethos of integrity, clarity, and client-first execution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="glass-panel p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_10px_30px_rgba(255,215,0,0.15)] bg-white/[0.03] group">
                                <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Founder Section */}
            <section ref={addToRefs} className="section-padding bg-gray-dark">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white text-center lg:text-left">About <span className="text-gold">Dr. Vinith D’costa</span></h2>
                            <p className="text-gray-muted mb-6 text-lg leading-relaxed">
                                Dr. Vinith is a SEBI-Registered Research Analyst with a Doctorate in Financial Management, a PGPM in Finance, and NISM certification.
                            </p>
                            <p className="text-gray-muted mb-8 text-lg leading-relaxed">
                                With a track record of mentoring 1,500+ students worldwide, VD bridges academic rigor with actionable market practice.
                            </p>
                            <p className="text-gray-muted mb-8 text-lg leading-relaxed">
                                He has conducted workshops in top colleges like <strong>Padua, Yenepoya, St. Agnes, Alvas, and St. Joseph Engineering College Mangalore</strong>.
                                <br /><br />
                                Beyond academia, he has led private Trading Workshops in <strong>Dubai, Bangalore, Goa & Mangalore</strong>.
                            </p>
                            <ul className="mb-8 space-y-4">
                                {[
                                    "SEBI Registered Research Analyst",
                                    "Doctorate in Financial Management",
                                    "PGPM in Finance",
                                    "NISM Certified",
                                    "MOU with St. Aloysius College"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300 text-lg">
                                        <CheckCircle size={20} className="text-gold mr-3" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-center lg:text-left">
                                <Link to="/about" className="btn-outline px-8 py-3 rounded-full text-base">Read Full Profile</Link>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative px-4 lg:px-0">
                            <div className="relative rounded-2xl p-2 bg-gold/5 border border-gold/20 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                                {/* Decorative Corner Accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg -translate-x-1 -translate-y-1"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg translate-x-1 translate-y-1"></div>

                                <img
                                    src="/founder_portrait.jpg"
                                    alt="Dr. Vinith D'costa"
                                    className="w-full h-auto rounded-xl shadow-2xl filter contrast-110 brightness-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Services Overview */}
            < section ref={addToRefs} className="section-padding bg-black" >
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Our <span className="text-gold">Premium Products</span></h2>
                        <p className="text-gray-muted max-w-2xl mx-auto text-lg">
                            Comprehensive mentorship programs designed for your financial growth.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {products.map((product, index) => (
                            <div key={index} className="glass-panel p-8 md:p-10 flex flex-col items-center text-center hover:-translate-y-2 hover:border-gold hover:shadow-[0_10px_40px_rgba(255,215,0,0.1)] transition-all duration-300 group bg-gray-light/40">
                                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{product.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-3 font-heading h-16 flex items-center justify-center">{product.title}</h3>
                                <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-4 font-heading h-12 flex items-center justify-center">{product.hook}</p>
                                <p className="text-gray-300 mb-8 leading-relaxed flex-grow text-base px-2">
                                    {product.description}
                                </p>
                                <Link to={`/product/${product.id}`} className="px-8 py-3 border border-gold rounded-full text-gold font-semibold text-sm hover:bg-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-gold/50">
                                    View Product
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Who Is This For Section */}
            < section ref={addToRefs} className="section-padding bg-black border-y border-white/5" >
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Who Is This <span className="text-gold">For?</span></h2>
                        <p className="text-gray-muted max-w-2xl mx-auto text-lg">
                            Designed for those ready to take control of their financial destiny.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <GraduationCap size={44} className="text-gold" />,
                                title: "Aspiring Traders",
                                subtitle: "Students & Beginners",
                                desc: "Build a high-income skill set early and start your journey to financial independence."
                            },
                            {
                                icon: <Briefcase size={44} className="text-gold" />,
                                title: "Wealth Builders",
                                subtitle: "Working Professionals",
                                desc: "Create a powerful passive income stream alongside your career without quitting your job."
                            },
                            {
                                icon: <HomeIcon size={44} className="text-gold" />,
                                title: "Financial Guardians",
                                subtitle: "Home Makers",
                                desc: "Empower yourself with financial literacy to manage and grow your family's wealth independently."
                            },
                            {
                                icon: <Shield size={44} className="text-gold" />,
                                title: "Legacy Creators",
                                subtitle: "Retired Professionals",
                                desc: "Protect your capital and generate consistent returns to secure your future and legacy."
                            }
                        ].map((item, index) => (
                            <div key={index} className="glass-panel p-8 flex items-start gap-6 hover:-translate-y-1 transition-transform duration-300 bg-white/[0.02]">
                                <div className="p-4 bg-gold/5 rounded-full flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">{item.subtitle}</p>
                                    <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <YouTubeSection />

            {/* Testimonials Section */}
            <section ref={addToRefs} className="section-padding bg-black">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Trusted by <span className="text-gold">Elite Traders</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Vikram S.", role: "Pro Trader", quote: "Vinith D'costa & Associates changed my entire perspective on the markets. The mentorship is unmatched." },
                            { name: "Sarah J.", role: "Investor", quote: "The tools and community support gave me the confidence to trade full-time." },
                            { name: "Rahul M.", role: "Day Trader", quote: "Finally, a platform that focuses on real education and not just signals." }
                        ].map((t, i) => (
                            <div key={i} className="glass-panel p-8 relative bg-gray-light/30">
                                <div className="text-4xl text-gold/20 font-serif absolute top-4 left-6">"</div>
                                <p className="text-gray-300 italic mb-6 relative z-10 pt-4 text-lg">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-black font-bold text-lg shadow-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{t.name}</div>
                                        <div className="text-gold text-xs uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section ref={addToRefs} className="section-padding bg-gray-dark border-t border-white/5">
                <div className="container">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Industry <span className="text-gold">Recognition</span></h2>
                        <p className="text-gray-muted max-w-2xl mx-auto text-lg">
                            Acknowledged for excellence in financial education and market analysis.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
                        {[
                            { icon: <Award size={56} className="text-gold" />, label: "Best EdTech 2024", desc: "Awarded for innovation in financial mentorship." },
                            { icon: <Shield size={56} className="text-gold" />, label: "Most Trusted Firm", desc: "Recognized for transparency and ethical practices." },
                            { icon: <Users size={56} className="text-gold" />, label: "Top Community", desc: "Home to India's most active trading community." }
                        ].map((award, i) => (
                            <div key={i} className="flex flex-col items-center text-center max-w-[300px] p-6 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="mb-4 p-4 bg-gold/5 rounded-full ring-1 ring-white/10">{award.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{award.label}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{award.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />

            {/* Community CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-gray-light to-black opacity-50 z-0"></div>
                <div className="container relative z-10 text-center px-4">
                    {!user ? (
                        <>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-heading">Join the <span className="text-gold">Inner Circle</span></h2>
                            <p className="text-gray-300 mb-10 text-xl max-w-3xl mx-auto font-light leading-relaxed">
                                Don't trade alone. Sign up today to unlock <strong className="text-gold font-normal">exclusive access to our WhatsApp Community</strong> and join thousands of successful traders.
                            </p>
                            <Link to="/register" className="btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transform hover:scale-105 transition-all duration-300">
                                Join for Free & Get Access
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-heading">Welcome Back, <span className="text-gold">{user.name?.split(' ')[0] || 'Trader'}</span></h2>
                            <p className="text-gray-300 mb-10 text-xl max-w-3xl mx-auto font-light leading-relaxed">
                                You are already part of the Inner Circle. Continue your journey to financial freedom.
                            </p>
                            <Link to="/dashboard" className="btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transform hover:scale-105 transition-all duration-300">
                                Go to Dashboard
                            </Link>
                        </>
                    )}
                </div>
            </section>
        </div >
    );
};

export default Home;
