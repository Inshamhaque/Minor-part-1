'use client'
import { registerinputs, registerSchema } from "@/zodfile/schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios  from 'axios';
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [credentials, setCredentials] = useState<registerinputs>({
    mail: '',
    password: '',
    firstName :'',
    lastName:'',
    phone:'',
    facultyId:''
  });  

  const BASE_URL = process.env.BASE_URL;

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [facultyId, setFacultyId] = useState<string>('');
  const router = useRouter();

  // for error state handling
  const [errors, setErrors] = useState<{ 
    mail?: string, 
    password?: string,
    confirmPassword?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    facultyId?: string
  }>({});

  // to notify user that if user exists or not 
  const notify = () => {
    return toast.error('User already exists, try logging in',{
      position : 'top-center',
      autoClose : 5000
    });
  }


  // axios post function
  const sendreq = async () => {
    console.log('Credentials are:', credentials);
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/signup`, {
        mail: credentials.mail,
        password: credentials.password,
        facultyId: facultyId,
        name: `${firstName} ${lastName}`
      });
      if (!res) {
        console.log('Error occurred, try again later');
        return null;
      }
      console.log('User registration successful');
      return res;
    } catch (error) {
      console.error('Error occurred while sending request:', error);
      return null;
    }
  }

  // handleClick trigger
  const handleClick = async (e: any) => {
    e.preventDefault();
    const result = registerSchema.safeParse(credentials);
    console.log("Result:", result.success);
    console.log('Handle click triggered');
    // zod parsing ... 
    if (!result.success || confirmPassword !== credentials.password) {
      const formattedErrors = result.error?.format() || {};
      console.log('Handle click inside triggered');
      
      setErrors({
        //@ts-ignore
        mail: formattedErrors.mail?._errors[0] || '',
        //@ts-ignore
        password: formattedErrors.password?._errors[0] || '',
        confirmPassword: confirmPassword !== credentials.password ? 'Passwords do not match' : '',
        firstName: firstName ? '' : 'First name is required',
        lastName: lastName ? '' : 'Last name is required',
        phone: phone ? '' : 'Phone number is required',
        facultyId: facultyId ? '' : 'Faculty ID is required',
      });
      
    } 

    try {
      const res = await sendreq();
      if (!res) {
        console.log('Error occurred while sending request');
      } else if (res?.data?.status === 404) {
        console.log('Duplicate user found');
        notify();
      } else {
        // if user credentials were valid, redirect him to verify page
        console.log('User creation was successful');
        router.push('/auth/verify');
      }
    } catch (e) {
      console.log('Some error occurred:', e);
    }
  };

  return (
    <div className="bg-gray-200 h-full">
      <div className="">
        {/* form section */}
        <form className="flex flex-col shadow-lg mt-5 max-w-md mx-auto bg-white gap-5 mb-5 p-5 border border-gray-800 rounded-lg gap-y-3" onSubmit={handleClick}>
          <div className="flex justify-center font-semibold text-xl border-b border-b-2 border-gray-600 pb-3 mb-2">CREATE AN ACCOUNT</div>
          
          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="email" 
              name="floating_email" 
              id="floating_email" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
              value={credentials.mail}
              onChange={(e) => setCredentials({ ...credentials, mail: e.target.value })}
            />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Institutional mail</label>
            {errors.mail && <div className="text-sm text-red-600">{errors.mail}</div>}
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="floating_password"
              id="floating_password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            {errors.confirmPassword && <div className="text-sm text-red-600">{errors.confirmPassword}</div>}
          </div>

          {/* First Name and Last Name */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="text" 
                name="floating_first_name" 
                id="floating_first_name" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              {errors.firstName && <div className="text-sm text-red-600">{errors.firstName}</div>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="text" 
                name="floating_last_name" 
                id="floating_last_name" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              {errors.lastName && <div className="text-sm text-red-600">{errors.lastName}</div>}
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="tel" 
              name="floating_phone" 
              id="floating_phone" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
            {errors.phone && <div className="text-sm text-red-600">{errors.phone}</div>}
          </div>

          {/* Faculty ID */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="floating_facultyId" 
              id="floating_facultyId" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
            />
            <label htmlFor="floating_facultyId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Faculty ID</label>
            {errors.facultyId && <div className="text-sm text-red-600">{errors.facultyId}</div>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-3 py-1.5 w-full text-white text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
