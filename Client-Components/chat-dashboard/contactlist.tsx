'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/useratom";
import { useRouter } from "next/navigation";
import { getcookie } from "@/actions/get-cookie-value";

// Function to generate a consistent, sorted channel name for private chats
const generatePrivateChatName = (user1Id: string, user2Id: string) => {
    // Sort the IDs so the channel name is consistent regardless of who initiates the chat
    const sortedIds = [user1Id, user2Id].sort();
    return `chat-${sortedIds[0]}-${sortedIds[1]}`;
};

export const ContactList = ({
    chatname,
    setchatname,
}: {
    chatname: string;
    setchatname: (chat: string) => void;
}) => {
    const user = useRecoilValue(userState);  // Ensure that this returns the correct user state
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const department = user?.department || 'General';
    const [f_id, setf_id] = useState<string>();

    // Fetch user data only if necessary (if you really want to use getcookie)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getcookie();
                setf_id(userData.facultyId);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [setUser]); // Empty dependency to run once, ensure user is fetched correctly

    // Fetch contacts from the API based on the department
    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`/api/contacts`, {
                    params: { department },
                });

                // Check if the response contains contactList
                const contactList = response?.data?.contactList;
                if (Array.isArray(contactList)) {
                    const sanitizedContacts = contactList
                        .map((contact: any) => contact.facultyId)
                        .filter((facultyId: string) => facultyId !== f_id);  // Filter out the logged-in user
                    setContacts(sanitizedContacts);
                } else {
                    setContacts([]);
                }
            } catch (err) {
                console.error("Error fetching contacts:", err);
                setError("Failed to fetch contacts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchContacts();
        }
    }, [department, f_id]);  // Ensure re-fetch when department or user.facultyId changes

    const handleChatSelection = (chat: string) => {
        setchatname(chat);
    };

    // Handle private chat selection
    const handlePrivateChatSelection = (contact: string) => {
        // Generate a unique chat name for the selected contact
        const privateChatName = generatePrivateChatName(user.facultyId, contact);
        setchatname(privateChatName);  // Set the selected private chat
    };

    const handleLogout = () => {
        setUser(null);
        router.push("/auth/login");
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="bg-slate-100 flex flex-col border-r border-gray-300 h-screen shadow-md">
            {/* Top Section */}
            <div className="p-4">
                <div className="text-2xl font-bold text-center text-blue-600 mb-4">
                    AMU Connect
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Contacts..."
                        className="w-full p-2 pl-10 rounded-lg border bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M9 3a6 6 0 100 12 6 6 0 000-12zM9 1a8 8 0 11.001 16.001A8 8 0 019 1zm6.707 12.293a1 1 0 011.414 1.414l-2.828 2.828a1 1 0 01-1.414-1.414l2.828-2.828z"
                            fill="#6b7280"
                        />
                    </svg>
                </div>
            </div>

            {/* Scrollable Contacts List */}
            <div className="flex-grow overflow-y-auto px-4 space-y-3">
                <div className="text-xl font-semibold text-gray-800">Chats</div>

                {/* Static Chat Options */}
                <div
                    className={`hover:bg-gray-100 rounded-lg p-3 cursor-pointer ${
                        chatname === "University Announcements" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleChatSelection("University Announcements")}
                >
                    University Announcements
                </div>
                <div
                    className={`hover:bg-gray-100 rounded-lg p-3 cursor-pointer ${
                        chatname === department ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleChatSelection(department)}
                >
                    {department}
                </div>

                {/* Dynamic Contacts */}
                <div className="p-2">
                    <h1 className="text-slate-600">Frequently Contacted</h1>
                    {loading ? (
                        <div className="text-gray-500">Loading contacts...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : filteredContacts.length > 0 ? (
                        filteredContacts.map((contact, index) => (
                            <div
                                key={index}
                                className={`hover:bg-slate-200 rounded-lg p-1 cursor-pointer ${
                                    chatname === contact ? "bg-blue-100" : ""
                                }`}
                                onClick={() => handlePrivateChatSelection(contact)}  // Handle private chat selection
                            >
                                {contact}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No contacts found</div>
                    )}
                </div>
            </div>

            {/* Profile Section at Bottom */}
            <div
                className="border-t border-gray-300 p-4 flex items-center space-x-4 bg-white hover:cursor-pointer"
                onClick={() => {
                    router.push('/dashboard/profile');
                }}
            >
                <div className="relative">
                    <img
                        src={user?.profilePicture || "/default-profile.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border shadow"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-grow">
                    <div className="text-lg font-semibold text-gray-800">
                        {user?.name || "User Name"}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email || "user@example.com"}</div>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm font-medium hover:underline"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};
