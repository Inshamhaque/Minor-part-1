import React, { useState } from 'react';
import './forgot.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const handleSendOtp = async () => {
        try {
            const response = await axios.post(`${base_url}/api/auth/forgot`, { email });
            if (response.status === 200) {
                toast.success('OTP sent to your email');
                setStep(2);
            }
        } catch (error) {
            toast.error('Failed to send OTP');
        }
    };

    const handleVerifyOtpAndResetPassword = async () => {
        try {
            const response = await axios.post(`${base_url}/api/auth/forgot`, { email, otp, newPassword });
            if (response.status === 200) {
                toast.success('Password reset successfully');
                router.push('/login');
            }
        } catch (error) {
            toast.error('Failed to reset password');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-content">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-semibold">Enter Email</h2>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="email@amu.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleSendOtp} className="btn">Send OTP</button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold">Enter OTP</h2>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleVerifyOtpAndResetPassword} className="btn">Verify OTP and Reset Password</button>
                    </>
                )}
                {step === 3 && <h2 className="text-lg font-semibold">Password reset complete!</h2>}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
