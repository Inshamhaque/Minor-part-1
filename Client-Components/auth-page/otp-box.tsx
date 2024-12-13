'use client';

import React, { useState } from 'react';
import axios from 'axios';

const OTPBox: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const handleSendOTP = async () => {
        try {
            const response = await axios.post(`${base_url}/api/auth/forgot`, { email }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert('OTP sent to your email');
                setStep(2);
            } else {
                alert('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post(`${base_url}/api/auth/forgot`, { email, otp }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert('OTP verified successfully');
                setStep(3);
            } else {
                alert('Invalid or expired OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Invalid or expired OTP');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4 text-center">Enter Email</h2>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-center"
                            placeholder="email@amu.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            onClick={handleSendOTP}
                        >
                            Send OTP
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4 text-center">Enter OTP</h2>
                        <input
                            type="text"
                            maxLength={6}
                            className="w-full border border-gray-300 rounded px-4 py-2 text-center"
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            onClick={handleVerifyOTP}
                        >
                            Verify OTP
                        </button>
                    </>
                )}
                {step === 3 && <h2 className="text-lg font-semibold text-center">Password reset complete!</h2>}
            </div>
        </div>
    );
};

export default OTPBox;
