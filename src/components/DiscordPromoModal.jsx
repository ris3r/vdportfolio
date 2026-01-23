import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Lock, TrendingUp, ShieldCheck } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const DiscordPromoModal = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if not loading and user is NOT logged in
        if (!loading && !user) {
            // Check if we've shown it recently to avoid TOTAL spam on refresh (optional, but good UX)
            // User asked to "force", so we will show it. 
            // Let's add a small delay so it doesn't pop INSTANTLY on load which looks glitchy
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Animation frame for fade-in
                requestAnimationFrame(() => setIsVisible(true));
            }, 2000); // 2 seconds delay

            return () => clearTimeout(timer);
        }
    }, [loading, user]);

    const handleLogin = () => {
        setIsOpen(false);
        navigate('/login');
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300); // Wait for fade out
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'}`}>
            <div
                className={`w-full max-w-md bg-neutral-900 border border-gold/30 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
                        <MessageCircle size={32} className="text-white" />
                    </div>

                    <h2 className="text-2xl font-heading font-bold text-white mb-2">
                        Unlock Exclusive Access
                    </h2>

                    <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                        Join our elite community on Discord. Get real-time <span className="text-gold font-medium">trade insights</span>, market data, and expert analysis completely free.
                    </p>

                    <div className="grid gap-3 mb-8 text-left">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                            <TrendingUp size={18} className="text-green-400" />
                            <span className="text-sm text-gray-200">Daily Trade Setups & Analysis</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                            <ShieldCheck size={18} className="text-gold" />
                            <span className="text-sm text-gray-200">Verified Member Community</span>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        onClick={handleLogin}
                        className="w-full justify-center group"
                    >
                        <Lock size={18} className="mr-2 group-hover:hidden" />
                        <span className="group-hover:mr-2">Login to Join Discord</span>
                        <MessageCircle size={18} className="hidden group-hover:block transition-all" />
                    </Button>

                    <p className="mt-4 text-xs text-gray-500">
                        Already a member? <button onClick={handleLogin} className="text-white hover:underline">Sign in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DiscordPromoModal;
