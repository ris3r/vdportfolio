import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Star, TrendingUp, Shield, Users, Award } from 'lucide-react';

const HomeHero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            className="home-hero relative overflow-hidden flex items-center justify-center min-h-screen pt-32 pb-20 bg-black"
            onMouseMove={handleMouseMove}
            style={{
                background: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)',
            }}
        >
            {/* Cosmic Background Effects */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 215, 0, 0.08) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            {/* Gold Horizon Glow */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '0',
                width: '100%',
                height: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
                <div key={i} className="hero-particle" style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    background: i % 2 === 0 ? 'var(--color-gold)' : '#fff',
                    opacity: 0.6,
                    borderRadius: '50%',
                    animation: 'float 6s infinite ease-in-out'
                }}></div>
            ))}

            <div className="container relative z-10 text-center max-w-6xl px-4">

                {/* Tagline */}
                <div className="animate-fade-in mb-6 flex justify-center">
                    <span className="text-gold text-sm uppercase tracking-[3px] font-semibold px-4 py-2 border border-gold/30 rounded-full bg-gold/5 backdrop-blur-sm">
                        Where Data Meets the Stars
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="animate-fade-in text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-tight mb-6 text-white text-shadow-gold">
                    Ignite Your <span className="text-gold text-shadow-glow">Market Destiny</span>
                </h1>

                {/* Subheadline */}
                <p className="animate-fade-in text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                    <span className="block text-white font-bold mb-2 text-2xl">Welcome to your new unfair advantage.</span>
                    We combine the precision of <span className="text-gold font-semibold">Data Science</span> with the foresight of <span className="text-gold font-semibold">Financial Astrology</span>.
                    The result? You don't just survive the market, you master it.
                </p>

                {/* Bullet Triad */}
                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: <TrendingUp size={32} className="text-gold" />,
                            title: "Precision Intelligence",
                            desc: "Institutional-grade analysis & backtested wins."
                        },
                        {
                            icon: <Globe size={32} className="text-gold" />,
                            title: "Actionable Education",
                            desc: "Real-world skills from beginner to pro astro-predictions."
                        },
                        {
                            icon: <Star size={32} className="text-gold" />,
                            title: "Your Edge Unleashed",
                            desc: "Cosmic timing meets fundamental smarts."
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-white/5 border border-white/5 p-6 rounded-2xl text-left flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-3 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Stack */}
                <div className="animate-fade-in flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <Link to="/services" className="btn-primary text-lg px-10 py-4 shadow-gold-glow hover:scale-105 whitespace-nowrap flex items-center">
                        Dive into Mentorship <ArrowRight size={20} className="ml-2 flex-shrink-0" />
                    </Link>
                    <Link to="/contact" className="px-10 py-4 text-lg border border-teal-500/50 text-teal-400 bg-teal-900/10 rounded-full hover:bg-teal-900/30 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300 flex items-center">
                        Request Custom Insights
                    </Link>
                </div>

                {/* Trust Bar Footer */}
                <div className="animate-fade-in flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8 max-w-3xl mx-auto text-gray-400 text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <Award size={16} className="text-gold" /> Featured in BSE Events
                    </span>
                    <span className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-gold" /> Karnataka's Trading Trailblazer
                    </span>
                    <span className="flex items-center gap-2">
                        <Shield size={16} className="text-gold" /> Institutional-Grade Research
                    </span>
                </div>

            </div>
        </section>
    );
};

export default HomeHero;
