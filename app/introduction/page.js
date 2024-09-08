import Navbar from '@/components/Navbar';
import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaDownload } from 'react-icons/fa';
import '@/app/globals.css';
import Link from 'next/link';

const Page = () => {
    return (
        <>
            <Navbar />
            <section
                className="py-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center justify-center mt-[70px]"
                style={{ minHeight: 'calc(100vh - 70px)' }}
            >
                <h2 className="text-5xl font-extrabold mb-12 text-teal-400">How It Works</h2>
                <div className="flex gap-4 justify-around w-full max-w-5xl mb-10 space-y-0">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center space-y-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
                        <div className="bg-gray-900 p-8 rounded-full shadow-2xl">
                            <FaInfoCircle className="text-6xl text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-teal-400">Step 1</h3>
                        <p className="max-w-xs text-gray-300">
                            Choose a professional template that fits your style and career goals.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center space-y-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
                        <div className="bg-gray-900 p-8 rounded-full shadow-2xl">
                            <FaCheckCircle className="text-6xl text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-teal-400">Step 2</h3>
                        <p className="max-w-xs text-gray-300">
                            Fill in your information with ease using our intuitive interface.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center space-y-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
                        <div className="bg-gray-900 p-8 rounded-full shadow-2xl">
                            <FaDownload className="text-6xl text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-teal-400">Step 3</h3>
                        <p className="max-w-xs text-gray-300">
                            Download your resume and get ready to impress your future employer.
                        </p>
                    </div>
                </div>

                <Link href="/my-resumes"
                    className="relative flex items-center px-8 py-4 overflow-hidden font-semibold transition-all bg-teal-800 rounded-full group"
                >
                    <span
                        className="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-teal-900 rounded group-hover:-mr-5 group-hover:-mt-5"
                    >
                        <span
                            className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-100"
                        ></span>
                    </span>
                    <span
                        className="absolute bottom-0 rotate-180 left-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-teal-900 rounded group-hover:-ml-5 group-hover:-mb-5"
                    >
                        <span
                            className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-100"
                        ></span>
                    </span>
                    <span
                        className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-teal-900 rounded-full group-hover:translate-x-0"
                    ></span>
                    <span
                        className="relative w-full text-left text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-gray-100"
                    >
                        Start Building
                    </span>
                </Link>
            </section>
        </>
    );
};

export default Page;
