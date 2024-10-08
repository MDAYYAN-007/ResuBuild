'use client';
import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Template2 = (params) => {

    const formData = params.formData;
    const { profile, education, experience, projects, certifications, skills } = formData;

    return (
        <>
            <div className="max-w-[793px] mx-auto bg-white p-8 relative print:p-0 overflow-x-auto">
                {/* Header Section */}
                {profile && (
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold font-crimson">{profile.name}</h1> {/* Name in Crimson Pro */}
                        <p className="text-xl font-noto text-teal-700">{profile.profession}</p> {/* Profession in Noto Serif with Teal color */}
                        {/* Contact */}
                        <div className="flex gap-6 font-playpen text-teal-600">
                            {profile.no && (
                                <p className="flex items-center justify-center">
                                    <FaPhoneAlt className="mr-2" />
                                    {profile.no}
                                </p>
                            )}
                            {profile.email && (
                                <p className="flex items-center justify-center">
                                    <IoMail className="mr-2" />
                                    {profile.email}
                                </p>
                            )}
                        </div>
                        <p className="mt-3">{profile.summary}</p>
                    </header>
                )}

                {/* Body Section */}
                <div className="flex flex-row gap-8">
                    {/* Left Section (4/10) */}
                    <div className="w-2/5">
                        {/* Education */}
                        {education && education.some(edu => edu.course) && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-teal-600 font-playpen">Education</h2>
                                {education.map((edu, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="font-balsamiq">{edu.course}</p> {/* Balsamiq Sans for educational details */}
                                        <p>{edu.year}</p>
                                        <p>{edu.institution}, {edu.place}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.some(cert => cert.name) && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-teal-600 font-playpen">Certifications</h2>
                                {certifications.map((cert, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="font-bold">{cert.name}</p>
                                        <p>{cert.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills */}
                        {skills && skills.some(skillCategory => skillCategory.skills.some(skill => skill.trim() !== '')) && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-teal-600 font-playpen">Skills</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left font-balsamiq text-teal-600">Category</th>
                                                <th className="px-4 py-2 text-left font-balsamiq text-teal-600">Skills</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {skills.map((skillCategory, index) => (
                                                skillCategory.skills.length > 0 && (
                                                    <tr key={index} className="border-t">
                                                        <td className="px-4 py-2 font-semibold font-balsamiq">{skillCategory.category}</td>
                                                        <td className="px-4 py-2">
                                                            <div className="flex flex-wrap gap-2">
                                                                {skillCategory.skills.map((skill, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="inline-block bg-gray-100 text-black px-2 py-1 rounded-lg font-crimson text-sm"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                    {/* Right Section (6/10) */}
                    <div className="w-3/5">
                        {/* Experience */}
                        {experience && experience.some(exp => exp.jobTitle) && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-teal-600 font-playpen">Experience</h2>
                                {experience.map((exp, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="font-bold">{exp.jobTitle}</p>
                                        <p className="font-balsamiq">{exp.company}</p>
                                        <p>{exp.duration}</p>
                                        <p>{exp.jobDesc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Projects */}
                        {projects && projects.some(proj => proj.name) && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-teal-600 font-playpen">Projects</h2>
                                {projects.map((project, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="font-bold">{project.name}</p>
                                        <p className="font-balsamiq">{project.toolsAndLang}</p>
                                        <p>{project.proDesc}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template2;
