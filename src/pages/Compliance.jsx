import React, { useEffect, useState } from 'react';
import { FileText, Download, Shield, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Compliance = () => {
    const { user } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'compliance_docs'));
                const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDocuments(docsData);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDocuments();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center px-4">
                <div className="text-center max-w-lg bg-neutral-900/50 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                    <Shield size={60} className="text-gold mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Compliance Access Restricted</h1>
                    <p className="text-gray-400 mb-8">
                        Per regulatory guidelines provided, access to compliance documents is reserved for registered members.
                    </p>
                    <Link to="/login" className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-full">
                        <LogIn size={20} /> Login to View
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="container px-4 mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 px-4">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold">
                        Compliance Documents
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        As a SEBI registered entity, we are committed to transparency and regulatory compliance.
                    </p>
                </div>

                {/* Documents Grid */}
                <h2 className="text-2xl font-bold text-white mb-8 border-t border-white/10 pt-12">Standard Policies & Disclosures</h2>

                {loading ? (
                    <div className="text-center text-gold">Loading Documents...</div>
                ) : documents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {documents.map((doc, index) => (
                            <div key={index} className="group relative bg-neutral-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:-translate-y-1">
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="relative z-10 text-gold mb-6 bg-gold/10 p-5 rounded-full ring-1 ring-gold/20 group-hover:ring-gold/50 transition-all">
                                    <FileText size={40} />
                                </div>

                                <h3 className="relative z-10 text-white text-xl font-medium mb-8 group-hover:text-gold transition-colors">
                                    {doc.title}
                                </h3>

                                <a
                                    href={doc.url}
                                    download={doc.filename || doc.title}
                                    className="relative z-10 mt-auto flex items-center gap-2 text-gold font-semibold py-2 px-6 rounded-full border border-gold/30 hover:bg-gold hover:text-black transition-all duration-300"
                                >
                                    <Download size={18} />
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 italic p-10 border border-white/5 rounded-2xl bg-white/5">
                        No compliance documents available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compliance;
