import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-black text-white px-4">
            <div className="text-gold mb-6 animate-pulse">
                <AlertTriangle size={80} />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-heading mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-200">Page Not Found</h2>
            <p className="text-gray-400 text-center max-w-md mb-10 text-lg">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn-primary flex items-center gap-2 px-8 py-3 text-lg font-bold shadow-lg shadow-gold/10 hover:shadow-gold/30 transition-all">
                <Home size={20} /> Return Home
            </Link>
        </div>
    );
};

export default NotFound;
