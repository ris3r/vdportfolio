import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Star } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const newErrors = {};

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone Validation (10-15 digits, allowing +)
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Please enter a valid phone number (10-15 digits).";
        }

        if (!data.name.trim()) newErrors.name = "Name is required.";
        if (!data.message.trim()) newErrors.message = "Message is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            date: new Date().toISOString(),
            status: 'pending'
        };

        if (!validateForm(data)) {
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            await addDoc(collection(db, 'messages'), data);
            setStatus('success');
            e.target.reset();
            setErrors({});
        } catch (error) {
            console.error("Error sending message: ", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="pt-32 pb-20 bg-black min-h-screen">
            {/* ... (Header and Contact Info sections remain unchanged) ... */}

            <div className="container px-4">
                {/* ... header ... */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-heading font-bold text-white mb-8">Contact Information</h3>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Mail, title: "Email Us", content: "Vinith.oscar@gmail.com",
                                    link: "mailto:Vinith.oscar@gmail.com", isExternal: false
                                },
                                {
                                    icon: Phone, title: "Call Us", content: "+91 63630 15791",
                                    link: "tel:+916363015791", isExternal: false
                                },
                                {
                                    icon: MapPin, title: "Visit Us", content: "Karnataka, India",
                                    link: "https://www.google.com/search?q=Vinith+Dcosta+%26+Associates+Trading+Academy+reviews&sei=Yt9cabWaNZi-5OUP_MKpgAE", isExternal: true
                                }
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target={item.isExternal ? "_blank" : undefined}
                                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                                    className="contact-card flex items-start gap-6 bg-neutral-900/50 p-6 rounded-2xl border border-white/5 hover:border-gold/30 hover:bg-neutral-800/50 transition-all duration-300 group block"
                                >
                                    <div className="bg-gold/10 p-4 rounded-full shrink-0 group-hover:bg-gold/20 transition-colors">
                                        <item.icon size={24} className="text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                                        <p className="text-gray-400 group-hover:text-gold/80 transition-colors">{item.content}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Google Reviews Badge */}
                        <div className="mt-10 contact-card">
                            <a
                                href="https://www.google.com/search?q=Vinith+Dcosta+%26+Associates+Trading+Academy+reviews&sei=Yt9cabWaNZi-5OUP_MKpgAE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#1a1a1a] rounded-xl p-6 border border-white/10 hover:border-gold/30 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer max-w-sm w-full block"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-white p-3 rounded-full mb-4 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px">
                                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                            <path fill="none" d="M0 0h48v48H0z" />
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-1 mb-2">
                                        <span className="text-white text-3xl font-bold">4.8</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={20} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium">319+ Google Reviews</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form glass-panel p-8 md:p-10 border-gold/10">
                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className={`w-full bg-neutral-800/50 border rounded-xl p-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600 ${errors.name ? 'border-red-500' : 'border-neutral-700'}`}
                                    onChange={() => setErrors(prev => ({ ...prev, name: null }))}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    className={`w-full bg-neutral-800/50 border rounded-xl p-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600 ${errors.email ? 'border-red-500' : 'border-neutral-700'}`}
                                    onChange={() => setErrors(prev => ({ ...prev, email: null }))}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Phone Number</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    className={`w-full bg-neutral-800/50 border rounded-xl p-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600 ${errors.phone ? 'border-red-500' : 'border-neutral-700'}`}
                                    onChange={() => setErrors(prev => ({ ...prev, phone: null }))}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Your Message"
                                    className={`w-full bg-neutral-800/50 border rounded-xl p-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600 resize-none ${errors.message ? 'border-red-500' : 'border-neutral-700'}`}
                                    onChange={() => setErrors(prev => ({ ...prev, message: null }))}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-[1.02] transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sending...' : 'Send Message'} <Send size={20} />
                            </button>
                            {status === 'success' && (
                                <p className="text-green-400 text-center font-bold">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-400 text-center font-bold">Failed to send. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
