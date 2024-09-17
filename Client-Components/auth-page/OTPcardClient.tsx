'use client'
import { OTPbox } from "@/components/OTPbox";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const OTPcard = () => {
    const [time, setTime] = useState<number>(60);
    const inputRefs = useRef<HTMLDivElement[]>([]);
    // mounts everytime the time is changed
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [time]);

    const notify = ()=>{
        return toast.info('Email sent again successfully',{
            position: 'top-right',
            autoClose : 5000
        })
    }
    // when user click in try again part 
    const resendEmailHandler = ()=>{
        setTime(60);
        notify();
    }

    return (
        <div className="  h-screen flex justify-center items-center bg-gray-200">
            <div className="flex flex-col border rounded-lg border-gray-500 shadow-md bg-white p-10 gap-y-5">
                {/* the header of card */}
                <div className="text-2xl font-semibold text-center ">Enter OTP</div>
                {/* hero section */}
                <div className="text-sm text-slate-600 text-center">
                    We have sent an OTP on your registered mail id 
                </div>
                <div>
                    < OTPbox />
                </div>
                <div className= {` text-sm text-center text-slate-700  hover:cursor-pointer ${time==0? 'hover:text-blue-500 hover:underline hover:underline-offset-1' : null}` }
                    onClick={()=>resendEmailHandler()}
                >
                    Try again in {time>=10?`00:00:${time}`: `00:00:0${time}`}
                </div>
                <button className="bg-blue-500 h-12 rounded-md text-white hover:bg-blue-600">
                    VERIFY
                </button>
                < ToastContainer />

            </div>
        </div>
    );
};
