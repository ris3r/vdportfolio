import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side Validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);

        if (!validatePassword(password)) {
            setError("Password must be at least 8 chars, include uppercase, lowercase, number, and special character.");
            setLoading(false);
            return;
        }

        try {
            await register(name, email, password);
            setEmailSent(true);
        } catch (error) {
            console.error(error);
            let msg = 'Failed to create account.';
            if (error.code === 'auth/email-already-in-use') {
                msg = 'This email is already registered. If your account was deleted, please contact support.';
            } else if (error.code === 'auth/weak-password') {
                msg = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/invalid-email') {
                msg = 'Invalid email address.';
            } else if (error.message) {
                msg = error.message;
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-black">
            <div className="w-full max-w-md p-8 md:p-10 bg-neutral-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Join the Elite</h2>
                <p className="text-gray-400 text-center mb-10">Start your journey to financial freedom</p>

                {emailSent ? (
                    <div className="text-center animate-scale-in">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                        <p className="text-gray-400 mb-8">We've sent a verification link to <span className="text-white">{email}</span>. Please verify your email to access the dashboard.</p>

                        <div className="space-y-4">
                            <Link to="/login" className="block w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors">
                                Go to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-center text-sm mb-6">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Must contain: 8+ chars, Uppercase, Lowercase, Number, Special Char (@$!%*?&)
                                </p>
                            </div>

                            <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center py-4 text-lg mt-4">
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <p className="text-center mt-8 text-gray-400 text-sm">
                            Already a member? <Link to="/login" className="text-gold hover:underline">Sign In</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;
