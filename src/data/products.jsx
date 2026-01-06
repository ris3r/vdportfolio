import React from 'react';
import { TrendingUp, Shield, Users, Award, Bitcoin, DollarSign, BarChart2, PieChart } from 'lucide-react';

export const products = [
    {
        id: 'golden-mentorship',
        title: "The Golden Mentorship",
        subtitle: "Collaborating & Bringing You The Ultimate Bundle Offer",
        hook: "Knowledge. Tools. Growth. Expert Guidance.",
        description: "A comprehensive bundle combining Vinith D'costa Financepedia's educational rigor with Vinith D'costa & Associates' expert market guidance. The ultimate path to financial mastery.",
        icon: <Award size={50} color="var(--color-gold)" />,
        price: "₹1,53,000",
        originalPrice: "₹2,00,000",
        saveLabel: "25% OFF",
        features: [
            "Daily Educational Views on Trading",
            "Weekly Live Demo Trading Sessions",
            "Astro Prediction Software & Stock Screeners",
            "Master Prediction Mythology & Financial Astrology",
            "Stock Views (Short-term, Long-term, Penny Stocks)",
            "Options & Futures Trading",
            "Premium Discord Channel Access"
        ],
        details: [
            {
                title: "Vinith D'costa Financepedia",
                originalPrice: "₹1,30,999",
                price: "₹1,00,000",
                items: [
                    "Daily Educational Views on Trading",
                    "Weekly Live Demo Trading Sessions for students",
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
                    "Stock Views: Receive short-term, long-term stock ideas",
                    "Penny stocks from global and Indian markets on a yearly basis",
                    "Options & Futures Trading",
                    "Premium Discord Channel Access"
                ]
            }
        ],
        renewal: "yearly renewal of 15K + 18% GST",
        landingPage: {
            hero: {
                headline: "Unlock the Golden Edge: 25% OFF Astro-Powered Trading Mastery",
                subheadline: "Stop Guessing. Start Dominating. The Ultimate Bundle for Ambitious Traders.",
                cta: "Get Instant Access",
                urgency: "Offer Ends in 7 Days – 35/50 Spots Left!"
            },
            painPoints: [
                { title: "Choppy Signals?", desc: "Stop bleeding capital on lagging indicators." },
                { title: "Missed Rallies?", desc: "Catch the move before the crowd wakes up." },
                { title: "Information Overload?", desc: "Cut the noise with precision astro-timing." }
            ],
            valueVault: {
                vdTools: [
                    "Daily Educational Views (Spot trends pre-bell)",
                    "Weekly Live Demos (Real-time execution mastery)",
                    "Astro Prediction Software (BTC/Forex/Indian/Commodities)",
                    "Master Financial Astrology (Myth-to-money seminars)"
                ],
                vinithExpertise: [
                    "Yearly Stock Views (Short/Long-term ideas)",
                    "Penny Stocks (Vetted rockets)",
                    "Options & Futures Insights (Pro strategies)",
                    "Premium Discord (VIP alerts & War-room vibes)"
                ]
            },
            testimonials: [
                { name: "Raj, Bangalore", quote: "Doubled my Nifty plays—Vinith's pennies are pure alpha!" },
                { name: "Sarah, Mumbai", quote: "The astro software is like having a cheat code for the markets." },
                { name: "Amit, Dubai", quote: "Finally, a mentorship that pays for itself in the first month." }
            ],
            comparison: {
                originalTotal: "₹2,00,998",
                bundlePrice: "₹1,53,000",
                saveAmount: "₹47,998"
            }
        }
    },
    {
        id: 'premium-mentorship',
        title: "Premium Mentorship",
        subtitle: "The Only School That Teaches You To Make Money",
        hook: "Unlock Elite Trading Performance",
        description: "Get exclusive trading views, live masterclasses, and strong equity picks designed to sharpen your skills and build long-term wealth.",
        icon: <TrendingUp size={50} color="var(--color-gold)" />,
        price: "₹62,999",
        period: "/ Yearly",
        features: [
            "Daily Market Insights (NIFTY & BANKNIFTY)",
            "Live Trading Masterclass (Every Week)",
            "Strong Equity Picks for Wealth Creation",
            "Options & Futures - The Power Play",
            "Minimum Capital Required: ₹10,000 - ₹15,000"
        ],
        details: [
            {
                title: "What You'll Experience",
                items: [
                    "Daily Markets Insights: Exclusive views on Index Options, Stock Options & Futures.",
                    "Live Trading Masterclass: Weekly live sessions with real-time chart breakdowns.",
                    "Strong Equity Picks: Build long-term wealth with powerful equity opportunities.",
                    "Options & Futures: Double your potential returns with smart, structured strategies."
                ]
            }
        ],
        landingPage: {
            hero: {
                headline: "PREMIUM MENTORSHIP: The Only School That Teaches You To Make Money",
                subheadline: "Daily Insights. Live Masterclasses. Wealth Creation.",
                cta: "Join the Elite",
                urgency: "Limited Spots for Live Sessions"
            },
            painPoints: [
                { title: "Trading Blindly?", desc: "Stop guessing. Get daily expert views on NIFTY & BANKNIFTY." },
                { title: "Struggling with Timing?", desc: "Master entry and exit with weekly live masterclasses." },
                { title: "No Wealth Strategy?", desc: "Build a long-term portfolio with strong equity picks." }
            ],
            valueVault: {
                vdTools: [
                    "Daily Market Insights (Index & Stock Options)",
                    "Live Trading Masterclass (Weekly Real-time Analysis)",
                    "Strong Equity Picks (Wealth Creation)",
                    "Options & Futures Strategies (Power Play)"
                ],
                vinithExpertise: [
                    "Real-time Chart Breakdowns",
                    "Timing Analysis & Trade Setups",
                    "Smart, Structured Strategies",
                    "Educational Guidance Only"
                ]
            },
            testimonials: [
                { name: "Arjun, Delhi", quote: "The live masterclasses changed my entire perspective on market timing." },
                { name: "Priya, Pune", quote: "Finally profitable thanks to the structured options strategies." },
                { name: "Rahul, Hyderabad", quote: "The equity picks are gems. Building real wealth now." }
            ],
            comparison: {
                originalTotal: "₹75,000",
                bundlePrice: "₹62,999",
                saveAmount: "₹12,001"
            },
            pricingTiers: [
                { plan: "Monthly", price: "₹6,999" },
                { plan: "Half-Yearly", price: "₹33,999" },
                { plan: "Yearly", price: "₹62,999" }
            ],
            ctaSection: {
                headline: "Ready to ",
                highlight: "Dominate",
                headlineSuffix: " the Markets?",
                buttonText: "GET INSTANT ACCESS",
                subtext: "Markets wait for no one. Claim your edge before the stars realign."
            }
        }
    },
    {
        id: 'crypto-code',
        title: "The Crypto Code | Vinith D'costa",
        subtitle: "Decode. Invest. Dominate.",
        hook: "Master the Future of Wealth",
        description: "Step into the world where finance meets innovation. Learn how to build your crypto fortune with logic, discipline, and mastery.",
        icon: <Bitcoin size={50} color="var(--color-gold)" />,
        price: "₹62,999",
        period: "/ Yearly",
        features: [
            "Vinith D'costa is expanding its horizons!",
            "Build your crypto fortune with logic",
            "Discipline and Mastery",
            "Monthly & Half-Yearly Plans Available"
        ],
        details: [
            {
                title: "Vinith D'costa is Expanding Horizons",
                items: [
                    "Step into the world where finance meets innovation.",
                    "Learn how to build your crypto fortune with logic, discipline, and mastery.",
                    "Powered by Vinith D'Costa & Associates."
                ]
            }
        ],
        landingPage: {
            hero: {
                headline: "THE CRYPTO CODE: Decode. Invest. Dominate.",
                subheadline: "Master the Future of Digital Wealth with Logic & Discipline.",
                cta: "Start Your Journey",
                urgency: "The Future is Now"
            },
            painPoints: [
                { title: "Confused by Crypto?", desc: "Decode the market with logic, not hype." },
                { title: "Fear of Volatility?", desc: "Learn to dominate with discipline and mastery." },
                { title: "Missing the Next Big Thing?", desc: "Step into the world where finance meets innovation." }
            ],
            valueVault: {
                vdTools: [
                    "Crypto Market Logic & Analysis",
                    "Discipline & Mastery Training",
                    "Future of Digital Wealth Strategies",
                    "Innovation Meets Finance"
                ],
                vinithExpertise: [
                    "Powered by Vinith D'Costa & Associates",
                    "Building Crypto Fortunes",
                    "Strategic Investment Planning",
                    "Risk Management in Crypto"
                ]
            },
            testimonials: [
                { name: "Vikram, Bangalore", quote: "Demystified crypto for me. No more FOMO, just logic." },
                { name: "Sneha, Mumbai", quote: "The discipline taught here saved me from major crashes." },
                { name: "Rohan, Delhi", quote: "Building a solid crypto portfolio for the long run." }
            ],
            comparison: {
                originalTotal: "₹75,000",
                bundlePrice: "₹62,999",
                saveAmount: "₹12,001"
            },
            ctaSection: {
                headline: "Ready to ",
                highlight: "Decode",
                headlineSuffix: " the Future?",
                buttonText: "GET INSTANT ACCESS",
                subtext: "The next bull run is starting. Don't get left behind."
            }
        }
    },
    {
        id: 'cfo-program',
        title: "Personal Finance CFO Program",
        subtitle: "Construct and Manage Wealth Focused Portfolios",
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
        details: [
            {
                title: "Vinith D'costa Financepedia",
                originalPrice: "₹1,30,999",
                items: [
                    "Fundamental & Tool Training - Spot strong companies, use screeners.",
                    "Market Insights - Weekly updates on macro, micro, & global trends.",
                    "Portfolio & Risk Skills - Construct and manage wealth focused Portfolio.",
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
                subheadline: "Construct and Manage Wealth Focused Portfolios like a Pro.",
                cta: "Become Your Own CFO",
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
            renewal: "yearly renewal of 12K + 18% GST",
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
