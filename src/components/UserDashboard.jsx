import React, { useState } from 'react';
import { PlayCircle, Lock, Shield, Key } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const UserDashboard = ({ user }) => {
    const [myCourses, setMyCourses] = useState([
        { id: 1, title: 'Options Trading Mastery', progress: 35, totalLessons: 24, completedLessons: 8 },
    ]);

    const availableCourses = [
        { id: 2, title: 'Technical Analysis 101', price: '₹45,000' },
        { id: 3, title: 'Crypto Fundamentals', price: '₹62,999' },
    ];

    const handleBuyCourse = (course) => {
        const newCourse = {
            id: course.id,
            title: course.title,
            progress: 0,
            totalLessons: 15, // Mock data
            completedLessons: 0
        };
        setMyCourses([...myCourses, newCourse]);
    };

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

            <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {myCourses.map(course => (
                    <div key={course.id} className="glass-panel p-8 hover:-translate-y-1 transition-transform duration-300">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                            <div className="flex justify-between text-gray-400 text-sm mb-3">
                                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gold rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                        <Button variant="primary" className="w-full justify-center">
                            <PlayCircle size={18} /> Continue Learning
                        </Button>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableCourses.filter(c => !myCourses.find(mc => mc.id === c.id)).map(course => (
                    <div key={course.id} className="glass-panel p-8 bg-neutral-900/40 border-white/5 opacity-80 hover:opacity-100 hover:border-gold/30 transition-all duration-300">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                            <p className="text-2xl font-bold text-gold">{course.price}</p>
                        </div>
                        <Button variant="outline" onClick={() => handleBuyCourse(course)} className="w-full justify-center">
                            <Lock size={18} /> Unlock Course
                        </Button>
                    </div>
                ))}
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
