import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = ({ data }) => {
    const defaultFaqs = [
        {
            question: "I'm a complete beginner. Which plan is right for me?",
            answer: "For beginners, we highly recommend 'The Golden Mentorship' or the 'CFO Program'. These bundles include our 'Vinith D'costa Financepedia' module which covers all the fundamentals, tools, and financial literacy basics you need before diving into advanced trading strategies."
        },
        {
            question: "Are you SEBI Registered?",
            answer: "Yes, Dr. Vinith D'costa is a SEBI-Registered Research Analyst. We operate with full transparency and strictly adhere to compliance norms. We provide educational views and research-backed analysis, not guaranteed 'tips'."
        },
        {
            question: "What is the difference between Premium and Golden Mentorship?",
            answer: "Premium Mentorship focuses purely on Trading (Daily Insights, Live Masterclasses, F&O). The Golden Mentorship is a comprehensive bundle that includes EVERYTHING in Premium, PLUS the 'Vinith D'costa Financepedia' (Fundamentals) and exclusive Astro-Prediction software. It's the complete package for serious market mastery."
        },
        {
            question: "How do I access the WhatsApp/Discord community?",
            answer: "Once you enroll in any of our mentorship programs, you will receive an automated email with your login credentials and a private invite link to our exclusive community channels."
        }
    ];

    const faqs = data || defaultFaqs;
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black border-t border-white/10">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Frequently Asked <span className="text-gold">Questions</span>
                    </h2>
                    <p className="text-gray-400">
                        Everything you need to know about our mentorship and services.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/30"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-6 flex justify-between items-center text-left focus:outline-none group"
                            >
                                <span className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                                    {faq.question}
                                </span>
                                {activeIndex === index ?
                                    <Minus size={20} className="text-gold shrink-0 transition-transform duration-300 rotate-180" /> :
                                    <Plus size={20} className="text-gold shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                                }
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
