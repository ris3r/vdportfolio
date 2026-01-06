import React from 'react';
import { FileText, Download, Shield, AlertTriangle, FileCheck, Lock, RefreshCcw } from 'lucide-react';

const Compliance = () => {
    const documents = [
        { title: "Complaint Data", icon: <FileText size={40} />, filename: "Complaint_Data.docx" },
        { title: "Disclosure", icon: <Shield size={40} />, filename: "DISCLOSURE.docx" },
        { title: "Grievance Redressal", icon: <FileCheck size={40} />, filename: "Grievance_Redressal.docx" },
        { title: "Investor Charter", icon: <FileText size={40} />, filename: "Investor_Charter.pdf" },
        { title: "Privacy Policy", icon: <Lock size={40} />, filename: "Privacy_Policy.docx" },
        { title: "Refund Policy", icon: <RefreshCcw size={40} />, filename: "Refund_Policy.docx" },
        { title: "Standard Warning", icon: <AlertTriangle size={40} />, filename: "Standard_Warning.docx" },
        { title: "Terms & Conditions", icon: <FileText size={40} />, filename: "Terms_&_Conditions.docx" },
    ];

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
                        Access our standard policies and disclosure documents below.
                    </p>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.map((doc, index) => (
                        <div key={index} className="group relative bg-neutral-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:-translate-y-1">
                            {/* Hover Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 text-gold mb-6 bg-gold/10 p-5 rounded-full ring-1 ring-gold/20 group-hover:ring-gold/50 transition-all">
                                {doc.icon}
                            </div>

                            <h3 className="relative z-10 text-white text-xl font-medium mb-8 group-hover:text-gold transition-colors">
                                {doc.title}
                            </h3>

                            <a
                                href={`/compliance/${doc.filename}`}
                                download
                                className="relative z-10 mt-auto flex items-center gap-2 text-gold font-semibold py-2 px-6 rounded-full border border-gold/30 hover:bg-gold hover:text-black transition-all duration-300"
                            >
                                <Download size={18} />
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Compliance;
