import React from 'react';
import { CheckCircle, Lock, Ban, Trash2 } from 'lucide-react';

const UsersTab = ({ users, actionFeedback, confirmPasswordReset, confirmUpdateStatus, confirmDeleteUser, renderEmptyState }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-sm">
                    <tr>
                        <th className="p-6 font-normal">User Details</th>
                        <th className="p-6 font-normal">Status</th>
                        <th className="p-6 font-normal">Joined</th>
                        <th className="p-6 font-normal text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-6">
                                <div className="flex items-center gap-2">
                                    <div className="font-bold text-white">{user.name || 'No Name'}</div>
                                    {(user.role === 'admin' || user.role === 'superadmin') && (
                                        <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20 font-bold tracking-wider">ADMIN</span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="p-6">
                                {user.isBlocked ? (
                                    <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">BLOCKED</span>
                                ) : (
                                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">ACTIVE</span>
                                )}
                            </td>
                            <td className="p-6 text-gray-400 text-sm">
                                {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : '-'}
                            </td>
                            <td className="p-6 text-right">
                                <div className="flex gap-2 justify-end">
                                    {actionFeedback[`${user.email}-reset`] === 'success' ? (
                                        <div className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 animate-fade-in flex items-center justify-center w-[36px] h-[36px]">
                                            <CheckCircle size={18} />
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => confirmPasswordReset(user)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="Send Password Reset Email"
                                        >
                                            <Lock size={18} />
                                        </button>
                                    )}

                                    {user.isBlocked ? (
                                        <button
                                            onClick={() => confirmUpdateStatus(user, false)}
                                            className="p-2 rounded-lg transition-colors text-green-400 hover:bg-green-500/10"
                                            title="Enable User (Unblock)"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => confirmUpdateStatus(user, true)}
                                            className="p-2 rounded-lg transition-colors text-yellow-400 hover:bg-yellow-500/10"
                                            title="Disable User (Block)"
                                        >
                                            <Ban size={18} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => confirmDeleteUser(user)}
                                        className="p-2 rounded-lg transition-colors text-red-400 hover:bg-red-500/10"
                                        title="Delete User"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && renderEmptyState("No users found.")}
        </div>
    );
};

export default UsersTab;
