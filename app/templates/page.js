import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react';

const templates = [
    { id: 1, name: 'Classic Resume', image: '/images/classic-resume.png' },
    { id: 2, name: 'Modern Resume', image: '/images/modern-resume.png' },
    { id: 3, name: 'Creative Resume', image: '/images/creative-resume.png' },
    // Add more templates as needed
];

const Page = () => {
    return (
        <>
            <Navbar />
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8">
                <h1 className="text-5xl font-extrabold text-center mb-14 text-teal-400">Choose Your Resume Template</h1>
                <div className="flex flex-wrap justify-center gap-10">
                    {templates.map(template => (
                        <div
                            key={template.id}
                            className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg w-80 rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center border border-gray-600 transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                            <div className="p-6 text-center flex justify-center flex-col">
                                <h2 className="text-3xl font-semibold mb-4 text-teal-400">{template.name}</h2>
                                <Link href={'/form'} className="relative flex items-center justify-center px-6 py-2 bg-teal-800 text-gray-100 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-teal-700 hover:scale-105">
                                    <span className="absolute inset-0 bg-teal-700 rounded-full blur-lg transform scale-110 group-hover:scale-100 transition-all duration-300"></span>
                                    <span className="relative">Select Template</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Page;
