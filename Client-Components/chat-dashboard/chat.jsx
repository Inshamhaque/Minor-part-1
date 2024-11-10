'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './chat.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OTPbox } from '@/components/OTPbox';
import { getcookie } from '@/actions/get-cookie-value';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/useratom';
import { ContactList } from './contactlist';
import { useSocket } from '@/context/SocketProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ChatApp = ({ id }) => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const { sendMessage } = useSocket();
    const [verified, setVerified] = useState(true); // todo
    const [user, setUser] = useRecoilState(userState);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [darkMode, setDarkMode] = useState(false); // Dark mode toggle state

    useEffect(() => {
        const fetchHealthCheck = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/health`);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching health check:", error);
            }
        };

        const getCookieValue = async () => {
            try {
                const payload = await getcookie();
                if (payload.isverified) setVerified(true);
                setUser(payload);
            } catch (error) {
                console.error("Error fetching cookie value:", error);
            }
        };

        fetchHealthCheck();
        getCookieValue();
    }, [setUser]);

    const handleProfileClick = () => {
        router.push('/profile');
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage(''); // Clear the input field after sending
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`grid grid-cols-4 h-screen w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            {/* Dark Mode Toggle Button with SVG */}
            <button
                onClick={toggleDarkMode}
                className={`absolute top-4 right-4 p-2 rounded-lg ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-blue-500 text-white'} hover:opacity-80 transition duration-300`}
            >
                {/* Sun and Moon SVG icons for Dark Mode */}
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1m-16 0H3m7.061-7.061l-.707.707M4.93 4.93l.707.707M18.364 4.93l-.707.707M19.071 4.93l-.707.707" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                        <path fill="currentColor" d="M12 3c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 4.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zM12 1c-.553 0-1 .447-1 1v1h-2v1h-2v2h2v1h-1v2h1v-1h1v2h1v-2h1v1h1v-2h-1v-1h2v-2h-2v-1h-2V2h2V1h-1zm0 2h-2v1h2V3zm3 10h-1v2h1v-2zM9 12H8v2h1v-2zm5-2h-1v2h1v-2zM3 9h2V7H3v2zM19 9h2V7h-2v2z" />
                    </svg>
                )}
            </button>

            {/* Contact List */}
            <div className={`col-span-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <ContactList chatname={user} setchatname={setUser} />
            </div>

            {/* Chat Section */}
            <div className="col-span-3 flex flex-col">
                <section className="flex flex-col h-full">
                    {/* Chat Header */}
                    <div className={`p-4 text-center text-lg font-semibold border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
                        {selectedPerson || 'Select a contact'}
                    </div>

                    {/* Chat Messages */}
                    <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        MESSAGES WILL APPEAR HERE
                    </div>

                    {/* Message Input */}
                    <div className={`flex p-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
                        <input 
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        <button 
                            onClick={handleSendMessage}
                            className={`ml-2 px-4 py-2 rounded-lg transition duration-300 ${darkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            Send
                        </button>
                    </div>
                </section>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ChatApp;
