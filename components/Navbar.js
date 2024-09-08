import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full flex justify-center items-center p-4 shadow-md border-b border-teal-400 fixed top-0 z-10 print:hidden">
      <Link href="/">
        <h1 className="text-teal-400 text-3xl font-bold font-sans">
          {'<'}Resu
          <span className="text-teal-300">Build{'/>'}</span>
        </h1>
      </Link>
    </nav>
  );
}

export default Navbar;
