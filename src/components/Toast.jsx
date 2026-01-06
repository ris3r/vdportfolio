import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />;
            case 'error': return <AlertCircle size={20} />;
            case 'warning': return <AlertCircle size={20} />;
            default: return <Info size={20} />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'warning': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md animate-fade-in shadow-lg ${getColors()}`}>
            {getIcon()}
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
