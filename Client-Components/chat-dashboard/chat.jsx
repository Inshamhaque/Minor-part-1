'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/useratom';
import { ContactList } from './contactlist';
import { useSocket } from '@/context/SocketProvider'; 
import 'react-toastify/dist/ReactToastify.css';
import { getcookie } from '@/actions/get-cookie-value';

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const { sendMessage, messages } = useSocket(); 
    const [chatname, setchatname] = useState('');
    const setUser = useSetRecoilState(userState);

    const user = useRecoilValue(userState); 

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getcookie();
                if (userData) {
                    setUser({
                        name: userData.name,
                        department: userData.department,
                        facultyId: userData.facultyId,
                        designation: "professor",
                        email: userData.email || "",
                    });
                    console.log('User data retrieved: ', userData);
                } else {
                    console.log("No user data available or token is invalid.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [setUser]);

    // Log messages for debugging
    useEffect(() => {
        console.log('Messages:', messages);
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = () => {
        if (message.trim()) {
            const formattedMessage = `${user.name}:${message.trim()}`; // Format message with sender's name
            sendMessage(formattedMessage);
            setMessage('');
        } else {
            toast.warning("Message can't be empty");
        }
    };

    // Auto scroll to the bottom when new messages are added
    useEffect(() => {
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    // Fallback if user data is not available yet
    if (!user?.name) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="grid grid-cols-4 h-screen w-screen">
            <ContactList chatname={chatname} setchatname={setchatname} />
            
                <div className="col-span-3 flex flex-col">
                    <div className="bg-gray-100 p-4 text-lg font-semibold border-b">
                        {chatname || 'Select a contact'}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto bg-white space-y-2">
                        {messages.map((msg, index) => {
                            const [sender, ...textParts] = msg.includes(':') ? msg.split(':') : [null, msg];
                            const text = textParts.join(':'); // Handle cases where ':' appears in the message text
                            const isCurrentUser = sender === user.name;

                            return (
                                <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-xs p-3 rounded-lg ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        {!isCurrentUser && (
                                            <div className="text-sm font-semibold mb-1">{sender}</div>
                                        )}
                                        <div>{text.trim()}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 bg-gray-100 border-t flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-lg"
                            aria-label="Message input"
                        />
                        <button
                            onClick={handleSendMessage}
                            aria-label="Send message"
                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            
            
            <ToastContainer />
        </div>
    );
};

export default ChatApp;
