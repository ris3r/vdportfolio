import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px' // Offset for fixed navbar
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: -1
            }} />

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                {/* Text Content */}
                <div className="animate-fade-in-up">
                    <span style={{
                        color: 'var(--color-gold)',
                        fontWeight: '600',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Premium Trading Mentorship
                    </span>
                    <h1 style={{
                        fontSize: '4rem',
                        lineHeight: '1.1',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #fff, #ccc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Master the Art of <br />
                        <span style={{
                            background: 'var(--gradient-gold)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Wealth Creation</span>
                    </h1>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '1.1rem',
                        marginBottom: '2.5rem',
                        maxWidth: '500px'
                    }}>
                        Join an exclusive community of elite traders. Get personalized mentorship, real-time signals, and premium portfolio management services.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="primary">Start Your Journey <ArrowRight size={18} /></Button>
                        <Button variant="outline">View Services</Button>
                    </div>
                </div>

                {/* Visual/Image Placeholder */}
                <div className="animate-fade-in-up delay-200" style={{ position: 'relative' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '2rem',
                        transform: 'rotate(-5deg)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        {/* Mock Chart UI */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Portfolio</div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>$1,245,890.00</div>
                            </div>
                            <div style={{ color: 'var(--color-gold)', fontWeight: '600' }}>+24.5%</div>
                        </div>
                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                            {[40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                                <div key={i} style={{
                                    flex: 1,
                                    height: `${h}%`,
                                    background: i === 7 ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px 4px 0 0'
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
