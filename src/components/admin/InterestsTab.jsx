import React from 'react';
import { Phone, Mail, Trash2 } from 'lucide-react';

const InterestsTab = ({ interests, toggleMessageStatus, confirmDeleteSubmission, renderEmptyState }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-sm">
                    <tr>
                        <th className="p-6 font-normal">Product</th>
                        <th className="p-6 font-normal">User / Contact</th>
                        <th className="p-6 font-normal">Date</th>
                        <th className="p-6 font-normal">Status</th>
                        <th className="p-6 font-normal text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {interests.map(item => (
                        <tr key={item.id} className={`hover:bg-white/5 transition-colors ${item.status === 'unread' ? 'bg-gold/5' : ''}`}>
                            <td className="p-6">
                                <div className="font-medium text-gold">{item.productTitle}</div>
                                {item.selectedPlan && (
                                    <div className="text-xs text-white/70 mt-1 bg-white/10 inline-block px-2 py-1 rounded">
                                        {item.selectedPlan.plan} - {item.selectedPlan.price}
                                    </div>
                                )}
                            </td>
                            <td className="p-6">
                                <div className="text-white">{item.user?.name}</div>
                                <div className="text-sm text-gray-500">{item.user?.email}</div>
                                {item.user?.phone && (
                                    <div className="text-sm text-gold mt-1 flex items-center gap-1">
                                        <Phone size={12} /> {item.user.phone}
                                    </div>
                                )}
                            </td>
                            <td className="p-6 text-gray-400 text-sm">
                                {new Date(item.date).toLocaleString()}
                            </td>
                            <td className="p-6">
                                <button
                                    onClick={() => toggleMessageStatus('interests', item)}
                                    title={item.status === 'replied' ? "Click to revert to Pending" : "Click to mark as Completed"}
                                    className={`min-w-[100px] px-3 py-1 rounded-full text-xs font-bold border transition-colors ${item.status === 'replied'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20'
                                        }`}
                                >
                                    {item.status === 'replied' ? 'COMPLETED' : 'PENDING'}
                                </button>
                            </td>
                            <td className="p-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <a
                                        href={`mailto:${item.user?.email}?subject=Regarding your interest in ${item.productTitle}`}
                                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm text-white transition-colors border border-white/5"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Mail size={16} /> Reply
                                    </a>
                                    <button
                                        onClick={() => confirmDeleteSubmission('interests', item)}
                                        className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg text-sm text-red-500 transition-colors border border-red-500/10"
                                        title="Delete Submission"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {interests.length === 0 && renderEmptyState("No interests found matching filters.")}
        </div>
    );
};

export default InterestsTab;
