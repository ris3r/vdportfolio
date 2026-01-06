import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2";

    const variants = {
        primary: "bg-gold text-black hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] border border-transparent",
        outline: "bg-transparent border border-gold text-gold hover:bg-gold hover:text-black",
        ghost: "bg-transparent text-gray-400 hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
