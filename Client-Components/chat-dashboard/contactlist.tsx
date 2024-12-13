'use client';
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/useratom";
import { useRouter } from "next/navigation";

export const ContactList = ({ chatname, setchatname }:{
    chatname : any,
    setchatname : any
}) => {
    const router = useRouter();
    const user = useRecoilValue(userState);
    const [selectedChat, setSelectedChat] = useState(chatname);
    //@ts-ignore
    const department = user?.department || 'General';
    console.log('from recoil : ',user);
    const handleChatSelection = (chat:any) => {
        setSelectedChat(chat);
        setchatname(chat);
    };

    return (
        <aside className="bg-slate-200 flex flex-col border-r border-gray-300 p-4 h-screen">
            <div className="text-2xl font-bold text-center text-blue-600 mb-4">AMU Connect</div>
            <div className="flex-grow overflow-y-auto space-y-3">
                <div className="text-xl font-semibold text-gray-800">Chats</div>
                <div 
                    className={`hover:bg-gray-100 rounded-lg p-3 cursor-pointer ${selectedChat === 'University Announcements' ? 'bg-blue-100' : ''}`}
                    onClick={() => handleChatSelection('University Announcements')}
                >
                    University Announcements
                </div>
                <div 
                    className={`hover:bg-gray-100 rounded-lg p-3 cursor-pointer ${selectedChat === department ? 'bg-blue-100' : ''}`}
                    onClick={() => handleChatSelection(department)}
                >
                    {department}
                </div>
                <div className="p-2">
                    <h1 className="text-slate-600">Frequently contacted</h1>
                    {['22cob101', '22cob102'].map((contact, index) => (
                        <div 
                            key={index} 
                            className={`hover:bg-slate-200 rounded-lg p-1 cursor-pointer ${selectedChat === contact ? 'bg-blue-100' : ''}`}
                            onClick={() => handleChatSelection(contact)}
                        >
                            {contact}
                        </div>
                    ))}
                </div>
            </div>
            <div className=" bottom-0 w-full p-3 cursor-pointer">
                <Profile />
            </div>
        </aside>
    );
};

const Profile = () => {
    const user = useRecoilValue(userState);
    const router = useRouter();
    return (
        <div className="flex items-center space-x-4 bg-white p-3 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500">
                    <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975..." />
                </svg>
            </div>
            <div onClick={()=>{
                router.push('/dashboard/profile');
            }}>
                <div className="font-semibold">{user?.name}</div>
                <div className="flex items-center text-green-600">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Active
                </div>
            </div>
            <button className="text-red-600" onClick={logout}>Logout</button>
        </div>
    );
};
const logout = () => {
    const router = useRouter();
    document.cookie = "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
};
