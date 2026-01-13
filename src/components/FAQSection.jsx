import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = ({ data }) => {
    const defaultFaqs = [
        {
            question: "I'm a complete beginner. Which plan is right for me?",
            answer: "We recommend starting with the Premium Mentorship. For more information and personalized guidance, please call or email us at the details provided below."
        },
        {
            question: "How do I access the market insights?",
            answer: "All actionable calls and market insights are delivered continuously via our exclusive Discord server for real-time access. Important announcements and communications will be shared via our WhatsApp community."
        },
        {
            question: "Do you offer a refund policy?",
            answer: "Our refund policy will be briefed during the onboarding process. For more information, please contact us on the given details below."
        },
        {
            question: "What tools do I need for trading?",
            answer: "A mobile phone is sufficient to get started. However, for better clarity and an enhanced experience, having a laptop is an add-on and not mandatory."
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
