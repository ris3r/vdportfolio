import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, type = 'warning' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 transform transition-all scale-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-5 py-2.5 rounded-xl text-white font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${type === 'danger'
                                ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/20'
                                : 'bg-gradient-to-r from-gold to-yellow-500 text-black shadow-yellow-500/20'
                            }`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
