'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/useratom';
import { ContactList } from './contactlist';
import { useSocket } from '@/context/SocketProvider'; 
import { getcookie } from '@/actions/get-cookie-value';
import 'react-toastify/dist/ReactToastify.css';

// Function to generate a consistent, sorted channel name
const generateChannelName = (user1Id, user2Id) => {
    // Sort the IDs so the order doesn't matter
    const sortedIds = [user1Id, user2Id].sort();
    return `chat-${sortedIds[0]}-${sortedIds[1]}`;
};

const ChatApp = () => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [channel, setChannel] = useState('general'); // Default channel
    const { joinChannel, sendMessage, messages } = useSocket();
    const setUser = useSetRecoilState(userState);
    const user = useRecoilValue(userState);

    // Fetch and set user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getcookie();
                if (userData) {
                    setUser({
                        name: userData.name,
                        department: userData.department,
                        facultyId: userData.facultyId,
                        designation: 'professor',
                        email: userData.email || '',
                    });
                } else {
                    console.log('No user data available or token is invalid.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Join a specific channel whenever the channel changes
    useEffect(() => {
        joinChannel(channel);
    }, [channel, joinChannel]);

    // Handle sending a message
    const handleSendMessage = () => {
        if (message.trim()) {
            const formattedMessage = `${user.name}:${message.trim()}`; // Format message with sender's name
            sendMessage(channel, formattedMessage);
            setMessage('');
        } else {
            toast.warning("Message can't be empty");
        }
    };

    // Function to handle chat selection (for personal chats)
    const handlePrivateChatSelection = (contact) => {
        // Generate a unique channel name for the private chat
        const channelName = generateChannelName(user.facultyId, contact);
        setChannel(channelName);
    };

    return (
        <div className="grid grid-cols-4 h-screen w-screen">
            <ContactList chatname={channel} setchatname={setChannel} handlePrivateChatSelection={handlePrivateChatSelection} />
            <div className="col-span-3 flex flex-col">
                {/* Channel Header */}
                <div className="bg-gray-100 p-4 text-lg font-semibold border-b">
                    {channel.charAt(0).toUpperCase() + channel.slice(1) || 'Select a contact'}
                </div>
                {/* Messages Section */}
                <div
                    className="flex-1 p-4 overflow-y-auto bg-white space-y-2"
                    style={{ maxHeight: 'calc(100vh - 150px)' }}
                >
                    {channel === 'general' ? (
                        <div className="flex items-center justify-center h-full text-gray-600">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-2">Welcome to General Channel</h1>
                                <p className="text-gray-500">
                                    Here, you can find general updates and announcements.
                                </p>
                            </div>
                        </div>
                    ) : (
                        (messages[channel] || []).map((msg, index) => {
                            const [sender, ...textParts] = msg.split(':');
                            const text = textParts.join(':');
                            const isCurrentUser = sender === user.name;
                            return (
                                <div
                                    key={index}
                                    className={`flex ${
                                        isCurrentUser ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs p-3 rounded-lg ${
                                            isCurrentUser
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {!isCurrentUser && (
                                            <div className="text-sm font-semibold mb-1">{sender}</div>
                                        )}
                                        <div>{text.trim()}</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                {/* Input Field */}
                {channel !== 'general' && (
                    <div className="p-4 bg-gray-100 border-t flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-md"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChatApp;
