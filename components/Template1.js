'use client';
import React from 'react';
import { AiOutlineDownload, AiOutlineEdit } from 'react-icons/ai';
import '@/components/Templates.css';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const Template1 = ({ formData, id }) => {
    const router = useRouter();

    const handleDownload = () => {
        window.print();
    };

    const handleEdit = () => {
        router.push(`/form/${id}`);
    };

    return (
        <>
            <Navbar />
            <section className='mt-[70px] mb-28 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 print:mt-0'>
                <div className="flex p-8 justify-center mb-6 space-x-4 print:hidden">
                    <button
                        onClick={handleEdit}
                        className='bg-gray-800 text-white px-4 py-2 rounded flex items-center space-x-2'
                    >
                        <AiOutlineEdit />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className='bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2'
                    >
                        <AiOutlineDownload />
                        <span>Download PDF</span>
                    </button>
                </div>

                <div className="max-w-[793px] mx-auto bg-white p-10 relative">
                    {/* Header */}
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold font-lora">{formData?.profile?.name}</h1>
                        <p className="text-lg">
                            {formData?.profile?.profession} | {formData?.profile?.email} | {formData?.profile?.no}
                        </p>
                        {formData?.profile?.summary && (
                            <p className="text-sm mt-4">{formData.profile.summary}</p>
                        )}
                    </header>

                    {/* Education */}
                    {formData?.education?.some(edu => edu.course || edu.year || edu.marks || edu.institution || edu.place) && (
                        <section className="mb-6">
                            <h2 className="text-2xl text-blue-700 font-semibold font-serif">Education</h2>
                            {formData.education.map((edu, index) => (
                                <div className="mb-4" key={index}>
                                    <div className='flex items-center justify-between font-serif'>
                                        <h3 className="text-xl font-semibold">{edu.course}</h3>
                                        <p className='text-right'>{edu.year}</p>
                                    </div>
                                    <p className="text-sm">
                                        {edu.institution}, {edu.place} ({edu.marks})
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Experience */}
                    {formData?.experience?.some(exp => exp.jobTitle || exp.company || exp.duration) && (
                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 font-serif">Experience</h2>
                            {formData.experience.map((exp, index) => (
                                <div className="mb-4" key={index}>
                                    <div className='flex items-center justify-between font-serif'>
                                        <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                                        <p className='text-right'>{exp.company}</p>
                                    </div>
                                    <p className="text-sm">{exp.duration}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {formData?.projects?.some(project => project.name || project.toolsAndLang) && (
                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 font-serif">Projects</h2>
                            {formData.projects.map((project, index) => (
                                <div className="mb-4" key={index}>
                                    <div className='flex items-center justify-between font-serif'>
                                        <h3 className="text-xl font-semibold">{project.name}</h3>
                                        <p className='text-right'>{project.toolsAndLang}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {formData?.skills?.some(skill => skill.category || (skill.skills && skill.skills.length > 0)) && (
                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 font-serif">Skills</h2>
                            {formData.skills.map((skill, index) => (
                                <div className="mb-4" key={index}>
                                    <ul>
                                        <li>
                                            <span className="text-lg font-semibold">{skill.category} : </span>{skill.skills.map((item, i) => (
                                                <span key={i}>{item} | </span>
                                            ))}
                                        </li>
                                    </ul>
                                    <ul className="list-disc ml-6">

                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Awards */}
                    {formData?.awards?.some(award => award.name || award.desc) && (
                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 font-serif">Awards</h2>
                            {formData.awards.map((award, index) => (
                                <div className="mb-4" key={index}>
                                    <h3 className="text-xl font-semibold">{award.name}</h3>
                                    <p className="text-sm">{award.desc}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </section>
        </>
    );
};

export default Template1;
