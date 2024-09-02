'use client'
import { useEffect, useState } from "react";
export const OTPcard = () => {
    const [time,setTime] = useState<number>(60);
    useEffect(()=>{
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);
        return ()=>{
            clearInterval(timer)
        }
    },[])
    return (
        <div className="bg-gray-200 flex flex-col items-center justify-center h-screen w-full">
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md text-gray-700">
                <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
                <p className="text-gray-600 text-center mb-4">Code sent to your mail</p>
                <div className="grid grid-cols-5 gap-x-4 my-2">
                    <div contentEditable="true" className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-400">1</span>
                    </div>
                    <div contentEditable="true" className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-400">9</span>
                    </div>
                    <div contentEditable="true" className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-400">6</span>
                    </div>
                    <div contentEditable="true" className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-400">4</span>
                    </div>
                    <div contentEditable="true" className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-400">3</span>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-between mb-6">
                    <p className="text-gray-600 text-sm">Didn't receive code?</p>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-blue-500">Request Again {time>=10?("00:00:"):("00:00:0")}{time} </button>
                    </div>
                </div>
                <button className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Verify</button>
            </div>
        </div>
    )
}
