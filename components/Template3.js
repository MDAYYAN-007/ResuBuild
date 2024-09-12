'use client';
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

const Template3 = (params) => {
    
    const formData = params.formData;
    const { profile, education, experience, projects, certifications, skills } = formData;

    return (
        <>
                <div className="max-w-[793px] mx-auto bg-white p-8 relative print:p-0 overflow-x-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Sidebar (3/12) */}
                        <aside className="col-span-4 bg-gray-100 p-6 rounded-lg">
                            {profile && (profile.name || profile.profession || profile.summary) && (
                                <div className="text-center mb-6">
                                    <h1 className="text-3xl font-bold font-crimson">{profile.name}</h1>
                                    <p className="text-teal-700 font-noto text-xl">{profile.profession}</p>
                                    <p className="mt-4 font-balsamiq">{profile.summary}</p>
                                </div>
                            )}

                            {/* Contact */}
                            {profile && (profile.no || profile.email) && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold font-playpen text-teal-600">Contact</h2>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {profile.no && (
                                            <p className="flex items-center">
                                                <FaPhoneAlt className="mr-2 text-teal-600" />
                                                {profile.no}
                                            </p>
                                        )}
                                        {profile.email && (
                                            <p className="flex items-center">
                                                <IoMail className="mr-2 text-teal-600" />
                                                {profile.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Skills */}
                            {skills && skills.some(skillCategory => 
                                skillCategory.skills.some(skill => skill.trim() !== '')
                            ) && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold font-playpen text-teal-600">Skills</h2>
                                    <div className="mt-2">
                                        {skills.map((skillCategory, index) => (
                                            skillCategory.skills.some(skill => skill.trim() !== '') && ( // Only render if there are non-empty skills
                                                <div key={index} className="mb-4">
                                                    <p className="font-semibold text-teal-700 font-balsamiq">{skillCategory.category}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {skillCategory.skills.map((skill, idx) => (
                                                            skill.trim() !== '' && ( // Only display non-empty skills
                                                                <span
                                                                    key={idx}
                                                                    className="inline-block bg-gray-200 text-black px-2 py-1 rounded-lg font-crimson text-sm"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>

                        {/* Main Content (9/12) */}
                        <div className="col-span-8">
                            {/* Education */}
                            {education && education.some(edu => edu.course || edu.institution || edu.year) && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-teal-600 font-playpen">Education</h2>
                                    {education.map((edu, index) => (
                                        (edu.course || edu.institution || edu.year) && (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold text-xl">{edu.course}</p>
                                                <p className="font-balsamiq">{edu.institution}, {edu.place}</p>
                                                <p className="text-gray-500">{edu.year}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* Experience */}
                            {experience && experience.some(exp => exp.jobTitle || exp.company || exp.duration) && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-teal-600 font-playpen">Experience</h2>
                                    {experience.map((exp, index) => (
                                        (exp.jobTitle || exp.company || exp.duration) && (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold text-xl">{exp.jobTitle}</p>
                                                <p className="font-balsamiq">{exp.company}</p>
                                                <p className="text-gray-500">{exp.duration}</p>
                                                <p>{exp.jobDesc}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* Projects */}
                            {projects && projects.some(project => project.name || project.toolsAndLang || project.proDesc) && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-teal-600 font-playpen">Projects</h2>
                                    {projects.map((project, index) => (
                                        (project.name || project.toolsAndLang || project.proDesc) && (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold text-xl">{project.name}</p>
                                                <p className="font-balsamiq text-gray-700">{project.toolsAndLang}</p>
                                                <p className="text-gray-600">{project.proDesc}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* Certifications */}
                            {certifications && certifications.some(cert => cert.name || cert.desc) && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-teal-600 font-playpen">Certifications</h2>
                                    {certifications.map((cert, index) => (
                                        (cert.name || cert.desc) && (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold text-xl">{cert.name}</p>
                                                <p className="font-balsamiq">{cert.desc}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </>
    );
};

export default Template3;
