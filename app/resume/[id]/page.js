'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import './resume.css';
import Template1 from '@/components/Template1';
import Template2 from '@/components/Template2';
import Template3 from '@/components/Template3';
import Navbar from '@/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { FaDownload, FaEdit } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';

const ResumePage = ({ params }) => {
    const [formData, setFormData] = useState(null);
    const [tempid, setTempid] = useState(null);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (!id) return;

        try {
            const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
            const currentResume = existingResumes.find(resume => resume.id === id);

            if (currentResume && currentResume.formData) {
                setFormData(currentResume.formData);
                const templateId = currentResume.formData.template;
                setTempid(templateId);
            } else if (currentResume) {
                router.push(`/form/${id}`);
            } else {
                router.push('/my-resumes');
            }
        } catch (error) {
            console.error('Error fetching resume data:', error);
            router.push('/my-resumes?message=Error fetching data');
        }
    }, [id, router]);

    const handleDownload = () => {
        window.print();
        toast.success('PDF downloaded successfully!', {
            duration: 3000,
        });
    };

    const templateComponents = {
        1: Template1,
        2: Template2,
        3: Template3
    };

    const TemplateComponent = templateComponents[tempid] || (() => <div>Template Not Found</div>);

    return (
        <div>
            {formData ?
                <>
                    <Navbar />
                    <Toaster />
                    <section className='mt-[70px] pb-28 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 print:mt-0 print:pb-0 print:bg-gradient-to-r print:from-white print:via-white print:to-white'
                        style={{ minHeight: "calc(100vh - 70px)" }}
                    >
                        <div className="flex gap-4 mx-auto p-8 justify-center mb-6 print:hidden max-xsm:flex-col max-xsm:w-max">
                            <Link
                                href={`/form/${id}`}
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 hover:bg-teal-700 hover:shadow-lg active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                            >
                                <FaEdit className="text-lg mr-2" />
                                <span>Edit</span>
                            </Link>
                            <button
                                onClick={handleDownload}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 hover:bg-purple-700 hover:shadow-lg active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                            >
                                <FaDownload className="text-lg mr-2" />
                                <span>Download PDF</span>
                            </button>
                            <Link
                                href={"/my-resumes"}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 hover:bg-indigo-700 hover:shadow-lg active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            >
                                <CiViewList className="text-lg mr-2" />
                                <span>View Resumes</span>
                            </Link>
                        </div>

                        <TemplateComponent formData={formData} id={id} />
                    </section>
                </>
                : <Loading />}
        </div>
    );
};

export default ResumePage;
