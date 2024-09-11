'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './form.css'
import Loading from '@/components/Loading';
import Image from 'next/image';

const TextInput = ({ name, control, placeholder, rules, type }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <div className="relative z-0 w-full mb-6 group">
                <input
                    type={type}
                    {...field}

                    autoComplete="off"
                    placeholder=""
                    className="block py-3 px-2 w-full text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                />
                <label
                    htmlFor={name}
                    className="peer-focus:font-medium absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {placeholder}
                </label>
            </div>
        )}
        rules={rules}
    />
);


const UserForm = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            profile: {
                name: '',
                profession: '',
                no: '',
                email: '',
                summary: ''
            },
            education: [{ course: '', year: '', marks: '', institution: '', place: '' }],
            experience: [{ company: '', duration: '', jobTitle: '', jobDesc: '' }],
            projects: [{ name: '', toolsAndLang: '', proDesc: '' }],
            certifications: [{ name: '', desc: '' }],
            skills: [{ category: '', skills: [''] }],
            template: ''
        }
    });
    const { getValues } = useForm();

    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        setLoading(true);

        const loadData = async () => {
            try {
                if (id) {
                    const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];

                    const currentResume = existingResumes.find(resume => resume.id === id);
                    if (!currentResume) {
                        router.push('/my-resumes');
                    } else if (currentResume.formData) {
                        setFormData(currentResume.formData);
                    }
                }
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        loadData();
    }, [id, router]);


    useEffect(() => {
        if (formData) {
            Object.keys(formData).forEach((section) => {
                if (Array.isArray(formData[section])) {
                    if (formData[section].length > (section === 'projects' ? projectFields.length : 0)) {
                        formData[section].slice(projectFields.length).forEach((item) => {
                            if (section === 'projects') {
                                appendProject(item);
                            } else if (section === 'education') {
                                appendEducation(item);
                            } else if (section === 'experience') {
                                appendExperience(item);
                            } else if (section === 'certifications') {
                                appendCertification(item);
                            } else if (section === 'skills') {
                                appendCategory(item);
                            }
                        });
                    }

                    // Set values for existing fields
                    formData[section].forEach((item, index) => {
                        Object.keys(item).forEach((field) => {
                            setValue(`${section}[${index}].${field}`, item[field]);
                        });
                    });
                } else {
                    // Handle non-array sections
                    Object.keys(formData[section]).forEach((field) => {
                        setValue(`${section}.${field}`, formData[section][field]);
                    });
                }
            });
        }
    }, [formData, setValue]);

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education"
    });

    const { fields: skillsFields, append: appendCategory, remove: removeCategory } = useFieldArray({
        control,
        name: "skills"
    });

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: "experience"
    });

    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
        control,
        name: "projects"
    });

    const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
        control,
        name: "certifications"
    });

    const [activeSection, setActiveSection] = useState('template');
    const sections = ['template', 'profile', 'education', 'skills', 'experience', 'projects', 'certifications'];
    const currentIndex = sections.indexOf(activeSection);

    const saveDraft = (data) => {
        const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
        const currentResume = existingResumes.find(resume => resume.id === id);
        if (!data.template) {
            data.template = currentResume?.formData?.template || 1;
        }
        const updatedResumes = existingResumes.map(resume =>
            resume.id === id ? { ...resume, formData: data } : resume
        );
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
        setFormData(data);
    };

    const onSubmit = (data) => {
        const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
        const currentResume = existingResumes.find(resume => resume.id === id);
        if (!data.template) {
            data.template = currentResume?.formData?.template || 1;
        }
        const updatedResumes = existingResumes.map(resume =>
            resume.id === id ? { ...resume, formData: data } : resume
        );
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
        setFormData(data);
        router.push(`/resume/${id}`);
    };

    const handleNext = () => {
        if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1]);
        }
    };

    const templates = [
        { id: 1, name: 'Classic Resume', image: '/resume.png' },
        { id: 2, name: 'Modern Resume', image: '/resume-2.png' },
        { id: 3, name: 'Creative Resume', image: '/resume-3.png' },
    ];

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Open modal with selected template
    const handleOpenModal = (template) => {
        setSelectedTemplate(template);
        setModalOpen(true);
    };

    // Close modal function
    const closeModal = () => {
        setModalOpen(false);
    };

    const renderFormSection = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <TextInput
                            name="profile.name"
                            control={control}
                            placeholder="Name"
                            type="text"
                        />
                        <TextInput
                            name="profile.profession"
                            control={control}
                            placeholder="Profession"
                            type="text"
                        />
                        <TextInput
                            name="profile.no"
                            control={control}
                            placeholder="Phone Number"
                            type="tel"
                        />
                        <TextInput
                            name="profile.email"
                            control={control}
                            placeholder="Email"
                            type="email"
                        />
                        <TextInput
                            name="profile.summary"
                            control={control}
                            placeholder="Profile"
                            type="text"
                        />
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6">
                        {educationFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`education[${index}].course`}
                                    control={control}
                                    placeholder="Course"
                                    type="text"
                                />
                                <TextInput
                                    name={`education[${index}].year`}
                                    control={control}
                                    placeholder="Year"
                                    type="text"
                                />
                                <TextInput
                                    name={`education[${index}].institution`}
                                    control={control}
                                    placeholder="Institution"
                                    type="text"
                                />
                                <TextInput
                                    name={`education[${index}].place`}
                                    control={control}
                                    placeholder="Place"
                                    type="text"
                                />
                                <TextInput
                                    name={`education[${index}].marks`}
                                    control={control}
                                    placeholder="Percentage"
                                    type="text"
                                />
                                {educationFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                        ))}
                        <button
                            type="button"
                            onClick={() => appendEducation({ course: '', year: '', marks: '' })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Education
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6">
                        {skillsFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`skills[${index}].category`}
                                    control={control}
                                    placeholder="Category"
                                    type="text"
                                />
                                <div className="space-y-4">
                                    <Controller
                                        control={control}
                                        name={`skills[${index}].skills`}
                                        type="text"
                                        render={({ field }) => (
                                            <>
                                                {field.value.map((skill, skillIndex) => (
                                                    <div key={skillIndex} className="relative">
                                                        <input
                                                            type="text"
                                                            value={skill}
                                                            onChange={(e) => {
                                                                const updatedSkills = [...field.value];
                                                                updatedSkills[skillIndex] = e.target.value;
                                                                field.onChange(updatedSkills);
                                                            }}
                                                            placeholder="Skill"
                                                            className="block py-3 px-4 w-full text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-teal-600"
                                                        />
                                                        {field.value.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedSkills = [...field.value];
                                                                    updatedSkills.splice(skillIndex, 1);
                                                                    field.onChange(updatedSkills);
                                                                }}
                                                                className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                                            >
                                                                <FaTrash className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange([...field.value, ''])}
                                                    className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                                                >
                                                    + Add Skill
                                                </button>
                                            </>
                                        )}
                                    />
                                </div>
                                {skillsFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(index)}
                                        className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendCategory({ category: '', skills: [''] })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Category
                        </button>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6">
                        {experienceFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`experience[${index}].company`}
                                    control={control}
                                    placeholder="Company"
                                    type="text"
                                />
                                <TextInput
                                    name={`experience[${index}].duration`}
                                    control={control}
                                    placeholder="Duration"
                                    type="text"
                                />
                                <TextInput
                                    name={`experience[${index}].jobTitle`}
                                    control={control}
                                    placeholder="Job Title"
                                    type="text"
                                />
                                <TextInput
                                    name={`experience[${index}].jobDesc`}
                                    control={control}
                                    placeholder="Job Description"
                                    type="text"
                                />
                                {experienceFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(index)}
                                        className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendExperience({ company: '', duration: '', jobTitle: '' })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Experience
                        </button>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6">
                        {projectFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`projects[${index}].name`}
                                    control={control}
                                    placeholder="Project Name"
                                    type="text"
                                />
                                <TextInput
                                    name={`projects[${index}].toolsAndLang`}
                                    control={control}
                                    placeholder="Tools and Languages"
                                    type="text"
                                />
                                <TextInput
                                    name={`projects[${index}].proDesc`}
                                    control={control}
                                    placeholder="Description"
                                    type="text"
                                />
                                {projectFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendProject({ name: '', toolsAndLang: '', link: '' })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Project
                        </button>
                    </div>
                );
            case 'certifications':
                return (
                    <div className="space-y-6">
                        {certificationFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`certifications[${index}].name`}
                                    control={control}
                                    placeholder="Certification Name"
                                    type="text"
                                />
                                <TextInput
                                    name={`certifications[${index}].desc`}
                                    control={control}
                                    placeholder="Description"
                                    type="text"
                                />
                                {certificationFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeCertification(index)}
                                        className="absolute top-0 right-0 p-1 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendCertification({ name: '', link: '' })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Certification
                        </button>
                    </div>
                );
            default:
                return (
                    <>
                        {/* Template selection grid */}
                        <div className="flex flex-wrap justify-center gap-10">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg w-72 rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-between border ${watch('template') === template.id ? 'border-teal-700' : 'border-gray-600'} transform transition-all duration-300 p-4`}
                                >
                                    {/* Image triggers modal */}
                                    < Image
                                        src={template.image}
                                        alt={template.name}
                                        width={200}
                                        height={256}
                                        className="w-full h-64 object-cover object-top transition-transform duration-300 ease-in-out transform hover:scale-105 mb-4 cursor-pointer rounded-lg"
                                        onClick={() => handleOpenModal(template)} // Click to open modal
                                    />
                                    <h2
                                        className="text-xl font-semibold text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-4 py-2 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                                        onClick={() => setValue('template', template.id)}
                                    >
                                        {template.name}
                                    </h2>
                                    <input
                                        type="radio"
                                        value={template.id}
                                        checked={watch('template') === template.id}
                                        onChange={() => setValue('template', template.id)}
                                        className="hidden"
                                        aria-label={`Select template ${template.name}`}
                                    />
                                </div>
                            ))}
                        </div >

                        {/* Modal */}
                        {
                            isModalOpen && (
                                <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center">
                                    <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-lg">
                                        {/* Modal close button */}
                                        <div className="flex justify-end p-2">
                                            <button
                                                onClick={closeModal}
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Modal content: Large Image */}
                                        <div className="p-6 pt-0 text-center">
                                            {selectedTemplate && (
                                                <>
                                                    <Image
                                                        src={selectedTemplate.image}
                                                        alt={selectedTemplate.name}
                                                        width={400} // Set the appropriate width for larger image
                                                        height={512} // Set the appropriate height for larger image
                                                        className="w-full h-auto object-cover rounded-lg"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                );
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <>
                <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8 mt-16">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col bg-opacity-80 backdrop-blur-md rounded-lg p-4">
                            <div className="flex gap-6 max-md:flex-col justify-center items-center">
                                <div className="w-1/4 p-4 flex flex-col gap-4 items-center justify-center sticky top-28 self-start bg-gray-800 rounded-lg max-lg:w-1/3 max-md:hidden" >
                                    {sections.map(section => (
                                        <button
                                            key={section}
                                            type="button"
                                            className={`w-52 py-3 px-5 rounded-lg font-medium transition-colors ${activeSection === section ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-500 hover:bg-gray-600'}`}
                                            onClick={() => setActiveSection(section)}
                                        >
                                            {section.charAt(0).toUpperCase() + section.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-3/4 p-6 bg-gray-800 rounded-lg max-lg:2/3 max-md:w-full">
                                    {renderFormSection()}
                                    <div className="flex flex-col justify-around mx-auto mt-8 space-y-4 w-full">
                                        <div className="relative w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-teal-600 rounded-full transition-all duration-300 ease-in-out"
                                                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between space-x-4">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className={`py-1 px-4 rounded-lg bg-white/10 backdrop-blur-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 ease-in-out shadow-lg transform active:scale-95 border border-white/20`}
                                                disabled={currentIndex === 0}
                                            >
                                                <svg className="w-6 h-6 text-white mr-2 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                                </svg>
                                                Prev
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className={`py-1 px-4 rounded-lg bg-white/10 backdrop-blur-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 ease-in-out shadow-lg transform active:scale-95 border border-white/20`}
                                                disabled={currentIndex === sections.length - 1}
                                            >
                                                Next
                                                <svg className="w-6 h-6 text-white ml-2 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4-4m4 4-4 4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit' className="button_br mx-auto">
                                            <div className="dots_border_br"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                className="sparkle_br"
                                            >
                                                <path
                                                    className="path_br"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    stroke="black"
                                                    fill="black"
                                                    d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                                ></path>
                                                <path
                                                    className="path_br"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    stroke="black"
                                                    fill="black"
                                                    d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                                ></path>
                                                <path
                                                    className="path_br"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    stroke="black"
                                                    fill="black"
                                                    d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                                ></path>
                                            </svg>
                                            <span className="text_button_br font-bold">Build Resume</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => saveDraft(getValues())}
                                            className="px-6 py-2 mt-6 mx-auto block bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                                        >
                                            Save Draft
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </section>
            </>
        </>
    );
};

export default UserForm;
