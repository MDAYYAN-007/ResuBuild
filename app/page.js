import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 flex justify-center items-center mt-[70px] py-8"
        style={{ minHeight: "calc(100vh - 70px)" }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex-1 flex flex-col justify-center items-start py-4 px-8 md:px-8 lg:px-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wide text-white">
              Welcome to <span className="text-teal-400">ResuBuild</span>
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-sm md:max-w-md lg:max-w-lg text-gray-300">
              Create your resume in just 5 minutes with our easy-to-use platform.
              Choose from a variety of professional templates, fill in your details,
              and get a polished resume ready to download. It&apos;s quick, simple, and hassle-free!
            </p>
            <Link
              href="/my-resumes"
              className="relative px-6 py-3 md:px-8 md:py-4 bg-teal-600 text-white font-semibold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <FaArrowRight className="ml-2 md:ml-3 relative z-10" />
              <span className="absolute inset-0 bg-teal-500 opacity-30 rounded-full transform -rotate-45 translate-y-1/2 translate-x-1/4 pointer-events-none"></span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center bg-gray-800 bg-opacity-70 p-4 md:p-8 lg:p-16 rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-wide text-white">
              3 Simple Steps
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-300">
              <div>
                <span className="font-semibold text-teal-400">1. Choose a Template:</span> Browse through our curated selection of professional resume templates.
              </div>
              <div>
                <span className="font-semibold text-teal-400">2. Fill in Your Information:</span> Enter your details, including education, experience, and skills.
              </div>
              <div>
                <span className="font-semibold text-teal-400">3. Make Your Resume:</span> Customize your resume and download it in just a few clicks.
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
