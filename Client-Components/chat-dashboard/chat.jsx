'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './chat.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OTPbox } from '@/components/OTPbox';
import { getcookie } from '@/actions/get-cookie-value';
// import { useCookies } from 'next-client-cookies'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ChatApp = () => {
    const router = useRouter();
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [verified,setverified] = useState(0);

    
    const contacts = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5'];

    // Fetching health check on mount
    useEffect(() => {
        const fetchHealthCheck = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/health');
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching health check:", error);
            }
        };
        fetchHealthCheck();
        const get_cookie_value = async()=>{
            const payload = await getcookie();
            if(payload.isverified){
                return setverified(true);
            }
            return setverified(false);
        }
        get_cookie_value();
        

        // window.location.reload(false);
    }, []);

    const openChat = (person) => {
        setSelectedPerson(person);
        let initialMessages = [];
        if (person === 'Person1') {
            initialMessages = [
                { sender: 'Person1', text: 'Hello!' },
                { sender: 'You', text: 'Hi!' }
            ];
        } else if (person === 'Person2') {
            initialMessages = [
                { sender: 'Person2', text: 'How are you?' },
                { sender: 'You', text: 'I am good, thanks!' }
            ];
        }
        setMessages(initialMessages);
    };

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, { sender: 'You', text: inputValue }]);
            setInputValue('');
        }
    };

    const handleProfileClick = () => {
        router.push('/profile')
    }

    return (
        <div className="flex flex-col h-screen max-w-screen bg-gray-100">
            <div className="flex flex-row h-full shadow-lg">
                {/* Contacts Sidebar */}
                <aside className="w-1/4 bg-white border-r border-gray-300 p-4">
                    {/* Sidebar Header */}
                    <div className="text-2xl font-bold text-center text-blue-600 mb-4 flex items-center justify-center">
                        AMU Connect 
                    </div>

                    {/* make this one scrollable so that more contacts can be added */}
                    <div className=''>
                        <div className="flex justify-between items-center mb-4">
                        <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer" onClick = {handleProfileClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12c-3.866 0-7 3.134-7 7a1 1 0 1 0 2 0c0-2.761 2.239-5 5-5s5 2.239 5 5a1 1 0 1 0 2 0c0-3.866-3.134-7-7-7Z"/>
                            </svg>
                        </div>
                            <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
                            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                                </svg>
                            </div>
                        </div>
                        {contacts.map(contact => (
                            <div 
                                key={contact} 
                                onClick={() => openChat(contact)}
                                className="p-4 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition duration-300"
                            >
                                {contact}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Section */}
                <section className="w-3/4 flex flex-col h-screen overflow-hidden">
                    <div className="bg-gray-100 p-4 text-center text-lg font-semibold border-b border-gray-300">
                        {selectedPerson ? `Chat with ${selectedPerson}` : 'Select a contact'}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-3 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <strong>{msg.sender}:</strong> {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex p-4 bg-gray-100 border-t border-gray-300">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
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
            {!verified?
                < Popupcard />
            :null}
        </div>
    );
};
const Popupcard = () => {
    const [mail,setmail] = useState('');
    const [boxvisible,setboxvisible] = useState(false);
    const [otp,setotp]  = useState(0);
    const onClickHandler = async(e)=>{
        try{
            const res = await axios.post(`${BASE_URL}/api/send-email`,{
                subject : "Email Verification",
                email : mail,

            })
            if(!res){
                return toast.error('Error sending mail');
            }
            setboxvisible(true);
            return toast.success('Mail sent successfully');

        }
        catch(e){
            return toast.error('some error occurred');
        }
    }
    const verifyButtonHandler = async()=>{
        try{
            const res = await axios.post(`${BASE_URL}/api/auth/verify`,{
                otp
            })
            if(!res){
                return toast.error('some error while verification, try again');
            }
            toast.success('Verification successfull');
            window.location.reload(false);
            return;
        }
        catch(e){
            console.log('there was some error : ',e);
            return toast.error('Some unexpected error occurred.');
        }
    }
    return(
        <div className='flex flex-col absolute w-screen h-screen flex justify-center items-center backdrop-blur overflow-hidden'>
            <div className='flex flex-col space-y-5 p-10 w-1/3 border rounded-lg border-black'>
                <h1 className='text-center font-semibold text-lg w-full'>Verify your Mail</h1>
                <input type="text" placeholder='Enter your mail' className='border p-3 w-full' onChange={(e)=>{
                    setmail(e.target.value);
                }} />
                <button onClick={(e)=>{onClickHandler(e)}}  className='bg-blue-500 border rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full p-3'>Send OTP</button>
                {boxvisible && 
                <div className='flex-col space-y-5 justify-center items-center'>
                     <OTPbox setotp={setotp} />
                     <button className="bg-blue-500 h-12 rounded-md text-white hover:bg-blue-600"
                    onClick={verifyButtonHandler}
                    >
                        VERIFY
                    </button>
                </div>}
            </div>
            
            < ToastContainer />
        </div>
    )
}
export default ChatApp;
