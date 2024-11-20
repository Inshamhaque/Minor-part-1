"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/useratom";
import { getcookie } from "@/actions/get-cookie-value";

const Profile = () => {
    const [user, setUser] = useRecoilState(userState); 
    const router = useRouter();

    useEffect(() => {
        let isMounted = true; 

        const fetchcookie = async () => {
            try {
                const cookie_user = await getcookie();
                if (isMounted && cookie_user) {
                    setUser({
                        name: cookie_user.name,
                        department: cookie_user.department,
                        facultyId: cookie_user.facultyId,
                        designation: "professor",
                        email: cookie_user.email || "",
                    });
                    console.log("User data retrieved: ", cookie_user);
                } else {
                    console.log("No user data available or token is invalid.");
                }
            } catch (error) {
                console.error("Error fetching cookie: ", error);
            }
        };

        fetchcookie();

        return () => {
            isMounted = false;
        };
    }, []);

    const clickHandler = () => {
        router.push("/dashboard");
    };

    return (
        <div className="w-screen flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full transition-transform transform hover:scale-105">
                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-20 h-20 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-label="User Avatar"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14c3.313 0 6-2.686 6-6s-2.687-6-6-6-6 2.686-6 6 2.687 6 6 6zM6 20c0-4 4-6 6-6s6 2 6 6"
                            />
                        </svg>
                    </div>
                </div>

                {/* User Details */}
                {user ? (
                    <>
                        <h1 className="text-2xl font-semibold text-center text-blue-600">
                            {user.name || "N/A"}
                        </h1>
                        <p className="text-gray-700 text-center text-sm mt-1">
                            {user.email || "No Email Provided"}
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-800 text-center font-medium">
                                Faculty ID:{" "}
                                <span className="font-normal">
                                    {user.facultyId || "N/A"}
                                </span>
                            </p>
                            <p className="text-gray-800 text-center font-medium">
                                Department:{" "}
                                <span className="font-normal">
                                    {user.department || "N/A"}
                                </span>
                            </p>
                            <p className="text-gray-800 text-center font-medium">
                                Designation:{" "}
                                <span className="font-normal">
                                    {user.designation || "N/A"}
                                </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500 text-center mt-4">
                        Loading user details...
                    </div>
                )}

                {/* Return Button */}
                <div className="mt-6">
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={clickHandler}
                    >
                        Return to Chats
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
