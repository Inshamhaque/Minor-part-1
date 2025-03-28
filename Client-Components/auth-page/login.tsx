'use client'

import logo from '@/assets/amu_logo.png'
import './login.css'
import Image from 'next/image'
import React, {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import "react-toastify/dist/ReactToastify.css";
import { userState } from '@/recoil/atoms/useratom';

function Login() {
    const [facultyId, setfacultyId] = useState('');
    const [Password, setPassword] = useState('');
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();


    const updateInitials = () => {
        setfacultyId('');
        setPassword('');
    }

    const handleForgotPassword = () => {
        router.push('/auth/forgot'); 
    };

    const OnClickHandler = async()=>{
        const res = await axios.post(`${base_url}/api/auth/login`,{
            facultyId,
            password : Password
        })
        console.log(res.status);
        if(res.status==401){
            return toast.error('incorrect credentials');
        }
        if(res.status==200){
            toast.success('user authenticated successfullly');
            router.push('/dashboard')
        }
        else{
            toast.error('incorrect password');
        }
    }
    return (
            <div className="container max-h-screen px-4 sm:px-5 lg:px-6 max-w-lg w-full">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold pt-4 text-center">LOGIN</h2>
                <hr className="header-line my-3 sm:my-4" />
                <div className="credentials space-y-3">
                    <div>
                        <label htmlFor="username" className="block text-xs sm:text-sm">FacultyId</label>
                        <input 
                            type="text" 
                            id="Facultyid" 
                            placeholder="" 
                            className="w-full mt-1 px-3 py-1 border bg-gray-100 rounded-lg "  
                            value={facultyId}
                            onChange={(e) => setfacultyId(e.target.value)}
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
                    <button onClick={OnClickHandler} className="button w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</button>
                </div>
                <hr className="header-line2 my-3 sm:my-4" />
                <div className="links flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
                <button 
    onClick={handleForgotPassword} 
    className="forgot inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition border py-1 sm:py-0"
>
    FORGOT PASSWORD
    </button>
                    <a href="/auth/register" className="register inline-block px-4 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition py-1 sm:py-0">REGISTER</a>
                </div>
                <ToastContainer />
            </div>
        
    );
}

export default Login;
