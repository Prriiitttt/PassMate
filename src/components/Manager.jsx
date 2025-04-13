import React from 'react'
import { useRef, useState, useEffect } from 'react';
import lottie from "lottie-web";
import 'https://cdn.lordicon.com/lordicon.js';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [inputs, setInputs] = useState({ site: '', username: '', password: '' });

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)

    }


    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Yaaaayyy, copied to clipboard 📋', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const savePassword = async (id) => {
        const { site, username, password } = form;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {
            const newEntry = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            //Logic forn deleting the existing ID

            await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id}) })


            await fetch("http://localhost:3000/", {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()}) })
            
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
        }
        else {
            toast('Error: Password not saved!!');
        }
        setInputs({ site: '', username: '', password: '' });
    }

    const deletePassword = async (id) => {
        toast('Password deleted succefully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id}) })

        }

    }

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const showPassword = () => {
        //   alert("Show the password");
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/closedeye.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            passwordRef.current.type = "password"
            ref.current.src = "icons/closedeye.png"
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#0f172a_40%,#334155_100%)]"></div>
            <div className="max-w-screen-md w-full mx-auto pt-5 md:px-0 text-white">
                {/* <div className="mycontainer text-white"> */}
                <h1 className='text-2xl font-bold text-center'>
                    <span className='text-emerald-700'>&lt;</span>
                    PassMate
                    <span className='text-emerald-700'>/&gt;</span>
                </h1>

                <p className='text-lg text-center'>Your own password Manager</p>

                <div className='text-white flex flex-col p-4 gap-3 justify-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-lg border border-white w-full text-white px-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-center gap-2'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-lg border border-white text-white p-4 py-1 md:w-[30%]' type="text" name='username' id='username' />
                        <div className="relative md:w-[30%]">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-lg border border-white text-white p-4 py-1 w-full' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <div className="flex justify-center">
                        <button onClick={savePassword} className="flex justify-center items-center bg-slate-700 px-3 py-2 w-fit rounded-full gap-1 hover:bg-slate-600 cursor-pointer border border-slate-900">
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/add--v1.png" alt="add--v1" />
                            <span className='text-lg'>Save Password</span>
                        </button>
                    </div>
                </div>

                <div className="passwords px-4 sm:px-6 md:px-0">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="w-full text-left text-white border border-gray-600 mb-10 ">
                            <thead className="bg-slate-700">
                                <tr>
                                    <th className="p-2">Site</th>
                                    <th className="p-2">Username</th>
                                    <th className="p-2">Password</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-600">
                                        <td className="p-2">
                                            <div className="flex items-center justify-start gap-2">
                                                <a href={item.site} target='_blank' className='text-blue-400 underline break-all'>{item.site}</a>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center justify-start gap-x-2">
                                                <span>{item.username}</span>
                                                <img onClick={() => { copyText(item.username) }} className="cursor-pointer w-4 h-4 hover:bg-slate-600" src="/icons/copy.png" alt="Copy Username" />
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center justify-start gap-x-2">
                                                <span>{"*".repeat(item.password.length)}</span>
                                                {/* <span>{item.password}</span> */}
                                                <img onClick={() => { copyText(item.password) }} className="cursor-pointer w-4 h-4 hover:bg-slate-600" src="/icons/copy.png" alt="Copy Password" />
                                            </div>
                                        </td>
                                        <td className='flex item-center  p-2 gap-4'>
                                            <img className='cursor-pointer' onClick={() => { editPassword(item.id) }} width="20" src="icons/edit.png" alt="" />
                                            <img className='cursor-pointer' onClick={() => { deletePassword(item.id) }} width="20" src="icons/delete.png" alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>


    )
}

export default Manager
