import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { User, Mail, Phone, Lock, Save, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        } else if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [user, loading, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        setMessage(null);

        try {
            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            };

            const result = await updateProfile(updateData);

            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            /*
            // If password was updated, AuthContext handles logout/alert.
            // But if only profile data was updated:
            if (!formData.password) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                // Should be redirected/logged out by AuthContext, but just in case:
                setMessage({ type: 'success', text: 'Password updated. Logging out...' });

                // Explicitly redirect to login after a short delay to allow user to read message
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            */


        } catch (error) {
            console.error("Settings Update Error:", error);
            setMessage({ type: 'error', text: 'Failed to update profile. ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-main pt-32 pb-20">
            <div className="container px-4 max-w-4xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-heading font-bold mb-2">Account Settings</h1>
                    <p className="text-gray-400">Manage your profile information and security.</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                        {message.type === 'success' && <CheckCircle size={20} />}
                        {message.text}
                    </div>
                )}

                <div className="glass-panel p-8 md:p-10 border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Personal Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-gray-400 text-sm">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-gray-400 text-sm">Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-gray-400 text-sm">Phone Number</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Add phone number"
                                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-neutral-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button variant="primary" type="submit" className="w-full md:w-auto px-8">
                                {loading ? 'Saving Changes...' : (
                                    <>
                                        <Save size={18} /> Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Settings;
