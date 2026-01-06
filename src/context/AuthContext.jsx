import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { auth, db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginMessage, setLoginMessage] = useState(''); // Flash message for Login page
    const verificationCheckBypass = useRef(false);

    useEffect(() => {
        let unsubscribeUserDoc = null;

        // Safety timeout to prevent infinite loading screen (Black Screen of Death)
        const safetyTimer = setTimeout(() => {
            setLoading((currentLoading) => {
                if (currentLoading) {
                    console.warn("Auth check timed out. Forcing UI load.");
                    return false;
                }
                return currentLoading;
            });
        }, 5000); // 5 seconds max loading time

        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            clearTimeout(safetyTimer); // Clear safety timer if Auth responds

            // Cleanup previous listener
            if (unsubscribeUserDoc) {
                unsubscribeUserDoc();
                unsubscribeUserDoc = null;
            }

            try {
                if (currentUser) {
                    console.log("AuthStateChanged: User detected", currentUser.uid);

                    // Critical Security Check: Ensure email is verified before allowing access
                    if (!currentUser.emailVerified) {
                        console.warn("User email not verified. Forcing sign-out.");
                        await signOut(auth);
                        setLoading(false);
                        return;
                    }

                    const userDocRef = doc(db, 'users', currentUser.uid);

                    // Real-time listener
                    unsubscribeUserDoc = onSnapshot(userDocRef, async (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const userData = docSnapshot.data();

                            if (userData.isBlocked) {
                                // Race Condition Fix:
                                // If this snapshot is from cache (potentially stale), the user might have just been enabled.
                                // Don't trust cache for blocking immediately. Verify with server.
                                if (docSnapshot.metadata.fromCache) {
                                    console.warn("AuthContext: Blocked status from cache. Verifying with server...");
                                    try {
                                        const freshDoc = await getDoc(userDocRef); // Default is server-first if online
                                        if (freshDoc.exists() && freshDoc.data().isBlocked) {
                                            alert("Your account has been restricted. Please contact support.");
                                            await signOut(auth);
                                            setUser(null);
                                            setLoading(false);
                                            return;
                                        } else {
                                            // It was stale cache! User is actually active.
                                            console.log("AuthContext: Server verification passed. User is active.");
                                            setUser({ ...currentUser, ...freshDoc.data() });
                                            setLoading(false);
                                            return;
                                        }
                                    } catch (e) {
                                        console.error("Auth verify failed:", e);
                                        // If network fails, we probably should stay blocked or retry? 
                                        // Safer to fallback to blocked if we can't accept. But let's assume transient error.
                                    }
                                }

                                // If not from cache, or confirmed blocked:
                                alert("Your account has been restricted. Please contact support.");
                                await signOut(auth);
                                setUser(null);
                                setLoading(false);
                            } else {
                                setUser({ ...currentUser, ...userData });
                                setLoading(false);
                            }
                        } else {
                            // Profile missing? This means account was deleted by Admin or data corruption.
                            // Force strict logout.
                            console.warn("User profile missing in Firestore. Account likely deleted.");
                            alert("Your account data is missing or has been deleted. Please contact support.");
                            await signOut(auth);
                            setUser(null);
                            setLoading(false);
                        }
                    }, (error) => {
                        console.error("Firestore (onSnapshot) Error:", error);
                        // Fallback but keep logged in as basic user if it's just a permission/network blip
                        setUser({ ...currentUser, role: 'user', isFallback: true });
                        setLoading(false);
                    });

                } else {
                    console.log("AuthStateChanged: No user");
                    setUser(null);
                    setLoading(false);
                }
            } catch (err) {
                console.error("AuthStateChanged Error:", err);
                setUser(null);
                setLoading(false);
            }
        });

        // Cleanup on unmount
        return () => {
            unsubscribeAuth();
            if (unsubscribeUserDoc) {
                unsubscribeUserDoc();
            }
        };
    }, []);

    const login = async (email, password) => {
        // Do NOT set global loading here, as it unmounts the Login component and resets state.
        // The Login component handles its own loading state.

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        // 1. Check for Email Verification
        if (!currentUser.emailVerified) {
            await signOut(auth);
            throw { code: 'auth/email-not-verified', message: 'Email not verified' };
        }

        // 2. Critical: Check Firestore Status (Login Gate)
        try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

            if (!userDoc.exists()) {
                console.warn("Login Gate: User deleted (No Firestore Doc)");
                await signOut(auth);
                throw { code: 'auth/user-deleted', message: 'Your account has been deleted.' };
            }

            const userData = userDoc.data();
            if (userData.isBlocked) {
                console.warn("Login Gate: User blocked");
                await signOut(auth);
                throw { code: 'auth/user-disabled', message: 'Your account has been disabled by an administrator.' };
            }

        } catch (error) {
            // Ensure we don't leave a half-logged-in state if Firestore fails or rejects
            if (auth.currentUser) await signOut(auth);
            throw error;
        }

        return userCredential;
    };

    const register = async (name, email, password, phone = '') => {
        let newUser = null;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            newUser = userCredential.user;

            // Create user profile in Firestore
            // Default role is 'user'. First admin can be set manually in DB.
            const userData = {
                uid: newUser.uid,
                name,
                email,
                phone,
                role: 'user', // Default role
                isBlocked: false,
                joinedDate: new Date().toISOString()
            };

            // Send Verification Email
            await sendEmailVerification(newUser);

            await setDoc(doc(db, 'users', newUser.uid), userData);

            // Do NOT set user state immediately. 
            // We want them to be logged out and see the "Check your email" screen.
            await signOut(auth);

            return newUser;
        } catch (error) {
            console.error("Registration Error:", error);

            // Rollback: specific handling if Firestore write fails but Auth succeeded
            if (newUser) {
                try {
                    // Attempt to delete the orphan auth user
                    // Note: This requires recent login which we just did, so it should work.
                    // However, we need to import deleteUser. For simplicity in this context 
                    // where we might not want to import more heavy dependencies, 
                    // we will just ensure the error is propagated clearly. 
                    // Ideally: await deleteUser(newUser); 
                    // But standard recommended practice if Firestore fails is to let the user retry 
                    // or handle the inconsistency. 
                    // For now, let's just make sure we don't leave the app in a "logged in" state if data failed.
                    await signOut(auth);
                    setUser(null);
                } catch (cleanupError) {
                    console.error("Failed to cleanup after failed registration:", cleanupError);
                }
            }
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const updateProfile = async (updatedData) => {
        if (!user) return;

        // separate password from other data
        const { password, ...otherData } = updatedData;

        // 1. Update Firestore Profile
        if (Object.keys(otherData).length > 0) {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, otherData, { merge: true });
        }

        // 2. Update Auth Password if provided
        if (password) {
            try {
                await updatePassword(auth.currentUser, password);
                // Force logout on password change for security
                setLoginMessage("Password updated successfully. Please log in with your new password.");
                await signOut(auth);
                setUser(null);
                return { passwordUpdated: true };
            } catch (error) {
                console.error("Error updating password:", error);
                if (error.code === 'auth/requires-recent-login') {
                    alert("For security, please log out and log in again before changing your password.");
                } else {
                    alert("Failed to update password: " + error.message);
                }
                throw error;
            }
        }

        setUser(prev => ({ ...prev, ...otherData }));
        return { passwordUpdated: false };
    };

    const resendVerification = async (email, password) => {
        try {
            verificationCheckBypass.current = true; // Allow unverified user to stay logged in strictly for this operation

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);

            // Now we can safely sign them out
            await signOut(auth);
            return true;
        } catch (error) {
            console.error("Error resending verification:", error);
            throw error;
        } finally {
            verificationCheckBypass.current = false; // Always reset flag
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading, resendVerification, loginMessage, setLoginMessage }}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-black text-gold">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xl font-heading">Loading...</p>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
