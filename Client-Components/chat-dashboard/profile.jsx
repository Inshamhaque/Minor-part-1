"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    const userDetails = {
        name: 'Mohammad Faizan Khan', 
        email: 'gn2444@myamu.ac.in', 
        department: "Computer Engineering", 
        facultyid: "22COB150", 
        designation: "Student", 
    };

    const clickHandler = () => {
        router.push("/dashboard")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 transition-transform transform hover:scale-105">
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c3.313 0 6-2.686 6-6s-2.687-6-6-6-6 2.686-6 6 2.687 6 6 6zM6 20c0-4 4-6 6-6s6 2 6 6" />
                    </svg>
                </div>

                {/* User Details */}
                <h1 className="text-3xl font-semibold text-center text-blue-600">{userDetails.name}</h1>
                <p className="text-gray-700 text-center text-sm">{userDetails.email}</p>
                <div className="mt-4">
                    <p className="text-gray-800 text-center font-medium">Faculty ID: <span className="font-normal">{userDetails.facultyid}</span></p>
                    <p className="text-gray-800 text-center font-medium">Department: <span className="font-normal">{userDetails.department}</span></p>
                    <p className="text-gray-800 text-center font-medium">Designation: <span className="font-normal">{userDetails.designation}</span></p>
                </div>

                <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300" onClick={clickHandler}>
                        Return to Chats
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
