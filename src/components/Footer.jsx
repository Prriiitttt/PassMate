import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-slate-800 shadow-md text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-col items-center justify-center">
                <div className="logo font-bold text-xl">
                    <span className="text-green-700">&lt;</span>
                    PassMate
                    <span className="text-green-700">/&gt;</span>
                </div>
                <div className="flex items-center justify-center text-sm">
                    Created with <img className="w-5 mx-1" src="/icons/heart.png" alt="heart" /> by Prit 😎
                </div>
            </div>
        </footer>
    )
}

export default Footer