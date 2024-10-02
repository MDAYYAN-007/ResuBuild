'use client';
import React from 'react';

const Template1 = (params) => {

    const formData = params.formData;

    return (
        <>
            <div className="max-w-[793px] mx-auto bg-white p-8 relative print:p-0 overflow-x-auto">
                {/* Header */}
                <header className="mb-6 text-center">
                    <h1 className="text-4xl font-bold font-noto">{formData?.profile?.name}</h1>
                    {(formData?.profile?.email || formData?.profile?.no) && (
                        <p className="text-lg font-noto">
                            {formData?.profile?.email && formData.profile.email}
                            {formData?.profile?.email && formData?.profile?.no && ' | '}
                            {formData?.profile?.no && formData.profile.no}
                        </p>
                    )}
                </header>

                {formData?.profile?.summary && (
                    <section className='mb-6'>
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">About Me</h2>
                        <p className="font-crimson leading-5">{formData.profile.summary}</p>
                    </section>
                )}

                {/* Education */}
                {formData?.education?.some(edu => edu.course || edu.year || edu.marks || edu.institution || edu.place) && (
                    <section className="mb-6">
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div className="mb-4" key={index}>
                                <div className='flex items-center justify-between font-crimson'>
                                    <h3 className="text-xl font-semibold leading-6">{edu.course}</h3>
                                    <p className='text-right'>{edu.year}</p>
                                </div>
                                <p className="text-gray-600 text-lg leading-5 font-crimson m-0">
                                    {edu.institution && <span>{edu.institution}</span>}
                                    {edu.institution && edu.place && <span>, </span>}
                                    {edu.place && <span>{edu.place}</span>}
                                    {(edu.institution || edu.place) && edu.marks && <span> ({edu.marks})</span>}
                                </p>

                            </div>
                        ))}
                    </section>
                )}

                {/* Experience */}
                {formData?.experience?.some(exp => exp.jobTitle || exp.company || exp.duration) && (
                    <section className="mb-6">
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">Experience</h2>
                        {formData.experience.map((exp, index) => (
                            <div className="mb-4" key={index}>
                                <div className='flex items-center justify-between font-crimson'>
                                    <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                                    <p className='text-right'>{exp.company}</p>
                                </div>
                                <p className="text-sm font-crimson text-gray-600">{exp.duration}</p>
                                {exp.jobDesc && (
                                    <li className='font-lora'>{exp.jobDesc}</li>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {formData?.projects?.some(project => project.name || project.toolsAndLang) && (
                    <section className="mb-6">
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">Projects</h2>
                        {formData.projects.map((project, index) => (
                            <div className="mb-2" key={index}>
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className='font-noto text-gray-600'>{project.toolsAndLang}</p>
                                {project.proDesc && (
                                    <li className='font-lora'>{project.proDesc}</li>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {formData?.skills?.some(skill => skill.category || (skill.skills && skill.skills.some(item => item))) && (
                    <section className="mb-6">
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">Skills</h2>
                        {formData.skills.map((skill, index) => (
                            (skill.category || (skill.skills && skill.skills.some(item => item))) && (
                                <div className="mb-1" key={index}>
                                    <ul className="list-disc ml-6">
                                        <li className="font-crimson">
                                            {skill.category && (
                                                <span className="text-lg font-semibold">
                                                    {skill.category} :
                                                </span>
                                            )}
                                            {skill.skills && skill.skills.map((item, i) => (
                                                item && (
                                                    <span key={i} className="font-crimson">
                                                        {item}{i < skill.skills.length - 1 ? ' | ' : ''}
                                                    </span>
                                                )
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                            )
                        ))}
                    </section>
                )}

                {/* Certifications */}
                {formData?.certifications?.some(certification => certification.name || certification.desc) && (
                    <section className="mb-6">
                        <h2 className="text-2xl text-blue-700 font-semibold font-lora mb-1">Certifications</h2>
                        {formData.certifications.map((certification, index) => (
                            <div className="mb-4" key={index}>
                                <h3 className="text-xl font-semibold font-crimson">{certification.name}</h3>
                                <li className="font-lora">{certification.desc}</li>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </>
    );
};

export default Template1;

