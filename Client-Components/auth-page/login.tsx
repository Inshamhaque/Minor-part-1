"use client";  // Add this line at the very top

import logo from '@/assets/amu_logo.png'
import './login.css'
import Image from 'next/image'
import React, {useState} from 'react';

function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const updateInitials = () => {
        setUsername('');
        setPassword('');
    }

    return (


        <div className='pt-5 mt-20'>
            {/* <header className="header mb-5">
                <div className="header_details flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
                    <Image src={logo} alt="Logo" className="logo w-8 sm:w-12 lg:w-16" />
                    <h1 className="amu text-sm sm:text-lg lg:text-xl">ALIGARH MUSLIM UNIVERSITY</h1>

                </div>
            </header> */}
            <div className="container mx-auto px-4 sm:px-5 lg:px-6 max-w-lg w-full">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold pt-4 text-center">LOGIN</h2>
                <hr className="header-line my-3 sm:my-4" />
                <div className="credentials space-y-3">
                    <div>
                        <label htmlFor="username" className="block text-xs sm:text-sm">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="name@zhcet.ac.in" 
                            className="w-full mt-1 px-3 py-1 border bg-gray-100 rounded-lg "  
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs sm:text-sm">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter password" 
                            className="w-full mt-1 px-3 py-2 border bg-gray-100 rounded-lg" 
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={updateInitials} className="button w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</button>
                </div>
                <hr className="header-line2 my-3 sm:my-4" />
                <div className="links flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
                    <a className="forgot inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition border py-1 sm:py-0" href="#">FORGOT PASSWORD</a>
                    <a href="/auth/register" className="register inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition py-1 sm:py-0">REGISTER</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
