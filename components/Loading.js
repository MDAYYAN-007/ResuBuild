import React from 'react'
import './Loader.css'
import Navbar from '@/components/Navbar'

const Loading = () => {
    return (
        <>
            <Navbar />
            <main
                className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 flex justify-center items-center mt-[70px]"
                style={{ minHeight: "calc(100vh - 70px)" }}
            >
                <div className="cube-loader">
                    <div className="cube-top"></div>
                    <div className="cube-wrapper">
                        <span style={{ '--i': 0 }} className="cube-span"></span>
                        <span style={{ '--i': 1 }} className="cube-span"></span>
                        <span style={{ '--i': 2 }} className="cube-span"></span>
                        <span style={{ '--i': 3 }} className="cube-span"></span>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Loading
