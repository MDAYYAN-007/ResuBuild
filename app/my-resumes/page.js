'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons
import Loading from '@/components/Loading';
import toast, { Toaster } from 'react-hot-toast';

const ResumeDashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingResumeId, setEditingResumeId] = useState(null);
    const [resumeName, setResumeName] = useState('');
    const [loading, setLoading] = useState(true)
    const modalRef = useRef(null);

    useEffect(() => {
        try {
            const savedResumes = localStorage.getItem('resumes');
            if (savedResumes) {
                setResumes(JSON.parse(savedResumes));
            }
        } catch (error) {
            console.error("Failed to load resumes from local storage", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsCreateModalOpen(false);
                setIsEditModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const createNewResume = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateResume = () => {
        const id = Date.now().toString();
        const newResume = { id, name: resumeName };
    
        const updatedResumes = [...resumes, newResume];
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    
        setResumes(updatedResumes);
        setIsCreateModalOpen(false);
        setResumeName('');
    
        toast.success('Resume created successfully!');
    };    

    const handleDeleteResume = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this resume?');

        if (isConfirmed) {
            const updatedResumes = resumes.filter(resume => resume.id !== id);
            localStorage.setItem('resumes', JSON.stringify(updatedResumes));
            setResumes(updatedResumes);
            toast.error('Resume deleted successfully!');
        }
    };


    const handleEditResume = (id) => {
        setEditingResumeId(id);
        setResumeName(resumes.find(resume => resume.id === id)?.name || '');
        setIsEditModalOpen(true);        
    };

    const handleSaveEdit = () => {
        const updatedResumes = resumes.map(resume =>
            resume.id === editingResumeId ? { ...resume, name: resumeName } : resume
        );
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
        setResumes(updatedResumes);
        setIsEditModalOpen(false);
        setEditingResumeId(null);
        setResumeName('');
        toast.success('Resume renamed successfully!');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <Toaster/>
            <section className='py-8 h-max bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center justify-center mt-[70px] px-4'
                style={{ minHeight: "calc(100vh - 70px)" }}
            >
                <h1 className="text-3xl font-extrabold mb-6">Resume Dashboard</h1>
                <button
                    onClick={createNewResume}
                    className="px-6 py-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
                >
                    Create New Resume
                </button>
                <div className="mt-8 w-full max-w-3xl">
                    {resumes.length > 0 ? (
                        <ul>
                            {resumes.map((resume) => (
                                <li key={resume.id} className="mb-6 p-6 bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex justify-between items-center">
                                    <Link href={`/form/${resume.id}`} className="flex-grow">
                                        <p className="font-semibold text-lg hover:underline">{resume.name}</p>
                                    </Link>
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={`/resume/${resume.id}`}
                                            className="text-teal-500 hover:text-teal-600"
                                        >
                                            <FiEye className="text-2xl" />
                                        </Link>
                                        <button
                                            onClick={() => handleEditResume(resume.id)}
                                            className="text-yellow-500 hover:text-yellow-600"
                                        >
                                            <FiEdit className="text-2xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteResume(resume.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <FiTrash2 className="text-2xl" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center">Get started. Create a new resume!</p>
                    )}
                </div>
            </section>

            {/* Create Resume Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80" ref={modalRef}>
                        <h2 className="text-lg font-semibold mb-4">Create New Resume</h2>
                        <input
                            type="text"
                            placeholder="Enter resume name"
                            value={resumeName}
                            onChange={(e) => setResumeName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCreateResume}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Resume Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80" ref={modalRef}>
                        <h2 className="text-lg font-semibold mb-4">Edit Resume Name</h2>
                        <input
                            type="text"
                            placeholder="Enter new name"
                            value={resumeName}
                            onChange={(e) => setResumeName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResumeDashboard;
