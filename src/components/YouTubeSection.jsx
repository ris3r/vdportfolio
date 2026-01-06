import React from 'react';
import { Youtube, ExternalLink, Play, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const YouTubeSection = () => {
    return (
        <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}>
            <div className="container">
                <div className="glass-panel" style={{
                    padding: '0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(255, 215, 0, 0.15)'
                }}>
                    {/* Banner styled header */}
                    {/* Banner styled header */}
                    <div className="youtube-header bg-gradient-to-r from-[#111] to-[#222] p-6 md:p-10 border-b border-gold/10 relative flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Abstract Background Element */}
                        <div style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            height: '100%',
                            width: '40%',
                            background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }}></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 w-full justify-center md:justify-start">
                            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                <div className="w-20 h-20 rounded-full bg-black border-2 border-gold flex items-center justify-center shadow-gold-glow overflow-hidden flex-shrink-0">
                                    <img src="/brand_logo.png" alt="Lux Trade Logo" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-heading text-white mb-2 leading-tight">
                                        The Wealth Code <span className="text-lg md:text-xl text-gray-400 font-normal">by</span> <span className="text-gold">Dr. Vinith D'Costa</span>
                                    </h2>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 justify-center md:justify-start items-center mt-2">
                                        <a href="https://youtube.com/@VinithDcosta" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors bg-white/5 px-3 py-1 rounded-full md:bg-transparent md:p-0 md:rounded-none">
                                            <Youtube size={16} /> <span>@VinithDcosta</span>
                                        </a>
                                        <span className="hidden md:inline text-gray-600">|</span>
                                        <span className="text-xs md:text-sm opacity-80">Decode Wealth. Master Trading. Live Free.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="youtube-grid grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                        {/* Left: Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="text-center md:text-left">
                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '20px' }}>
                                Elite Strategies for <span className="text-gold">Financial Freedom</span>
                            </h3>
                            <p style={{ color: '#ccc', marginBottom: '20px', lineHeight: '1.7' }}>
                                Hosted by Dr. Vinith Oscar D’Costa, this podcast channel goes beyond just trading. We invite experts from various sectors to share insights not only on finance but on life, values, and beliefs.
                            </p>
                            <p style={{ color: '#aaa', marginBottom: '30px', lineHeight: '1.7' }}>
                                Join us as we explore the deeper aspects of wealth, success, and personal growth, blending market expertise with real-world wisdom.
                            </p>

                            <div style={{ marginBottom: '30px' }}>
                                <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '15px' }}>What you'll find here:</h4>
                                <ul style={{ display: 'grid', gap: '10px' }} className="justify-items-center md:justify-items-start">
                                    {[
                                        "Inspiring conversations with industry leaders",
                                        "Insights on finance, life, and personal values",
                                        "Weekly episodes on wealth and holistic growth"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ddd' }}>
                                            <TrendingUp size={16} color="var(--color-gold)" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href="https://www.youtube.com/@VinithDcosta?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary bg-gold text-black font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform"
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}
                            >
                                <Youtube size={20} /> Subscribe & Join the Movement
                            </a>

                        </div>

                        {/* Right: Featured Video / Visual */}
                        <div style={{ position: 'relative' }}>
                            {/* Video Placeholder / Thumbnail Area */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                background: '#111',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                position: 'relative'
                            }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/63iyhkdEgAk?si=6shQDl2-5omvxBZY"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Floating Stats Card */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default YouTubeSection;
