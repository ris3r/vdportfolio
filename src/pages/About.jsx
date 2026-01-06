import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.founder-image', {
            x: -50,
            opacity: 0,
            duration: 1
        })
            .from('.founder-content', {
                x: 50,
                opacity: 0,
                duration: 1
            }, '-=0.8');

        gsap.from('.credential-item', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.credentials-section',
                start: 'top 80%',
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="pt-32 pb-20 bg-black min-h-screen">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Founder Image Section */}
                    <div className="founder-image relative group w-full max-w-md mx-auto lg:max-w-none">
                        <div className="relative rounded-2xl p-2 bg-gold/5 border border-gold/20 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg -translate-x-1 -translate-y-1"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg translate-x-1 translate-y-1"></div>

                            <img
                                src="/founder_portrait.jpg"
                                alt="Dr. Vinith Oscar D’costa"
                                className="w-full h-auto rounded-xl shadow-2xl filter contrast-110 brightness-110"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="founder-content">
                        <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">The Founder</h4>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                            Dr. Vinith Oscar D’costa
                        </h1>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Dr. Vinith Oscar D’costa is the Founder & Director of Vinith D'costa & Associates, a SEBI-Registered Research Analyst firm. Hailing from Karnataka, he is a distinguished stock market expert and mentor, blending deep financial knowledge with hands-on market experience to empower investors and traders with clarity, confidence, and actionable insights.
                            </p>
                            <p>
                                Over his remarkable journey, Dr. Vinith has mentored and guided more than 1,500 students worldwide, championing the importance of financial literacy and stock market education as essential tools for wealth creation and financial independence.
                            </p>
                        </div>

                        <div className="credentials-section mt-12 bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
                            <h3 className="text-2xl font-semibold text-white mb-6">Education & Credentials</h3>
                            <ul className="space-y-3">
                                {[
                                    "Post Graduate Program in Management (PGPM) – Finance",
                                    "NISM Certified Research Analyst",
                                    "SEBI Investor Certified",
                                    "Doctorate in Financial Management from Kennedy University of Baptist"
                                ].map((cred, index) => (
                                    <li key={index} className="credential-item flex items-start gap-3 text-gray-300">
                                        <div className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0"></div>
                                        <span>{cred}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 bg-gold/5 p-8 rounded-2xl border border-gold/10">
                            <h3 className="text-xl font-semibold text-white mb-4">Institutional Collaborations & Workshops</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                <strong className="text-gold">St. Aloysius College, Mangalore</strong> – Signed MOU to introduce a B.Com program with Investment Management specialization from the 2025 academic year.
                            </p>

                            <h4 className="text-white font-semibold mb-3">College Workshops</h4>
                            <p className="text-gray-400 leading-relaxed mb-2">
                                Conducted workshops in top colleges including:
                            </p>
                            <ul className="list-disc pl-5 text-gray-400 space-y-1 mb-6">
                                <li>Padua</li>
                                <li>Yenepoya</li>
                                <li>St. Agnes</li>
                                <li>Alvas</li>
                                <li>St. Joseph Engineering College Mangalore</li>
                            </ul>

                            <h4 className="text-white font-semibold mb-3">Private Trading Workshops</h4>
                            <p className="text-gray-400 leading-relaxed">
                                Conducted private Trading Workshops in <strong className="text-gold">Dubai, Bangalore, Goa & Mangalore</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
