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
            <header className="header mb-5">
                <div className="header_details flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
                    <Image src={logo} alt="Logo" className="logo w-8 sm:w-12 lg:w-16" />
                    <h1 className="amu text-sm sm:text-lg lg:text-xl">ALIGARH MUSLIM UNIVERSITY</h1>
                </div>
            </header>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold pt-5 text-center">LOGIN</h2>
                <hr className="header-line my-4 sm:my-6" />
                <div className="credentials space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-xs sm:text-base">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter username" 
                            className="w-full mt-1 px-3 py-2 border rounded-lg" 
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm sm:text-base">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter password" 
                            className="w-full mt-1 px-3 py-2 border rounded-lg" 
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={updateInitials} className="button w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</button>
                </div>
                <hr className="header-line2 my-4 sm:my-6" />
                <div className="links flex flex-col sm:flex-row justify-between text-sm sm:text-base">
                    <a className="forgot inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition border py-2 sm:py-0" href="#">FORGOT PASSWORD</a>
                    <a href="/auth/register" className="register inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition py-2 sm:py-0">REGISTER</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
