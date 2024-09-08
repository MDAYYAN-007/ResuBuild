'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './form.css'

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
            experience: [{ company: '', duration: '', jobTitle: '' }],
            projects: [{ name: '', toolsAndLang: ''}],
            awards: [{ name: '', desc: '' }],
            skills: [{ category: '', skills: [''] }],
            template: '1'
        }
    });

    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (id) {
            const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
            const currentResume = existingResumes.find(resume => resume.id === id);

            if (!currentResume) {
                router.push('/my-resumes?message=No resume found with the provided ID');
            } else if (currentResume.formData) {
                setFormData(currentResume.formData);
            }
        }
    }, [id]);


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

    const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
        control,
        name: "awards"
    });

    const [activeSection, setActiveSection] = useState('template');
    const sections = ['template', 'profile', 'education', 'skills', 'experience', 'projects', 'awards'];
    const currentIndex = sections.indexOf(activeSection);

    const saveDraft = (data) => {
        const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
        const updatedResumes = existingResumes.map(resume =>
            resume.id === id ? { ...resume, formData: data } : resume
        );
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
        setFormData(data);
    };

    const onSubmit = (data) => {
        const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
        const updatedResumes = existingResumes.map(resume =>
            resume.id === id ? { ...resume, formData: data } : resume
        );
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
        setFormData(data);
        console.log(formData)
        router.push(`/resume/${id}?template=${formData.template}`);
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
        { id: 1, name: 'Classic Resume', image: '/images/classic-resume.png' },
        { id: 2, name: 'Modern Resume', image: '/images/modern-resume.png' },
        { id: 3, name: 'Creative Resume', image: '/images/creative-resume.png' },
    ];

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
                                        className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-5 h-5" />
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
                                                                className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                                            >
                                                                <FaTrash className="w-5 h-5" />
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
                                        className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-5 h-5" />
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
                                {experienceFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(index)}
                                        className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                        title='Delete'
                                    >
                                        <FaTrash className="w-5 h-5" />
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
                                {projectFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                    >
                                        <FaTrash className="w-5 h-5" />
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
            case 'awards':
                return (
                    <div className="space-y-6">
                        {awardFields.map((item, index) => (
                            <div key={item.id} className="relative border border-gray-600 p-4 rounded-xl hover:border-teal-700">
                                <TextInput
                                    name={`awards[${index}].name`}
                                    control={control}
                                    placeholder="Award Name"
                                    type="text"
                                />
                                <TextInput
                                    name={`awards[${index}].desc`}
                                    control={control}
                                    placeholder="Description"
                                    type="text"
                                />
                                {awardFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAward(index)}
                                        className="absolute top-0 right-0 p-2 text-gray-400 border-b border-l rounded-md hover:text-teal-500 transition-all duration-300 ease-in-out"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendAward({ name: '', link: '' })}
                            className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out"
                        >
                            + Add Another Award
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-wrap justify-center gap-10">
                        {templates.map(template => (
                            <div
                                key={template.id}
                                className={`bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg w-80 rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center border ${watch('template') === template.id ? 'border-teal-700' : 'border-gray-600'} transform hover:-translate-y-2 transition-all duration-300`}
                                onClick={() => setValue('template', template.id)}
                            >
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                />
                                <div className="p-6 text-center flex justify-center flex-col">
                                    <h2 className="text-3xl font-semibold mb-4 text-teal-400">{template.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <>
            <Navbar />
            <>
                <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8 mt-16">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-col bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-4">
                                <div className="flex gap-6">
                                    <div className="w-1/4 p-4 space-y-4 sticky top-28 self-start bg-gray-800 rounded-lg">
                                        {sections.map(section => (
                                            <button
                                                key={section}
                                                type="button"
                                                className={`w-full py-3 px-5 rounded-lg font-medium transition-colors ${activeSection === section ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-500 hover:bg-gray-600'}`}
                                                onClick={() => setActiveSection(section)}
                                            >
                                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="w-3/4 p-6 bg-gray-800 rounded-lg">
                                        {renderFormSection()}
                                        <div className="flex flex-col justify-around mx-auto mt-8 space-y-4 w-[50%]">
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
                                            <button type="submit" className="px-6 py-2 mt-6 mx-auto block bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-300">
                                                Generate Resume
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={() => saveDraft()}
                                                className="px-6 py-2 mt-6 mx-auto block bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                                            >
                                                Save Draft
                                            </button>
                                        </div>
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
