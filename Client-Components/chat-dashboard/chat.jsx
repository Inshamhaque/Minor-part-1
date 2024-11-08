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
    const [message,setmessage] = useState('');
    const { sendMessage } = useSocket();
    const [verified, setVerified] = useState(true); // todo 
    const [user, setUser] = useRecoilState(userState);
    const [selectedPerson, setSelectedPerson] = useState('');

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
                console.log('from recoil:', payload);
            } catch (error) {
                console.error("Error fetching cookie value:", error);
            }
        };

        fetchHealthCheck();
        getCookieValue();
    }, [setUser]);

    const openChat = (person) => {
        setSelectedPerson(person);
        const initialMessages = person === 'Person1'
            ? [
                { sender: 'Person1', text: 'Hello!' },
                { sender: 'You', text: 'Hi!' }
              ]
            : [
                { sender: 'Person2', text: 'How are you?' },
                { sender: 'You', text: 'I am good, thanks!' }
              ];
        setMessages(initialMessages);
    };

    

    const handleProfileClick = () => {
        router.push('/profile');
    };

    return (
        <div className="grid grid-cols-4 h-screen w-screen bg-gray-100 ">
            {/* Contact List */}
            <div className="col-span-1">
                <ContactList chatname={user} setchatname={setUser} />
            </div>

            {/* Chat Section */}
            <div className="col-span-3 flex flex-col">
                <section className="flex flex-col h-full">
                    {/* Chat Header */}
                    <div className="bg-gray-100 p-4 text-center text-lg font-semibold border-b border-gray-300">
                        {selectedPerson || 'Select a contact'}
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-3 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <strong>{msg.sender}:</strong> {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex p-4 bg-gray-100 border-t border-gray-300">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setmessage(e.target.value)} 
                            placeholder="Type your message..." 
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={sendMessage} 
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Send
                        </button>
                    </div>
                </section>
            </div>

            {/* Popup for Verification */}
            {!verified && <PopupCard />}
            <ToastContainer />
        </div>
    );
};

const PopupCard = () => {
    const [mail, setMail] = useState('');
    const [boxVisible, setBoxVisible] = useState(false);
    const [otp, setOtp] = useState(0);

    const onClickHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/send-email`, {
                subject: "Email Verification",
                email: mail,
            });
            if (res) {
                setBoxVisible(true);
                toast.success('Mail sent successfully');
            } else {
                toast.error('Error sending mail');
            }
        } catch (error) {
            toast.error('Some error occurred');
        }
    };

    const verifyButtonHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/verify`, { otp });
            if (res) {
                toast.success('Verification successful');
                window.location.reload();
            } else {
                toast.error('Some error occurred during verification. Try again');
            }
        } catch (error) {
            toast.error('Some unexpected error occurred');
        }
    };

    return (
        <div className="flex flex-col absolute w-screen h-screen justify-center items-center backdrop-blur overflow-hidden">
            <div className="flex flex-col space-y-5 p-10 w-1/3 border rounded-lg border-black">
                <h1 className="text-center font-semibold text-lg">Verify your Mail</h1>
                <input 
                    type="text" 
                    placeholder="Enter your mail" 
                    className="border p-3 w-full" 
                    onChange={(e) => setMail(e.target.value)} 
                />
                <button 
                    onClick={onClickHandler} 
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    Send OTP
                </button>
                {boxVisible && (
                    <div className="flex flex-col space-y-5">
                        <OTPbox setotp={setOtp} />
                        <button 
                            className="bg-blue-500 h-12 rounded-md text-white hover:bg-blue-600" 
                            onClick={verifyButtonHandler}
                        >
                            VERIFY
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
