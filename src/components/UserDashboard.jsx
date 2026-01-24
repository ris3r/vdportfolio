import React, { useState, useEffect } from 'react';
import { PlayCircle, Lock, Shield, Key, Trash2 } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

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

            {/* Community Access Card */}
            <div className="mb-12 relative group rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="bg-neutral-900 rounded-2xl p-8 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#5865F2] flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Join the Premium Community</h2>
                                <p className="text-gray-400 text-sm max-w-xl">
                                    Get instant access to real-time trade signals, exclusive data analysis, and chat directly with our expert traders.
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://discord.gg/6Jve6f35Z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                        >
                            <span>Join Discord Channel</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">My Applications & Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {loadingInterests ? (
                    <div className="text-gray-400 col-span-full">Loading your applications...</div>
                ) : interests.length > 0 ? (
                    interests.map(interest => (
                        <div key={interest.id} className="glass-panel p-6 hover:-translate-y-1 transition-transform duration-300 border border-white/10 relative overflow-hidden group">
                            {/* Status Indicator Line */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${interest.status === 'replied' ? 'bg-green-500' : 'bg-gold'}`}></div>

                            {/* Delete Button (Only for user) */}
                            <button
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    if (window.confirm("Are you sure you want to remove this application?")) {
                                        try {
                                            await deleteDoc(doc(db, 'interests', interest.id));
                                            // UI update is automatic via snapshot listener
                                        } catch (error) {
                                            console.error("Error deleting interest:", error);
                                            alert("Failed to delete. Please try again.");
                                        }
                                    }
                                }}
                                className="absolute top-4 right-4 p-2 bg-neutral-900/80 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 z-10"
                                title="Withdraw Application"
                            >
                                <Trash2 size={16} />
                            </button>

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
                        <Button variant="primary" onClick={() => window.location.href = '/services'}>
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
