import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({
    title = "MASTER THE ART OF WEALTH CREATION",
    subtitle = "Empowering investors with clarity, confidence, and actionable insights. Join the elite community of traders and transform knowledge into opportunity.",
    ctaText = "Explore Services"
}) => {
    return (
        <section
            className="luxury-hero"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #1a1a1a 0%, #000000 60%)'
            }}
        >
            {/* Floating Particles */}
            <div className="hero-particle" style={{ top: '20%', left: '10%', width: '10px', height: '10px', animationDelay: '0s' }}></div>
            <div className="hero-particle" style={{ top: '60%', left: '80%', width: '15px', height: '15px', animationDelay: '2s' }}></div>
            <div className="hero-particle" style={{ top: '80%', left: '20%', width: '8px', height: '8px', animationDelay: '4s' }}></div>
            <div className="hero-particle" style={{ top: '30%', left: '90%', width: '12px', height: '12px', animationDelay: '1s' }}></div>

            {/* Abstract Background Elements (kept for extra depth, optional) */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'rgba(212, 175, 55, 0.05)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '400px',
                height: '400px',
                background: 'rgba(212, 175, 55, 0.03)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h2 className="animate-fade-in" style={{
                    color: 'var(--color-gold)',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    marginBottom: '20px',
                    fontWeight: '600'
                }}>
                    Vinith D'costa & Associates
                </h2>

                <h1 className="animate-fade-in hero-glow-text" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '30px',
                    color: 'white',
                    animationDelay: '0.2s'
                }}>
                    {title}
                </h1>

                <p className="animate-fade-in" style={{
                    fontSize: '1.2rem',
                    color: '#ccc',
                    maxWidth: '800px',
                    margin: '0 auto 40px',
                    animationDelay: '0.4s'
                }}>
                    {subtitle}
                </p>

                <div className="animate-fade-in" style={{ display: 'flex', gap: '20px', justifyContent: 'center', animationDelay: '0.6s' }}>
                    <Link to="/services" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {ctaText} <ArrowRight size={20} />
                    </Link>
                    <Link to="/contact" className="btn btn-outline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
