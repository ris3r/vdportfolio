import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    console.log("Dashboard Render - Loading:", loading, "User:", user);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gold bg-black">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    console.log("Dashboard Render - Rendering Content. Role:", user.role);

    return (
        <div className="pt-28 pb-16 min-h-screen bg-black">
            <div className="container px-4 mx-auto">
                {(user.role === 'admin' || user.role === 'superadmin') ? <AdminDashboard /> : <UserDashboard user={user} />}
            </div>
        </div>
    );
};

export default Dashboard;
