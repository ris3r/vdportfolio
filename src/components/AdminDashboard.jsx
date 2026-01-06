import React, { useState, useEffect } from 'react';
import { BookOpen, Users, DollarSign, X, Calendar, Mail, Phone, CheckCircle, Shield, MessageSquare, Ban, Lock, Unlock, Filter, Send, ExternalLink, RefreshCw, Trash2, Power } from 'lucide-react';
import { products } from '../data/products';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from './Toast';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../context/AuthContext';
import UsersTab from './admin/UsersTab';
import InterestsTab from './admin/InterestsTab';
import ContactsTab from './admin/ContactsTab';

const AdminDashboard = () => {
    const { user: currentUserProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('users'); // users, interests, contacts
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalInterests: 0,
        totalMessages: 0
    });
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, today, yesterday, older
    const [statusFilter, setStatusFilter] = useState('all'); // all, unread, read/replied
    const [toast, setToast] = useState(null); // { message, type }
    const [confirmModal, setConfirmModal] = useState({ isOpen: false });
    const [actionFeedback, setActionFeedback] = useState({}); // { [userId-action]: 'success' | 'error' }

    const triggerActionFeedback = (keyIdentifier, action, status = 'success') => {
        const key = `${keyIdentifier}-${action}`;
        setActionFeedback(prev => ({ ...prev, [key]: status }));
        setTimeout(() => {
            setActionFeedback(prev => {
                const newState = { ...prev };
                delete newState[key];
                return newState;
            });
        }, 3000);
    };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (currentUserProfile) {
            fetchData();
        }
    }, [currentUserProfile]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Users
            const usersSnapshot = await getDocs(collection(db, 'users'));
            let fetchedUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // HIERARCHY LOGIC:
            // 1. Always hide SELF.
            fetchedUsers = fetchedUsers.filter(u => u.uid !== auth.currentUser?.uid);

            // 2. If NOT Super Admin, hide other Admins.
            const isSuperAdmin = currentUserProfile?.role === 'superadmin';

            if (!isSuperAdmin) {
                // Normal Admin -> Sees only 'user' role (Hides other admins)
                fetchedUsers = fetchedUsers.filter(u => u.role !== 'admin' && u.role !== 'superadmin');
            }
            // Assuming 'vdassociates029@gmail.com' is the ONLY Super Admin for now as per request.
            // Or we can check if currentUser.role === 'superadmin'.
            // User requested: "vd associate is a super user... normal admin cannot see other normal admins"

            // We need the CURRENT USER'S ROLE. 
            // Since 'user' from context might be stale or not passed to this generic fetch function easily without props or context,
            // we will rely on the Context 'user' object if available, OR fetch it.
            // However, 'auth.currentUser' doesn't have the role.
            // We should use the 'user' from useAuth() hook which we will add to the component.

            // For now, let's implement the filtering in the RENDER or here if we have the context user.
            // I will initialize 'currentUserProfile' from useAuth() in the component body and use it here.
            // But since fetchData is inside useEffect, we need to ensure we have the profile.

            // *Correction*: I will use the 'user' from `useAuth` which is already available in the component scope?
            // No, the component currently does NOT use `useAuth`. I need to add it.

            setUsers(fetchedUsers);

            // Fetch Messages
            const messagesSnapshot = await getDocs(collection(db, 'messages'));
            const fetchedMessages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by date desc
            fetchedMessages.sort((a, b) => new Date(b.date) - new Date(a.date));
            setMessages(fetchedMessages);

            // Fetch Interests
            const interestsSnapshot = await getDocs(collection(db, 'interests'));
            const fetchedInterests = interestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            fetchedInterests.sort((a, b) => new Date(b.date) - new Date(a.date));
            setInterests(fetchedInterests);

            // Calculate Stats
            setStats({
                totalUsers: fetchedUsers.length,
                totalInterests: fetchedInterests.length,
                totalMessages: fetchedMessages.length
            });

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Action Handlers (Logic Only) ---

    const executeSendPasswordReset = async (user) => {
        const email = user.email;
        if (!email) {
            showToast("Error: Email missing", "error");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            showToast(`Password reset email sent to ${email}`, 'success');
            triggerActionFeedback(user.email, 'reset');
        } catch (error) {
            console.error("Error sending reset email:", error);
            showToast("Failed to send reset email: " + error.message, 'error');
        }
    };


    const executeUpdateUserStatus = async (user, isBlocked) => {
        const action = isBlocked ? 'disable' : 'enable';
        const userId = user.id || user.uid;
        if (!userId) {
            showToast("Error: User ID missing", 'error');
            return;
        }

        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, { isBlocked: isBlocked });

            // Refresh local state
            setUsers(prev => prev.map(u => (u.id === userId || u.uid === userId) ? { ...u, isBlocked: isBlocked } : u));
            showToast(`User ${action}d successfully`, 'success');
        } catch (error) {
            console.error(`Error ${action}ing user:`, error);
            showToast(`Failed to ${action} user: ${error.message}`, 'error');
        }
    };

    const executeDeleteUser = async (user) => {
        const userId = user.id || user.uid;
        if (!userId) {
            showToast("Error: User ID missing", "error");
            return;
        }

        try {
            await deleteDoc(doc(db, 'users', userId));
            setUsers(prev => prev.filter(u => u.id !== userId && u.uid !== userId));
            showToast("User deleted successfully", 'success');
        } catch (error) {
            console.error("Error deleting user:", error);
            showToast(`Failed to delete user: ${error.message}`, 'error');
        }
    };

    // --- Interaction Handlers (Open Modals) ---

    const confirmPasswordReset = (user) => {
        setConfirmModal({
            isOpen: true,
            title: "Reset Password",
            message: `Send password reset email to ${user.email}?`,
            type: 'warning',
            onConfirm: () => {
                executeSendPasswordReset(user);
                setConfirmModal({ isOpen: false });
            },
            onCancel: () => setConfirmModal({ isOpen: false })
        });
    };

    const confirmUpdateStatus = (user, isBlocked) => {
        const action = isBlocked ? 'Disable' : 'Enable';
        setConfirmModal({
            isOpen: true,
            title: `${action} User Access`,
            message: `Are you sure you want to ${action.toLowerCase()} ${user.name || user.email}?`,
            type: isBlocked ? 'danger' : 'warning',
            onConfirm: () => {
                executeUpdateUserStatus(user, isBlocked);
                setConfirmModal({ isOpen: false });
            },
            onCancel: () => setConfirmModal({ isOpen: false })
        });
    };

    const confirmDeleteUser = (user) => {
        setConfirmModal({
            isOpen: true,
            title: "Delete User Permanently",
            message: `Are you sure you want to PERMANENTLY DELETE ${user.name || user.email}? This action cannot be undone.`,
            type: 'danger',
            onConfirm: () => {
                executeDeleteUser(user);
                setConfirmModal({ isOpen: false });
            },
            onCancel: () => setConfirmModal({ isOpen: false })
        });
    };

    const executeDeleteSubmission = async (collectionName, itemId) => {
        try {
            await deleteDoc(doc(db, collectionName, itemId));
            if (collectionName === 'messages') {
                setMessages(prev => prev.filter(item => item.id !== itemId));
            } else {
                setInterests(prev => prev.filter(item => item.id !== itemId));
            }
            showToast("Item deleted successfully", 'success');
        } catch (error) {
            console.error(`Error deleting ${collectionName} item:`, error);
            showToast(`Failed to delete item: ${error.message}`, 'error');
        }
    };

    const confirmDeleteSubmission = (collectionName, item) => {
        const typeLabel = collectionName === 'messages' ? 'Message' : 'Interest Submission';
        const contactName = item.name || item.user?.name || item.email || 'Unknown';
        setConfirmModal({
            isOpen: true,
            title: `Delete ${typeLabel}`,
            message: `Are you sure you want to PERMANENTLY DELETE this ${typeLabel.toLowerCase()} from ${contactName}? This action cannot be undone.`,
            type: 'danger',
            onConfirm: () => {
                executeDeleteSubmission(collectionName, item.id);
                setConfirmModal({ isOpen: false });
            },
            onCancel: () => setConfirmModal({ isOpen: false })
        });
    };


    const toggleMessageStatus = async (collectionName, item) => {
        // "pending" (or legacy "unread") <-> "replied"
        const isCurrentlyPending = item.status === 'pending' || item.status === 'unread';
        const newStatus = isCurrentlyPending ? 'replied' : 'pending';

        try {
            const ref = doc(db, collectionName, item.id);
            await updateDoc(ref, { status: newStatus });

            const updateList = (prev) => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i);

            if (collectionName === 'messages') {
                setMessages(updateList);
            } else {
                setInterests(updateList);
            }
            // Use 'success' (Green) for Replied, 'warning' (Yellow) for Pending
            const toastType = newStatus === 'replied' ? 'success' : 'warning';
            showToast(`Marked as ${newStatus === 'replied' ? 'Replied' : 'Pending'}`, toastType);
        } catch (error) {
            console.error(`Error updating ${collectionName} status:`, error);
            showToast("Failed to update status", "error");
        }
    };

    const filterData = (data) => {
        return data.filter(item => {
            const date = new Date(item.date || item.joinedDate);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let dateMatch = true;
            if (filter === 'today') {
                dateMatch = date >= today;
            } else if (filter === 'yesterday') {
                dateMatch = date >= yesterday && date < today;
            }

            let statusMatch = true;
            if (statusFilter !== 'all') {
                if (statusFilter === 'unread') {
                    // Treat 'unread' filter as 'pending' (legacy support)
                    statusMatch = item.status === 'unread' || item.status === 'pending';
                } else if (statusFilter === 'replied') {
                    statusMatch = item.status === 'replied';
                } else {
                    statusMatch = item.status === 'replied' || item.status === 'read';
                }
            }

            return dateMatch && statusMatch;
        });
    };

    const renderEmptyState = (msg) => (
        <div className="p-12 text-center text-gray-500 bg-white/5 rounded-xl border border-white/5">
            <p>{msg}</p>
        </div>
    );

    return (
        <>
            <div className="animate-fade-in p-6 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Manage Users, Interests, and Messages</p>
                    </div>
                    <button onClick={fetchData} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-white transition-colors">
                        <RefreshCw size={18} /> Refresh Data
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div onClick={() => setActiveTab('users')} className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeTab === 'users' ? 'bg-gold/10 border-gold' : 'bg-neutral-900/50 border-white/5 hover:border-white/20'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-gray-400 text-sm">Total Users</div>
                            <Users size={20} className={activeTab === 'users' ? 'text-gold' : 'text-gray-500'} />
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                    </div>
                    <div onClick={() => setActiveTab('interests')} className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeTab === 'interests' ? 'bg-gold/10 border-gold' : 'bg-neutral-900/50 border-white/5 hover:border-white/20'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-gray-400 text-sm">Product Interests</div>
                            <BookOpen size={20} className={activeTab === 'interests' ? 'text-gold' : 'text-gray-500'} />
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.totalInterests}</div>
                    </div>
                    <div onClick={() => setActiveTab('contacts')} className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeTab === 'contacts' ? 'bg-gold/10 border-gold' : 'bg-neutral-900/50 border-white/5 hover:border-white/20'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-gray-400 text-sm">Messages</div>
                            <MessageSquare size={20} className={activeTab === 'contacts' ? 'text-gold' : 'text-gray-500'} />
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.totalMessages}</div>
                    </div>
                </div>

                {/* Filters (Only for Interests/Contacts) */}
                {activeTab !== 'users' && (
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-neutral-900 border border-white/10 rounded-lg p-1 flex items-center">
                            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md text-sm transition-colors ${filter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>All Time</button>
                            <button onClick={() => setFilter('today')} className={`px-4 py-2 rounded-md text-sm transition-colors ${filter === 'today' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>Today</button>
                            <button onClick={() => setFilter('yesterday')} className={`px-4 py-2 rounded-md text-sm transition-colors ${filter === 'yesterday' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>Yesterday</button>
                        </div>
                        <div className="bg-neutral-900 border border-white/10 rounded-lg p-1 flex items-center">
                            <button onClick={() => setStatusFilter('all')} className={`px-4 py-2 rounded-md text-sm transition-colors ${statusFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>All Status</button>
                            <button onClick={() => setStatusFilter('unread')} className={`px-4 py-2 rounded-md text-sm transition-colors ${statusFilter === 'unread' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>Pending Only</button>
                            <button onClick={() => setStatusFilter('replied')} className={`px-4 py-2 rounded-md text-sm transition-colors ${statusFilter === 'replied' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>Completed Only</button>
                        </div>
                    </div>
                )}

                {/* Tab Content */}
                <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden min-h-[500px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gold">Loading...</div>
                    ) : (
                        <>
                            {/* --- USERS TAB --- */}
                            {activeTab === 'users' && (
                                <UsersTab
                                    users={users}
                                    actionFeedback={actionFeedback}
                                    confirmPasswordReset={confirmPasswordReset}
                                    confirmUpdateStatus={confirmUpdateStatus}
                                    confirmDeleteUser={confirmDeleteUser}
                                    renderEmptyState={renderEmptyState}
                                />
                            )}

                            {/* --- INTERESTS TAB --- */}
                            {activeTab === 'interests' && (
                                <InterestsTab
                                    interests={filterData(interests)}
                                    toggleMessageStatus={toggleMessageStatus}
                                    confirmDeleteSubmission={confirmDeleteSubmission}
                                    renderEmptyState={renderEmptyState}
                                />
                            )}

                            {/* --- CONTACTS TAB --- */}
                            {activeTab === 'contacts' && (
                                <ContactsTab
                                    messages={filterData(messages)}
                                    toggleMessageStatus={toggleMessageStatus}
                                    confirmDeleteSubmission={confirmDeleteSubmission}
                                    renderEmptyState={renderEmptyState}
                                />
                            )}
                        </>
                    )}
                </div>

            </div>
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onCancel={confirmModal.onCancel}
                type={confirmModal.type}
            />

            {toast && (
                <div className="fixed bottom-4 right-4 z-[9999]">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
        </>
    );
};

export default AdminDashboard;
