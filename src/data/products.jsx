import React from 'react';
import { TrendingUp, Shield, Users, Award, Bitcoin, DollarSign, BarChart2, PieChart } from 'lucide-react';

export const products = [
    {
        id: 'golden-mentorship',
        title: "The Golden Mentorship",
        subtitle: "Collaborative Bundle Offer",
        hook: "Knowledge. Tools. Growth. Expert Guidance.",
        description: "A comprehensive bundle combining VD Financepedia's educational rigor with Vinith D'costa & Associates' market guidance. The ultimate path to financial mastery.",
        icon: <Award size={50} color="var(--color-gold)" />,
        price: "₹1,53,000",
        originalPrice: "₹2,00,098",
        saveLabel: "25% OFF",
        features: [
            "Daily educational views on Trading",
            "Weekly Live Demo Trading Sessions",
            "Astro Prediction Software & Stock Screeners",
            "Stock Views (Short/Long term, Penny stocks)",
            "Options & Futures Trading",
            "Premium Discord Channel Access"
        ],
        details: [
            {
                title: "VD Financepedia",
                originalPrice: "₹1,30,999",
                price: "₹1,00,000",
                items: [
                    "Daily Educational Views on Trading",
                    "Weekly Live Demo Trading Sessions for the students",
                    "Astro Prediction Software & Stock Screeners (BTC, FOREX, Indian Market & Commodities)",
                    "Master Prediction Mythology & Financial Astrology",
                    "Educational Seminars, Classes & Coaching"
                ]
            },
            {
                title: "Vinith D'costa & Associates",
                originalPrice: "₹57,999",
                price: "₹45,000",
                gst: "+ 18% GST",
                items: [
                    "Stock Views (Short/Long term ideas)",
                    "Quality & Penny stocks (Global/Indian)",
                    "Options & Futures Trading",
                    "Premium Discord Channel Access"
                ]
            }
        ],
        renewal: "yearly renewal of 15K + 18% GST",
        landingPage: {
            hero: {
                headline: "Unlock the Golden Edge: 25% OFF Market Mastery",
                subheadline: "Stop Guessing. Start Dominating. The Collaborative Bundle for Serious Traders.",
                cta: "Register Interest"
            },
            painPoints: [
                { title: "Choppy Signals?", desc: "Stop bleeding capital on lagging indicators." },
                { title: "Missed Rallies?", desc: "Catch the move before the crowd wakes up." },
                { title: "Information Overload?", desc: "Cut the noise with precision market analysis." }
            ],
            valueVault: {
                vdTools: [
                    "Daily Educational Views on Trading",
                    "Weekly Live Demo Trading Sessions",
                    "Astro Prediction Software & Stock Screeners",
                    "Master Prediction Mythology & Astrology",
                    "Educational Seminars, Classes & Coaching"
                ],
                vinithExpertise: [
                    "Stock Views (Short/Long Term)",
                    "Options & Futures Trading",
                    "Quality & Penny Stocks",
                    "Premium Discord Channel Access"
                ]
            },
            testimonials: [
                { name: "Raj, Bangalore", quote: "Doubled my Nifty plays—Vinith's analysis is spot on!" },
                { name: "Sarah, Mumbai", quote: "The screeners are like having a cheat code for the markets." },
                { name: "Amit, Dubai", quote: "Finally, a mentorship that pays for itself in the first month." }
            ],
            comparison: {
                originalTotal: "₹2,00,098",
                bundlePrice: "₹1,53,000",
                saveAmount: "₹47,098"
            }
        }
    },
    {
        id: 'premium-mentorship',
        title: "Premium Mentorship",
        subtitle: "Real Time Market Analysis",
        hook: "Unlock Elite Trading Performance",
        description: "Get exclusive trading views and strong equity picks designed to sharpen your skills and build long-term wealth.",
        icon: <TrendingUp size={50} color="var(--color-gold)" />,
        price: "₹59,000 (Inc. GST)",
        period: "/ Yearly",
        features: [
            "Daily Market Insights (NIFTY, BANKNIFTY, SENSEX & STOCK OPTIONS)",
            "Strong Equity Picks for Wealth Creation",
            "Real Time Market Analysis",
            "Minimum Capital Required: ₹10,000 - ₹15,000"
        ],
        pricingTiers: [
            { plan: "Monthly", price: "₹7,080", note: "(₹6,000 + 18% GST)" },
            { plan: "Half-Yearly", price: "₹35,400", note: "(₹30,000 + 18% GST)" },
            { plan: "Yearly", price: "₹59,000", note: "(₹50,000 + 18% GST)" }
        ],
        details: [
            {
                title: "What You'll Experience",
                items: [
                    "Daily Markets Insights: Exclusive views on NIFTY, BANKNIFTY, SENSEX & STOCK OPTIONS.",
                    "Real Time Market Analysis.",
                    "Strong Equity Picks: Build long-term wealth with powerful equity opportunities."
                ]
            }
        ],
        landingPage: {
            hero: {
                headline: "PREMIUM MENTORSHIP: Real Time Market Analysis",
                subheadline: "Daily Insights. Wealth Creation.",
                cta: "Register Interest",
                urgency: "Limited Spots Available"
            },
            painPoints: [
                { title: "Trading Blindly?", desc: "Stop guessing. Get daily expert views on NIFTY & BANKNIFTY." },
                { title: "Struggling with Timing?", desc: "Master entry and exit with real time analysis." },
                { title: "No Wealth Strategy?", desc: "Build a long-term portfolio with strong equity picks." }
            ],
            valueVault: {
                vdTools: [
                    "Daily Market Insights (Index & Stock Options)",
                    "Real Time Analysis",
                    "Strong Equity Picks (Wealth Creation)"
                ],
                vinithExpertise: [
                    "Real-time Chart Breakdowns",
                    "Timing Analysis & Trade Setups",
                    "Smart, Structured Strategies",
                    "Market Guidance Only"
                ]
            },
            testimonials: [
                { name: "Arjun, Delhi", quote: "The market analysis changed my entire perspective." },
                { name: "Priya, Pune", quote: "Finally profitable thanks to the structured strategies." },
                { name: "Rahul, Hyderabad", quote: "The equity picks are gems. Building real wealth now." }
            ],
            comparison: {
                originalTotal: "₹75,000",
                bundlePrice: "₹59,000 (Inc. GST)",
                saveAmount: "₹25,000"
            },

            ctaSection: {
                headline: "Ready to ",
                highlight: "Dominate",
                headlineSuffix: " the Markets?",
                buttonText: "REGISTER INTEREST",
                subtext: "Markets wait for no one. Claim your edge before the stars realign."
            }
        }
    },
    {
        id: 'cfo-program',
        title: "Personal Finance CFO Program",
        subtitle: "Construct and Manage Wealth-Focused Portfolios",
        hook: "Your Personal Roadmap to Financial Freedom",
        description: "A bundle offer combining Fundamental & Tool Training with expert Stock & Mutual Fund picks. Manage your wealth like a CFO.",
        icon: <PieChart size={50} color="var(--color-gold)" />,
        price: "₹1,29,499",
        originalPrice: "₹1,77,000",
        saveLabel: "BUNDLE OFFER",
        features: [
            "Fundamental & Tool Training",
            "Market Insights & Weekly Updates",
            "Portfolio & Risk Skills",
            "Smart Money Hacks (EMI, Tax, Credit)",
            "Stocks & Mutual Fund Picks",
            "Custom Smallcases & Rebalancing Discipline"
        ],
        renewal: "Renewal: ₹12,000 + 18% GST / Year",
        details: [
            {
                title: "VD Financepedia",
                originalPrice: "₹1,30,999",
                items: [
                    "Fundamental & Tool Training - Spot strong companies, use screeners.",
                    "Market Insights - Weekly updates on macro, micro, & global trends.",
                    "Portfolio & Risk Skills - Construct and manage wealth-focused Portfolio.",
                    "Smart Money Hacks - EMI, tax, credit & expense strategies.",
                    "Psychology & Discipline - Fear out, clarity in."
                ]
            },
            {
                title: "Vinith D'costa & Associates",
                originalPrice: "₹37,099",
                items: [
                    "Stocks & Mutual Fund Picks - Strong equities + curated MF portfolios.",
                    "Custom Smallcases - portfolios tailored to your risk & goals.",
                    "Rebalancing Discipline - Quarterly/half-yearly reviews.",
                    "Actionable Calls - Clear buy/sell signals with timeframes."
                ]
            }
        ],
        landingPage: {
            hero: {
                headline: "PERSONAL FINANCE CFO PROGRAM: Your Roadmap to Financial Freedom",
                subheadline: "Construct and Manage Wealth-Focused Portfolios like a Pro.",
                cta: "Register Interest",
                urgency: "25% OFF Bundle Offer"
            },
            painPoints: [
                { title: "Financial Chaos?", desc: "Get a clear roadmap with Fundamental & Tool Training." },
                { title: "Bad Investments?", desc: "Spot strong companies and use screeners effectively." },
                { title: "Wealth Stagnation?", desc: "Construct and manage wealth-focused portfolios." }
            ],
            valueVault: {
                vdTools: [
                    "Fundamental & Tool Training",
                    "Market Insights (Macro/Micro Trends)",
                    "Portfolio & Risk Skills",
                    "Smart Money Hacks (EMI, Tax, Credit)",
                    "Psychology & Discipline"
                ],
                vinithExpertise: [
                    "Stock & Mutual Fund Picks",
                    "Custom Smallcases (Tailored Portfolios)",
                    "Rebalancing Discipline (Quarterly/Half-yearly)",
                    "Actionable Buy/Sell Calls"
                ]
            },
            testimonials: [
                { name: "Anjali, Pune", quote: "I finally understand where my money is going and how to grow it." },
                { name: "Karthik, Chennai", quote: "The smart money hacks alone saved me lakhs in interest." },
                { name: "Meera, Bangalore", quote: "A complete holistic approach to personal finance. Highly recommend." }
            ],
            comparison: {
                originalTotal: "₹1,77,098",
                bundlePrice: "₹1,29,499",
                saveAmount: "₹47,599"
            },

            ctaSection: {
                headline: "Ready to ",
                highlight: "Command",
                headlineSuffix: " Your Wealth?",
                buttonText: "GET INSTANT ACCESS",
                subtext: "Financial freedom is a choice. Make yours today."
            }
        }
    }
];
