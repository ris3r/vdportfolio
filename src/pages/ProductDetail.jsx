import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Check, ArrowRight, Shield, Users, TrendingUp, Award, Star, X } from 'lucide-react';
import InterestModal from '../components/InterestModal';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const product = products.find(p => p.id === id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [interestStatus, setInterestStatus] = useState(null);
    const [showPhonePrompt, setShowPhonePrompt] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(product?.pricingTiers?.[0] || null);

    useEffect(() => {
        if (product?.pricingTiers) {
            setSelectedPlan(product.pricingTiers[0]);
        }
    }, [product]);

    // Simple inline Phone Prompt Modal Component
    const PhonePromptModal = () => {
        const [phoneInput, setPhoneInput] = useState('');
        const { updateProfile } = useAuth(); // Assuming AuthContext exposes updateProfile

        if (!showPhonePrompt) return null;

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!phoneInput.trim()) return;

            try {
                // 1. Update Profile
                await updateProfile({ phone: phoneInput });

                // 2. Submit Interest (Retry)
                await handleInterestClick(true); // Retry flag

                setShowPhonePrompt(false);
            } catch (error) {
                console.error("Phone update failed:", error);
                alert("Failed to update phone number. Please try again.");
            }
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-neutral-900 border border-gold/30 p-8 rounded-2xl max-w-md w-full relative">
                    <button
                        onClick={() => setShowPhonePrompt(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                    <h3 className="text-2xl font-bold text-white mb-4">One Last Step</h3>
                    <p className="text-gray-400 mb-6">Please provide your phone number so we can reach you to confirm your spot.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="tel"
                            required
                            autoFocus
                            placeholder="Phone Number"
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-yellow-400"
                        >
                            Confirm & Continue
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const handleInterestClick = async (isRetry = false) => {
        console.log("Interest Click Debug:", { isRetry, userPhone: user?.phone, user });

        if (!user) {
            navigate('/login', { state: { message: "Please log in to confirm your interest." } });
            return;
        }

        // Phone Number Check
        // Explicitly check for empty string or null/undefined
        if (!isRetry && (!user.phone || user.phone.trim() === '')) {
            console.log("Phone Missing! Prompting...");
            setShowPhonePrompt(true);
            return;
        }

        // Auto-submit for logged-in users
        try {
            // Check for duplicates
            const q = query(
                collection(db, 'interests'),
                where('user.uid', '==', user.uid),
                where('productId', '==', product.id)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("You have already registered your interest for this product.");
                return;
            }

            await addDoc(collection(db, 'interests'), {
                productId: product.id,
                productTitle: product.title,
                selectedPlan: selectedPlan ? selectedPlan : null, // Store selected plan
                user: {
                    name: user.name || user.email.split('@')[0],
                    email: user.email,
                    phone: user.phone, // Ensure phone is captured
                    uid: user.uid
                },
                date: new Date().toISOString(),
                status: 'pending'
            });
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error submitting interest:", error);
            alert("Failed to submit interest. Please try again.");
        }
    };

    // Refs for animation
    const containerRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Text Stagger
        tl.from(".hero-text-anim", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Floating particles animation
        gsap.to(".hero-particle", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            stagger: 0.5,
            ease: "sine.inOut"
        });

        // Scroll animations for sections
        const sections = gsap.utils.toArray('.animate-section');
        sections.forEach(section => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        });

    }, { scope: containerRef });

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
                <Link to="/" className="text-gold hover:underline">Return Home</Link>
            </div>
        );
    }

    const isLuxuryBundle = ['golden-mentorship', 'cfo-program'].includes(product.id) && product.landingPage;

    return (
        <div ref={containerRef} className="bg-black min-h-screen font-main text-white pt-20">
            <InterestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                isAutoSuccess={!!user && user.phone} // Only auto-success if phone exists
            />
            <PhonePromptModal />

            {/* --- LUXURY BUNDLE LAYOUT --- */}
            {isLuxuryBundle ? (
                <div className="bg-black">
                    {/* 1. Hero Section */}
                    <section
                        ref={heroRef}
                        className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_70%)]"
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.03)_0%,transparent_50%)] pointer-events-none"></div>

                        {/* Floating Particles */}
                        <div className="hero-particle absolute top-[20%] left-[10%] w-2 h-2 bg-gold/20 rounded-full blur-[1px]"></div>
                        <div className="hero-particle absolute top-[60%] right-[20%] w-3 h-3 bg-gold/10 rounded-full blur-[2px]"></div>

                        <div className="relative z-10 max-w-5xl mx-auto">
                            <span className="hero-text-anim inline-block bg-gold/10 text-gold border border-gold/20 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-[0.2em] mb-8 backdrop-blur-sm">
                                {product.subtitle}
                            </span>

                            <h1 className="hero-text-anim text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-none mb-8 tracking-tighter uppercase drop-shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                                {product.id === 'golden-mentorship' ? (
                                    <>
                                        The <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gold filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                            Golden Mentorship
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gold filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                        {product.title}
                                    </span>
                                )}
                            </h1>

                            <h2 className="hero-text-anim text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                                {product.description}
                            </h2>

                            <div className="hero-text-anim flex flex-wrap justify-center gap-8 mb-16 text-gray-400 font-medium">
                                <div className="flex items-center gap-3">
                                    <Shield size={20} className="text-gold" />
                                    <span className="border-b border-dotted border-gray-600">SEBI Registered</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users size={20} className="text-gold" />
                                    <span className="border-b border-dotted border-gray-600">1,500+ Mentored</span>
                                </div>
                            </div>

                            {/* Glass CTA Card */}
                            <div className="hero-text-anim glass-panel mx-auto max-w-4xl p-10 md:p-16 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                                <span className="inline-block bg-gold text-black px-4 py-1 rounded-full font-bold text-xs uppercase mb-6 tracking-wide">
                                    Limited Time Bundle Offer
                                </span>

                                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
                                    Unlock The <span className="text-gold">Golden Edge</span>
                                </h2>

                                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                    Stop Guessing. Start Dominating. <br />
                                    <span className="text-gold">The Ultimate Bundle for Ambitious Traders.</span>
                                </p>

                                <div className="flex justify-center mb-10">
                                    <div className="bg-gold/5 border border-gold/20 px-6 py-2 rounded-full text-gold font-semibold shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                                        {product.landingPage.hero.urgency}
                                    </div>
                                </div>



                                <button
                                    onClick={() => handleInterestClick(false)}
                                    className="relative z-10 px-10 py-5 bg-gold text-black text-xl font-bold rounded-full hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all duration-300"
                                >
                                    {product.landingPage.hero.cta}
                                </button>
                            </div>
                        </div>
                    </section >

                    {/* 2. Pain Points */}
                    < section className="py-24 bg-neutral-900/30" >
                        <div className="container px-4">
                            <div className="text-center mb-16 animate-section">
                                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
                                    From Market Chaos to <span className="text-gold">Strategic Gains</span>
                                </h2>
                                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                    Stop letting the market control you. It's time to take charge with data, astrology, and expert guidance.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {product.landingPage.painPoints.map((point, i) => (
                                    <div key={i} className="animate-section glass-panel p-8 md:p-10 border-l-4 border-l-gold hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-2xl font-bold text-white mb-4">{point.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{point.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section >

                    {/* 3. Value Vault */}
                    < section className="py-24 bg-black" >
                        <div className="container px-4">
                            <div className="text-center mb-20 animate-section">
                                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                                    Your <span className="text-gold">Golden Arsenal</span>
                                </h2>
                                <p className="text-gray-400 text-lg">Tools + Expertise = Unfair Advantage</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* VD Tools */}
                                <div className="animate-section bg-neutral-900/50 p-10 rounded-3xl border border-white/10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="bg-gold p-3 rounded-full">
                                            <TrendingUp size={32} className="text-black" />
                                        </div>
                                        <h3 className="text-3xl font-heading font-bold text-white">Vinith D'costa Tools</h3>
                                    </div>
                                    <ul className="space-y-6">
                                        {product.landingPage.valueVault.vdTools.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 text-lg text-gray-300">
                                                <Check size={24} className="text-gold shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Expertise */}
                                <div className="animate-section bg-neutral-900/50 p-10 rounded-3xl border border-white/10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="bg-gold p-3 rounded-full">
                                            <Award size={32} className="text-black" />
                                        </div>
                                        <h3 className="text-3xl font-heading font-bold text-white">Expert Guidance</h3>
                                    </div>
                                    <ul className="space-y-6">
                                        {product.landingPage.valueVault.vinithExpertise.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 text-lg text-gray-300">
                                                <Check size={24} className="text-gold shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* 4. Pricing / Offer */}
                    < section className="py-24 bg-neutral-900/10 mb-20" >
                        <div className="container px-4">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-12 text-white">
                                Why This is Your <span className="text-gold">No-Brainer Launchpad</span>
                            </h2>

                            <div className="glass-panel max-w-2xl mx-auto p-0 overflow-hidden relative transform hover:scale-[1.01] transition-transform duration-500 animate-section border-gold/30 shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                                <div className="bg-gold text-black font-black text-center py-3 uppercase tracking-widest text-sm shadow-lg">
                                    Limited Time Offer
                                </div>

                                <div className="p-10 md:p-14">
                                    <div className="space-y-4 mb-8">
                                        {product.details.slice(0, 2).map((detail, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-gray-300 text-lg border-b border-white/10 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <Check size={20} className="text-gold" />
                                                    <span>{detail.title}</span>
                                                </div>
                                                <span className="line-through text-gray-600">{detail.originalPrice}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center mb-10">
                                        <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Total Value</p>
                                        <p className="text-3xl font-bold text-gray-500 line-through decoration-red-500/50">
                                            {product.landingPage.comparison.originalTotal}
                                        </p>
                                    </div>

                                    <div className="text-center text-gold mb-10">
                                        <ArrowRight size={32} className="rotate-90 mx-auto animate-bounce" />
                                    </div>

                                    <div className="text-center mb-12">
                                        <p className="text-white uppercase tracking-widest font-bold mb-4 text-sm">Your Deal Price</p>
                                        <p className="text-6xl md:text-8xl font-heading font-black text-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] leading-none">
                                            {product.landingPage.comparison.bundlePrice}
                                        </p>
                                    </div>

                                    <div className="text-center mb-12">
                                        <span className="inline-block bg-red-500/10 border border-red-500/50 text-red-400 px-8 py-3 rounded-full font-bold text-xl">
                                            YOU SAVE {product.landingPage.comparison.saveAmount} 🔥
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleInterestClick(false)}
                                        className="w-full py-5 bg-gold text-black font-black text-xl md:text-2xl rounded-full hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all"
                                    >
                                        {product.landingPage.hero.cta}
                                    </button>
                                    <p className="text-center text-gray-500 mt-6 text-sm">{product.renewal}</p>
                                </div>
                            </div>
                        </div>
                    </section >
                </div >
            ) : (
                /* --- GENERIC PRODUCT LAYOUT --- */
                <div>
                    <section
                        ref={heroRef}
                        className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_70%)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05)_0%,transparent_50%)] pointer-events-none"></div>

                        <div className="relative z-10 max-w-5xl mx-auto">
                            <span className="hero-text-anim inline-block bg-gold/10 text-gold border border-gold/20 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-[0.2em] mb-8 backdrop-blur-sm">
                                {product.subtitle || "Premium Service"}
                            </span>
                            <h1 className="hero-text-anim text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-none mb-8 tracking-tighter uppercase">
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gold filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                    {product.title}
                                </span>
                            </h1>
                            <h2 className="hero-text-anim text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                                {product.landingPage?.hero.subheadline || product.description}
                            </h2>

                            <div className="hero-text-anim flex flex-wrap justify-center gap-8 mb-16 text-gray-400 font-medium">
                                <div className="flex items-center gap-3">
                                    <Shield size={20} className="text-gold" />
                                    <span className="border-b border-dotted border-gray-600">SEBI Registered</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users size={20} className="text-gold" />
                                    <span className="border-b border-dotted border-gray-600">1,500+ Mentored</span>
                                </div>
                            </div>



                            <button
                                onClick={() => handleInterestClick(false)}
                                className="hero-text-anim px-10 py-4 bg-gold text-black text-lg font-bold rounded-full hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300"
                            >
                                {product.landingPage?.hero.cta || "Register Interest"}
                            </button>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="py-20 bg-neutral-900/50">
                        <div className="container px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8 animate-section">
                                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                        Why Choose <span className="text-gold">{product.title}?</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        {product.hook}
                                    </p>
                                    <ul className="space-y-4">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex gap-4 text-gray-300">
                                                <Check size={24} className="text-gold shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="animate-section glass-panel p-10 text-center border-gold/20">
                                    {product.pricingTiers ? (
                                        <div className="mb-8 w-full">
                                            {/* Custom Dropdown Styling */}
                                            <div className="relative max-w-sm mx-auto mb-6">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                    <Award size={20} className="text-gold" />
                                                </div>
                                                <select
                                                    value={selectedPlan?.plan || ''}
                                                    onChange={(e) => {
                                                        const plan = product.pricingTiers.find(p => p.plan === e.target.value);
                                                        setSelectedPlan(plan);
                                                    }}
                                                    className="w-full bg-black/40 border border-gold/30 text-white text-lg rounded-xl pl-12 pr-6 py-4 appearance-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all cursor-pointer hover:bg-black/60"
                                                    style={{ backgroundImage: 'none' }} // Remove default arrow if needed or use custom
                                                >
                                                    {product.pricingTiers.map((tier, index) => (
                                                        <option key={index} value={tier.plan} className="bg-neutral-900 text-white py-2">
                                                            {tier.plan}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* Custom Arrow */}
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                    <TrendingUp size={16} className="text-gray-400" />
                                                </div>
                                            </div>

                                            <div className="animate-fade-in space-y-2">
                                                <p className="text-gray-400 text-sm uppercase tracking-widest">Total Investment</p>
                                                <p className="text-5xl md:text-6xl font-heading font-bold text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                                    {selectedPlan?.price}
                                                </p>
                                                <p className="text-gray-500 text-sm italic font-medium">
                                                    (Inclusive of 18% GST)
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-6xl font-heading font-bold text-gold mb-4">
                                            {product.price}
                                        </p>
                                    )}
                                    {product.period && !product.pricingTiers && <p className="text-gray-500 mb-8">{product.period}</p>}

                                    <button
                                        onClick={handleInterestClick}
                                        className="w-full py-4 bg-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-all"
                                    >
                                        Register Interest
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div >
    );
};

export default ProductDetail;
