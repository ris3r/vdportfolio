import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const authContext = useAuth();

    // Safety check for context
    if (!authContext) {
        console.error("Login: AuthContext is missing!");
        return <div className="text-white p-10">Error: Auth Context Not Available</div>;
    }

    const { user, login, resendVerification, loginMessage, setLoginMessage } = authContext; // Destructure user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    // Effect to handle flash messages from AuthContext and Navigation State
    React.useEffect(() => {
        if (loginMessage) {
            setSuccessMessage(loginMessage);
            setLoginMessage('');
        } else if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear state so it doesn't persist on refresh
            window.history.replaceState({}, document.title);
        }
    }, [loginMessage, setLoginMessage, location]);

    // Redirect to dashboard when user is logged in
    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Timer effect for cooldown
    React.useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoggingIn(true);
        try {
            await login(email, password);
            // navigate('/dashboard'); // Removed to rely on useEffect redirect
        } catch (err) {
            console.error("Login Error:", err.code, err.message);
            let message = 'Failed to sign in.';
            const errorCode = err.code || '';
            const errorMessage = err.message || '';

            if (errorCode === 'auth/email-not-verified' || errorMessage.includes('email-not-verified')) {
                // If specific error state needed, can add here. For now just show error.
                message = 'Please verify your email address before logging in.';
            } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
                if (errorCode === 'auth/user-not-found') {
                    message = 'Account not found. Please register.';
                } else if (errorCode === 'auth/wrong-password') {
                    message = 'Incorrect password.';
                } else {
                    message = 'Invalid email or password.';
                }
            } else if (errorCode === 'auth/too-many-requests') {
                message = 'Too many failed attempts. Please try again later.';
            } else if (errorCode === 'auth/user-disabled') {
                message = errorMessage || 'This account has been disabled by an administrator.';
            } else if (errorCode === 'auth/user-deleted') {
                message = 'This account has been deleted.';
            } else if (errorCode === 'auth/network-request-failed') {
                message = 'Network error. Please check your connection.';
            } else {
                message = errorMessage || 'Failed to sign in. Please try again.';
            }
            setError(message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        setIsResending(true);
        setError('');
        setSuccessMessage('');

        try {
            await resendVerification(email, password);
            // Start 60s cooldown on success
            setCooldown(60);
            setSuccessMessage('Verification email sent! Please check your inbox.');
        } catch (e) {
            console.error("Resend Error:", e);
            const errorCode = e.code || '';

            if (errorCode === 'auth/too-many-requests') {
                setCooldown(60); // Enforce visual cooldown on rate limit
                setError('Too many attempts. Please try again in 60 seconds.');
            } else {
                setError("Failed to send email: " + e.message);
            }
        } finally {
            setIsResending(false);
        }
    };

    // Determine if we should show the verify button based on error message
    // We also show it if successMessage is present, so the user can see state
    const needsVerification = error.includes('verify your email') || successMessage.length > 0 || (error.includes('Too many attempts') && cooldown > 0);

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-black">
            <div className="w-full max-w-md p-8 md:p-10 bg-neutral-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-10">Access your premium dashboard</p>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-center text-sm mb-6">{error}</div>}

                {successMessage && <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg text-center text-sm mb-6">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoggingIn || isResending}
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoggingIn || isResending}
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                        />
                    </div>

                    <Button type="submit" variant="primary" disabled={isLoggingIn || isResending} className="w-full justify-center py-4 text-lg mt-4">
                        {isLoggingIn ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {needsVerification && (
                        <button
                            type="button"
                            disabled={isResending || cooldown > 0}
                            onClick={handleResend}
                            className={`w-full text-sm font-bold mt-2 ${cooldown > 0 ? 'text-green-500 cursor-not-allowed' : 'text-gold hover:underline'}`}
                        >
                            {isResending
                                ? 'Sending...'
                                : cooldown > 0
                                    ? `✓ Email Sent (Try again in ${cooldown}s)`
                                    : 'Resend Verification Email'}
                        </button>
                    )}
                </form>

                <p className="text-center mt-8 text-gray-400 text-sm">
                    Don't have an account? <Link to="/register" className="text-gold hover:underline">Apply for Access</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
