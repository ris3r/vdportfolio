import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimateOnScroll = ({ children, animation = 'fade-up', delay = 0, duration = 0.8, className = '' }) => {
    const elementRef = useRef(null);

    useGSAP(() => {
        const element = elementRef.current;
        if (!element) return;

        let initialVars = {};

        switch (animation) {
            case 'fade-up':
                initialVars = { y: 50, opacity: 0 };
                break;
            case 'fade-in':
                initialVars = { opacity: 0 };
                break;
            case 'slide-left':
                initialVars = { x: -50, opacity: 0 };
                break;
            case 'slide-right':
                initialVars = { x: 50, opacity: 0 };
                break;
            case 'scale-up':
                initialVars = { scale: 0.8, opacity: 0 };
                break;
            default:
                initialVars = { y: 50, opacity: 0 };
        }

        gsap.fromTo(
            element,
            initialVars,
            {
                ...Object.keys(initialVars).reduce((acc, key) => ({ ...acc, [key]: key === 'scale' ? 1 : 0 }), {}), // Reset values to default (0 or 1)
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%', // Animate when top of element hits 85% of viewport height
                    toggleActions: 'play none none reverse' // Re-play on enter, reverse on leave? Or just play once? 
                    // Let's stick to 'play none none none' for a "once" feel, or 'play none none reverse' for re-animating.
                    // 'play none none reverse' is good for keeping the site alive.
                }
            }
        );
    }, { scope: elementRef });

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

export default AnimateOnScroll;
