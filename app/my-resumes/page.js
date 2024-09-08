'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ResumeDashboard = () => {
    const [resumes, setResumes] = useState([]);
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const router = useRouter();

    useEffect(() => {
        const savedResumes = localStorage.getItem('resumes');
        if (savedResumes) {
            setResumes(JSON.parse(savedResumes));
        }
    }, []);

    const createNewResume = () => {
        const id = Date.now().toString();
        const newResume = { id, name: `Resume ${resumes.length + 1}` };

        const updatedResumes = [...resumes, newResume];
        console.log(updatedResumes);
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));

        setResumes(updatedResumes);

        router.push(`/form/${id}`);
    };

    return (
        <Suspense>
            <Navbar />
            <section className='py-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center justify-center mt-[70px]'
                style={{ minHeight: "calc(100vh - 70px)" }}
            >
                <h1 className="text-2xl font-bold mb-4">Resume Dashboard</h1>
                <button
                    onClick={createNewResume}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                    Create New Resume
                </button>
                <div className="mt-8">
                    {message && (
                        <p className="mb-4">No resume found with the provided ID. Please create a new one.</p>
                    )}
                    {resumes.length > 0 ? (
                        <ul>
                            {resumes.map((resume, index) => (
                                <li key={index} className="mb-4 p-4 bg-gray-800 text-white rounded-lg">
                                    <Link href={`/form/${resume.id}`}>
                                        <p className="font-semibold hover:underline">{resume.name || `Resume ${index + 1}`}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No resumes found. Create a new one!</p>
                    )}
                </div>
            </section>
        </Suspense>
    );
};

export default ResumeDashboard;
