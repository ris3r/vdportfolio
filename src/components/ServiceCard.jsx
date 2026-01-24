import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ServiceCard = ({ id, title, price, priceSuffix, renewal, features, isPopular, specialHighlight, subtitle, buttonText, highlightColor = 'green' }) => {
    const cardRef = useRef(null);
    const isPriceString = typeof price === 'string' || typeof price === 'number';

    const colorMap = {
        green: { bg: 'bg-green-500', shadow: 'shadow-green-500/20', glow: 'rgba(74, 222, 128, 0.15)' },
        purple: { bg: 'bg-purple-600', shadow: 'shadow-purple-600/20', glow: 'rgba(147, 51, 234, 0.25)' }, // Royal Purple
        cyan: { bg: 'bg-cyan-400', shadow: 'shadow-cyan-400/20', glow: 'rgba(34, 211, 238, 0.25)' }     // Neon Blue/Cyan
    };

    // Fallback if an invalid color is passed
    const activeColor = colorMap[highlightColor] || colorMap.green;

    useGSAP(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const tl = gsap.timeline({ paused: true });

        // Hover Effect
        tl.to(card, {
            y: -10,
            scale: isPopular ? 1.05 : 1.02,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            borderColor: 'var(--color-gold)',
            duration: 0.3,
            ease: 'power2.out'
        });

        // Special Pulse Effect
        if (specialHighlight) {
            gsap.to(card, {
                boxShadow: `0 0 20px ${activeColor.glow}`,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "sine.inOut"
            });
        }

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());

        return () => {
            card.removeEventListener('mouseenter', () => tl.play());
            card.removeEventListener('mouseleave', () => tl.reverse());
        };
    }, { scope: cardRef, dependencies: [specialHighlight, activeColor] });

    return (
        <div
            ref={cardRef}
            className={`glass-panel relative flex flex-col p-6 md:p-8 h-full transition-all duration-300 ${isPopular ? 'border-gold bg-neutral-900/80 shadow-2xl' : 'border-white/10'}`}
        >
            {isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-gold/20 whitespace-nowrap z-20">
                    Most Popular
                </div>
            )}

            {specialHighlight && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${activeColor.bg} text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg ${activeColor.shadow} whitespace-nowrap z-20 flex items-center gap-2`}>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                    </span>
                    {specialHighlight}
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-3xl font-heading font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>

            <div className="mb-8 p-0">
                {isPriceString ? (
                    <div className="text-5xl font-bold text-gold font-heading mb-1">{price}</div>
                ) : (
                    <div className="mb-2">{price}</div>
                )}

                {priceSuffix && <div className="text-sm text-gray-300 font-medium mb-1">{priceSuffix}</div>}

                {/* Renewal / Extra Info */}
                {renewal && (
                    <div className="text-xs text-gold/90 border-t border-white/10 pt-3 mt-3 inline-block font-medium tracking-wide">
                        {renewal}
                    </div>
                )}
            </div>

            <ul className="flex-1 space-y-4 mb-10">
                {features.map((feature, index) => (
                    <li key={index} className="flex gap-4 text-gray-200">
                        <Check size={20} className="text-gold shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                to={`/product/${id}`}
                className={`w-full py-4 rounded-xl text-center font-bold text-lg transition-all duration-300 ${isPopular
                    ? 'bg-gold text-black hover:bg-yellow-400 hover:scale-[1.02] shadow-lg shadow-gold/10'
                    : 'border border-white/20 text-white hover:border-gold hover:text-gold hover:bg-white/5'
                    }`}
            >
                {buttonText || "View Details & Inquire"}
            </Link>
        </div>
    );
};

export default ServiceCard;
