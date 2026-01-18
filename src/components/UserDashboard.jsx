import React, { useState, useEffect } from 'react';
import { PlayCircle, Lock, Shield, Key } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const UserDashboard = ({ user }) => {
    const [interests, setInterests] = useState([]);
    const [loadingInterests, setLoadingInterests] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            const q = query(
                collection(db, 'interests'),
                where('user.uid', '==', user.uid)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedInterests = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort by date desc
                fetchedInterests.sort((a, b) => new Date(b.date) - new Date(a.date));
                setInterests(fetchedInterests);
                setLoadingInterests(false);
            }, (error) => {
                console.error("Error fetching user interests:", error);
                setLoadingInterests(false);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const { updateProfile } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [statusData, setStatusData] = useState({ type: '', msg: '' });

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(newPassword)) {
            setStatusData({ type: 'error', msg: 'Password must be 8+ chars, have Upper, Lower, Number & Special Char.' });
            return;
        }

        try {
            await updateProfile({ password: newPassword });
            // Note: updateProfile calls logout internally on success, so we might not see this message
            setStatusData({ type: 'success', msg: 'Password updated. Logging out...' });
        } catch (error) {
            setStatusData({ type: 'error', msg: 'Failed to update password.' });
        }
    };

    console.log("UserDashboard Rendering", user);
    return (
        <div className="">
            <div className="mb-12">
                <h1 className="text-4xl font-heading font-bold text-white mb-2">Welcome, {user?.name}</h1>
                <p className="text-gray-400">Continue your learning journey</p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">My Applications & Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {loadingInterests ? (
                    <div className="text-gray-400 col-span-full">Loading your applications...</div>
                ) : interests.length > 0 ? (
                    interests.map(interest => (
                        <div key={interest.id} className="glass-panel p-6 hover:-translate-y-1 transition-transform duration-300 border border-white/10 relative overflow-hidden">
                            {/* Status Indicator Line */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${interest.status === 'replied' ? 'bg-green-500' : 'bg-gold'}`}></div>

                            <div className="mb-4 pl-4">
                                <h3 className="text-lg font-bold text-white mb-1">{interest.productTitle}</h3>
                                <p className="text-gray-500 text-xs mb-3">Submitted on {new Date(interest.date).toLocaleDateString()}</p>

                                <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${interest.status === 'replied'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {interest.status === 'replied' ? 'Replied / Completed' : 'Pending Review'}
                                </div>
                            </div>

                            <div className="pl-4">
                                {interest.status === 'replied' ? (
                                    <p className="text-sm text-gray-400">Our team has processed your request. Please check your email or messages for next steps.</p>
                                ) : (
                                    <p className="text-sm text-gray-400">Thank you for your interest. Our team will contact you shortly.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-neutral-900/50 border border-white/5 rounded-xl p-8 text-center">
                        <p className="text-gray-400 mb-4">You haven't applied for any courses yet.</p>
                        <Button variant="primary" onClick={() => window.location.href = '/#services'}>
                            <PlayCircle size={18} className="mr-2" /> Explore Courses
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Settings */}
            <div className="border-t border-white/10 pt-12 mt-12 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Shield size={24} className="text-gold" /> Security Settings
                </h2>
                <div className="glass-panel p-8 max-w-2xl">
                    <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
                    {statusData.msg && (
                        <div className={`p-4 rounded-xl mb-6 text-sm ${statusData.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                            {statusData.msg}
                        </div>
                    )}
                    <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter strong new password"
                                className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-white focus:border-gold focus:outline-none"
                            />
                        </div>
                        <Button variant="outline" type="submit" className="w-fit">
                            <Key size={18} /> Update Password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
