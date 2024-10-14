'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userState } from "@/recoil/atoms/useratom";
import { useRecoilValue } from "recoil";
export const ContactList = ()=>{
    const router = useRouter();
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [Messages,setMessages] = useState([]);
    const user = useRecoilValue(userState);
    console.log('from recoil in the sideClient: ', user);
    // const contacts = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5'];
    const handleProfileClick = () => {
        router.push('/profile')
    }
    const openChat = (person : any) => {
        setSelectedPerson(person);
        let initialMessages : any[] = [];
        if (person === 'Person1') {
            initialMessages = [
                { sender: 'Person1', text: 'Hello!' },
                { sender: 'You', text: 'Hi!' }
            ];
        } else if (person === 'Person2') {
            initialMessages = [
                { sender: 'Person2', text: 'How are you?' },
                { sender: 'You', text: 'I am good, thanks!' }
            ];
        }
        //@ts-ignore
        setMessages(initialMessages);
    };
    const dep = user.department;
    

    return(
        <aside className=" bg-white border-r border-gray-300 p-4">
        {/* Sidebar Header */}
        <div className="text-2xl font-bold text-center text-blue-600 mb-4 flex items-center justify-center">
            AMU Connect 
        </div>

        {/* make this one scrollable so that more contacts can be added */}
        <div className=''>
            <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer" onClick = {handleProfileClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12c-3.866 0-7 3.134-7 7a1 1 0 1 0 2 0c0-2.761 2.239-5 5-5s5 2.239 5 5a1 1 0 1 0 2 0c0-3.866-3.134-7-7-7Z"/>
                </svg>
            </div>
                <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
                <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>
                </div>
            </div>
            <div className="flex-col space-y-3 transition-smooth">
                <div className="flex justify-between items-center hover:bg-slate-200 rounded-lg p-2">
                    <h1>University Announcements</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                </div>
                <div className="flex justify-between items-center hover:bg-slate-200 rounded-lg p-2 hover:cursor-pointer"
                onClick={()=>{
                    router.push(`/dashboard/${dep.split(' ')[0]}`);
                }}>
                    <h1>{user.department}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <div className="p-2">
                    <h1 className="text-slate-600 font-sans">Frequently contacted</h1>
                    <div className="flex-col space-y-2 p-3">
                        <div className="hover:bg-slate-200 rounded-lg p-1">22cob101</div>
                        <div className="hover:bg-slate-200 rounded-lg p-1">22cob101</div>
                    </div>
                </div>

            </div>
        </div>
    </aside>
    )
}