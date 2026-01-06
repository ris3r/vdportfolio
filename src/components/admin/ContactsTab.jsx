import React from 'react';
import { Mail, Trash2 } from 'lucide-react';

const ContactsTab = ({ messages, toggleMessageStatus, confirmDeleteSubmission, renderEmptyState }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-sm">
                    <tr>
                        <th className="p-6 font-normal">Sender</th>
                        <th className="p-6 font-normal">Phone</th>
                        <th className="p-6 font-normal w-1/3">Message</th>
                        <th className="p-6 font-normal">Date</th>
                        <th className="p-6 font-normal">Status</th>
                        <th className="p-6 font-normal text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {messages.map(item => (
                        <tr key={item.id} className={`hover:bg-white/5 transition-colors ${item.status === 'unread' ? 'bg-gold/5' : ''}`}>
                            <td className="p-6">
                                <div className="font-bold text-white">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.email}</div>
                            </td>
                            <td className="p-6 text-gray-400 font-mono text-sm">
                                {item.phone || '-'}
                            </td>
                            <td className="p-6 text-gray-300 text-sm leading-relaxed">
                                {item.message}
                            </td>
                            <td className="p-6 text-gray-400 text-sm">
                                {new Date(item.date).toLocaleString()}
                            </td>
                            <td className="p-6">
                                <button
                                    onClick={() => toggleMessageStatus('messages', item)}
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
                                        href={`mailto:${item.email}?subject=Re: Inquiry`}
                                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-sm text-white transition-colors border border-white/5"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Mail size={16} /> Reply
                                    </a>
                                    <button
                                        onClick={() => confirmDeleteSubmission('messages', item)}
                                        className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg text-sm text-red-500 transition-colors border border-red-500/10"
                                        title="Delete Message"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {messages.length === 0 && renderEmptyState("No messages found matching filters.")}
        </div>
    );
};

export default ContactsTab;
