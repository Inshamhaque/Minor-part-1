'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userState } from "@/recoil/atoms/useratom";
import { SetterOrUpdater, useRecoilValue } from "recoil";

export const ContactList = ({ chatname, setchatname } : {
    chatname : string,
    setchatname : SetterOrUpdater<string> 
} ) => {
    const router = useRouter();
    const [Messages, setMessages] = useState([]);
    const user = useRecoilValue(userState);
    const [chosen, setchosen] = useState(''); 
    const department = user?.department || 'General';

    console.log('from recoil in the sideClient i.e department is this : ', department);

    return (
        <aside className="bg-slate-200 flex flex-col border-r border-gray-300 p-4 h-screen">
            {/* Sidebar Header */}
            <div className="text-2xl font-bold text-center text-blue-600 mb-4 flex items-center justify-center">
                AMU Connect
            </div>

            {/* Scrollable Contacts Section */}
            <div className="flex-grow overflow-y-auto space-y-3">
                <div className="flex justify-between items-center mb-4" onClick={() => setchatname('University Announcements')}>
                    <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
                    <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between items-center hover:bg-gray-100 rounded-lg p-3 cursor-pointer" onClick={() => setchatname('University Announcements')}>
                    <h1>University Announcements</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <div className="flex justify-between items-center hover:bg-gray-100 rounded-lg p-3 cursor-pointer" onClick={() => setchatname(department)}>
                    <h1>{department}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>

                {/* Frequently Contacted Section */}
                <div className="p-2">
                    <h1 className="text-slate-600 font-sans">Frequently contacted</h1>
                    <div className="flex-col space-y-2 p-3">
                        {['22cob101', '22cob102'].map((contact, index) => (
                            <div key={index} className="hover:bg-slate-200 rounded-lg p-1 cursor-pointer" onClick={() => setchatname(contact)}>
                                {contact}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="relative flex-none p-3 text-black fixed bottom-0 w-full">
                <Profile />
            </div>
        </aside>
    );
};

const Profile = () => {
    const user = useRecoilValue(userState);
    const logout = () => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        console.log('Cookie removed');
    };

    return (
        <div className="flex justify-between items-center text-sm space-x-4 p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full h-2 w-2 bg-green-500"></div>
                        <div>Active</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2 text-red-600 font-semibold cursor-pointer" onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 2ZM5.404 4.343a.75.75 0 0 1 0 1.06 6.5 6.5 0 1 0 9.192 0 .75.75 0 1 1 1.06-1.06 8 8 0 1 1-11.313 0 .75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
                <span>Logout</span>
            </div>
        </div>
    );
};
