import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 shadow-md '>
            <div className='mycontainer text-white flex justify-between items-center px-4 py-5 h-15'>
                <div className="logo font-bold text-xl">
                    <span className='text-green-700'>&lt;</span>
                    PassMate
                    <span className='text-green-700'>/&gt;</span>

                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <a href='https://github.com/Prriiitttt/PassMate' target='_blank' rel='noopener noreferrer'>
                    <img className='p-5 w-22 cursor-pointer' src="/icons/github.png" alt="Github logo" />
                </a>
            </div>
        </nav>
    )
}

export default Navbar
