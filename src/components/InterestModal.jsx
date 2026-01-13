import React, { useState } from 'react';
import { X, Check, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InterestModal = ({ isOpen, onClose, product, isAutoSuccess }) => {
    const { user, register } = useAuth();
    const [step, setStep] = useState(isAutoSuccess ? 'success' : 'form');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    if (!isOpen) return null;

    const validateForm = () => {
        if (user) return true; // Logged in users are pre-validated

        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Please enter a valid phone number (10-15 digits).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStep('processing');

        // Simulate processing delay
        setTimeout(async () => {
            // Processing logic (legacy for non-logged-in if we ever reused it, but now bypassed)

            // For now, just show success
            setStep('success');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center p-5 animate-fade-in">
            <div className="bg-neutral-900 border border-gold/50 rounded-2xl p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {step === 'form' && (
                    <>
                        <h2 className="font-heading text-3xl mb-2 text-white">
                            Exclusive <span className="text-gold">Access</span>
                        </h2>
                        <p className="text-gray-400 mb-8">
                            You are one step away from {product.title}. Complete your details to secure your spot.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                            {!user && (
                                <>
                                    <div>
                                        <label className="block text-gray-500 mb-1 text-sm">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                                setErrors(prev => ({ ...prev, name: null }));
                                            }}
                                            className={`w-full p-3 bg-neutral-800 border rounded-lg text-white focus:border-gold focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-neutral-700'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 mb-1 text-sm">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                setErrors(prev => ({ ...prev, email: null }));
                                            }}
                                            className={`w-full p-3 bg-neutral-800 border rounded-lg text-white focus:border-gold focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-neutral-700'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 mb-1 text-sm">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                setFormData({ ...formData, phone: e.target.value });
                                                setErrors(prev => ({ ...prev, phone: null }));
                                            }}
                                            className={`w-full p-3 bg-neutral-800 border rounded-lg text-white focus:border-gold focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-neutral-700'}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </>
                            )}

                            {user && (
                                <div className="bg-gold/10 p-4 rounded-xl border border-gold/30">
                                    <p className="text-gold font-bold mb-1">Logged in as {user.name}</p>
                                    <p className="text-gray-300 text-sm">{user.email}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 text-lg mt-2 rounded-full bg-gold text-black font-bold hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
                            >
                                {user ? 'Confirm Interest' : 'Secure My Spot'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'processing' && (
                    <div className="text-center py-10">
                        <Loader size={40} className="stroke-gold animate-spin mx-auto mb-5" />
                        <p className="text-white text-xl">Securing your spot...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="text-center">
                        <div className="bg-gold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} className="text-black" />
                        </div>
                        <h2 className="font-heading text-3xl mb-4 text-white">
                            Application Received
                        </h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Thank you for your interest in <strong>{product.title}</strong>.
                            To ensure the highest quality of our cohort, we review every application carefully.
                        </p>
                        <div className="bg-neutral-800 p-4 rounded-xl text-sm text-gray-400">
                            Our team will evaluate your profile and reach out within <strong>24-48 hours</strong> to discuss the next steps.
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-transparent border border-neutral-600 text-white px-8 py-3 rounded-full mt-8 hover:border-white transition-all"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterestModal;
