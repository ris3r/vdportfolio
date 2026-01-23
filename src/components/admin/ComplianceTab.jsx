import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Button from '../Button';
import { Trash2, Edit2, Plus, Save, Upload, FileText, RefreshCcw } from 'lucide-react';
import Toast from '../Toast';

const ComplianceTab = ({ renderEmptyState }) => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        filename: '', // Just for display if it's a manual link
        url: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchDocs();
    }, []);

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'compliance_docs'));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocs(data);
        } catch (error) {
            console.error("Error fetching docs:", error);
            showToast("Failed to fetch documents", "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Clear errors on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (name === 'url' && errors.file) {
            setErrors(prev => ({ ...prev, file: null }));
        }

        // Mutual Exclusion: If typing in URL, clear selected file
        if (name === 'url') {
            setSelectedFile(null);
        }

        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-populate filename from URL
            if (name === 'url' && value) {
                const extractedName = value.split(/[/\\]/).pop();
                if (extractedName) {
                    newData.filename = extractedName;
                }
            } else if (name === 'url' && !value) {
                newData.filename = '';
            }
            return newData;
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Clear errors
            if (errors.file) {
                setErrors(prev => ({ ...prev, file: null }));
            }

            // Mutual Exclusion: If file selected, clear URL
            setFormData(prev => ({
                ...prev,
                url: '',
                filename: file.name // Also update filename display immediately
            }));
        }
    };

    const handleEdit = (docItem) => {
        setEditingId(docItem.id);
        setFormData({
            title: docItem.title,
            filename: docItem.filename || '',
            url: docItem.url || ''
        });
        setSelectedFile(null);
        setErrors({}); // Clear errors when opening
    };

    const handleCancel = () => {
        setEditingId(null);
        resetForm();
        setErrors({});
    };

    const resetForm = () => {
        setFormData({ title: '', filename: '', url: '' });
        setSelectedFile(null);
    };

    const handleRestoreDefaults = async () => {
        if (!window.confirm("This will add the standard compliance documents to the list. Continue?")) return;
        setLoading(true);
        try {
            const defaultDocs = [
                { title: "Complaint Data", filename: "Complaint_Data.docx", url: "/compliance/Complaint_Data.docx" },
                { title: "Disclosure", filename: "DISCLOSURE.docx", url: "/compliance/DISCLOSURE.docx" },
                { title: "Grievance Redressal", filename: "Grievance_Redressal.docx", url: "/compliance/Grievance_Redressal.docx" },
                { title: "Investor Charter", filename: "Investor_Charter.pdf", url: "/compliance/Investor_Charter.pdf" },
                { title: "Privacy Policy", filename: "Privacy_Policy.docx", url: "/compliance/Privacy_Policy.docx" },
                { title: "Refund Policy", filename: "Refund_Policy.docx", url: "/compliance/Refund_Policy.docx" },
                { title: "Standard Warning", filename: "Standard_Warning.docx", url: "/compliance/Standard_Warning.docx" },
                { title: "Terms & Conditions", filename: "Terms_&_Conditions.docx", url: "/compliance/Terms_&_Conditions.docx" },
            ];

            const batchPromises = defaultDocs.map(docData =>
                addDoc(collection(db, 'compliance_docs'), {
                    ...docData,
                    updatedAt: new Date().toISOString()
                })
            );

            await Promise.all(batchPromises);
            await fetchDocs();
            showToast("Default documents restored successfully", "success");
        } catch (error) {
            console.error("Error restoring defaults:", error);
            showToast("Failed to restore defaults", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!selectedFile && !formData.url) newErrors.file = "Please upload a file or enter a Direct URL";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setUploading(true);
        console.log("Starting save process...");
        try {
            let finalUrl = formData.url; // Fallback for manual links
            let finalFilename = formData.filename;
            let isBase64 = false;

            // Handle File Upload via Base64 (No Firebase Storage)
            if (selectedFile) {
                console.log("File selected:", selectedFile.name);

                // 1. Size Check (Limit to ~700KB for Firestore safety)
                if (selectedFile.size > 700 * 1024) {
                    showToast("File too large. Max size is 700KB due to database limits.", "error");
                    setUploading(false);
                    return;
                }

                // 2. Convert to Base64
                const base64Data = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });

                finalUrl = base64Data;
                finalFilename = selectedFile.name;
                isBase64 = true;
                console.log("File converted to Base64 successfully.");
            }

            const docData = {
                title: formData.title,
                url: finalUrl,
                filename: finalFilename,
                isBase64: isBase64,
                updatedAt: new Date().toISOString()
            };

            if (editingId && editingId !== 'new') {
                // Update
                await updateDoc(doc(db, 'compliance_docs', editingId), docData);
                setDocs(prev => prev.map(d => d.id === editingId ? { ...d, ...docData } : d));
                showToast("Document updated successfully", "success");
            } else {
                // Create
                const docRef = await addDoc(collection(db, 'compliance_docs'), docData);
                setDocs(prev => [...prev, { id: docRef.id, ...docData }]);
                showToast("Document added successfully", "success");
            }
            handleCancel();
        } catch (error) {
            console.error("Error saving document:", error);
            showToast("Failed to save document. " + (error.message || "Unknown error"), "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            await deleteDoc(doc(db, 'compliance_docs', id));
            setDocs(prev => prev.filter(d => d.id !== id));
            showToast("Document deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting document:", error);
            showToast("Failed to delete document", "error");
        }
    };

    const handleViewFile = (item) => {
        if (item.isBase64 && item.url.startsWith('data:')) {
            // Check if it is a PDF
            const isPdf = item.url.includes('application/pdf');

            if (isPdf) {
                // Try to render PDF in new tab
                const win = window.open();
                win.document.write(
                    '<iframe src="' + item.url + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                );
            } else {
                // For others (DOCX, etc), force download with correct name because browsers can't displaying them
                const link = document.createElement('a');
                link.href = item.url;
                link.download = item.filename || 'document'; // FORCE CORRECT FILENAME
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            // Standard URL
            window.open(item.url, '_blank');
        }
    };

    if (loading) return <div className="text-gold p-4">Loading Documents...</div>;

    return (
        <div className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Compliance Documents</h3>
                    <p className="text-gray-400 text-sm">Manage downloadable PDFs and links shown on the Compliance page.</p>
                </div>
                <div className="flex gap-3">
                    {docs.length === 0 && !editingId && (
                        <Button onClick={handleRestoreDefaults} variant="outline" className="text-sm">
                            <RefreshCcw size={16} /> Restore Defaults
                        </Button>
                    )}
                    {!editingId && (
                        <Button onClick={() => setEditingId('new')} className="text-sm">
                            <Plus size={16} /> Add Document
                        </Button>
                    )}
                </div>
            </div>

            {/* Edit/Add Form */}
            {(editingId) && (
                <div className="bg-neutral-800 p-6 rounded-xl border border-gold/30 mb-8 animate-fade-in">
                    <h4 className="text-gold font-bold mb-4">{editingId === 'new' ? 'New Document' : 'Edit Document'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Document Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full bg-black/50 border rounded-lg p-3 text-white outline-none focus:border-gold ${errors.title ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="e.g. Investor Charter"
                            />
                            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">File Upload (PDF/Doc)</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className={`w-full bg-black/50 border border-dashed rounded-lg p-3 cursor-pointer hover:border-gold/50 flex items-center justify-between ${errors.file ? 'border-red-500 text-red-100' : 'border-white/10 text-gray-400'}`}
                                >
                                    <span className="truncate">{selectedFile ? selectedFile.name : (formData.filename || "Choose file...")}</span>
                                    <Upload size={16} />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Or enter a direct URL:</p>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                className={`w-full bg-black/50 border rounded-lg p-2 text-white text-xs mt-1 ${errors.file ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="https://..."
                            />
                            {errors.file && <p className="text-red-400 text-xs mt-1">{errors.file}</p>}
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={handleCancel} disabled={uploading}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} disabled={uploading}>
                            {uploading ? 'Uploading...' : <><Save size={16} /> Save Document</>}
                        </Button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.length > 0 ? (
                    docs.map((item) => (
                        <div key={item.id} className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-gold/20 transition-colors">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2 bg-gold/10 rounded-lg text-gold">
                                    <FileText size={20} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-medium truncate">{item.title}</h4>
                                    <button
                                        onClick={() => handleViewFile(item)}
                                        className="text-xs text-blue-400 hover:underline truncate block text-left"
                                    >
                                        View File
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-1.5 hover:bg-white/10 rounded-lg text-blue-400"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-white/10 rounded-lg text-red-400"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        {renderEmptyState("No documents found. Add your first compliance document.")}
                    </div>
                )}
            </div>

            {toast && (
                <div className="absolute top-6 right-6 z-[9999] animate-slide-in">
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                </div>
            )}
        </div>
    );
};

export default ComplianceTab;
