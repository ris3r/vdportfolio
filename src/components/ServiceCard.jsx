import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ServiceCard = ({ id, title, price, features, isPopular, subtitle }) => {
    const cardRef = useRef(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const tl = gsap.timeline({ paused: true });

        tl.to(card, {
            y: -10,
            scale: isPopular ? 1.08 : 1.03,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            borderColor: 'var(--color-gold)',
            duration: 0.3,
            ease: 'power2.out'
        });

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());

        return () => {
            card.removeEventListener('mouseenter', () => tl.play());
            card.removeEventListener('mouseleave', () => tl.reverse());
        };
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className={`glass-panel relative flex flex-col p-8 h-full transition-all duration-300 ${isPopular ? 'border-gold scale-105 z-10 bg-white/5' : 'border-white/10'}`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{subtitle}</p>}

            <div className="mb-8">
                <span className="text-4xl font-bold text-gold font-heading">{price}</span>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex gap-3 text-gray-300 text-sm">
                        <Check size={18} className="text-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                to={`/product/${id}`}
                className={`w-full py-3 rounded-xl text-center font-semibold transition-all duration-300 ${isPopular
                        ? 'bg-gold text-black hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                        : 'border border-white/20 text-white hover:border-gold hover:text-gold'
                    }`}
            >
                View Plan Details
            </Link>
        </div>
    );
};

export default ServiceCard;
