import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PageWrapper = ({ children }) => {
    const wrapperRef = useRef(null);
    const location = useLocation();

    useGSAP(() => {
        gsap.fromTo(
            wrapperRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [location.pathname]); // Re-run animation when path changes

    return (
        <div ref={wrapperRef} className="w-full">
            {children}
        </div>
    );
};

export default PageWrapper;
