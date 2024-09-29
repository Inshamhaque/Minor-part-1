'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './chat.css';

const ChatApp = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
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

    return (
        <div className="app-container">
            <div className="chat-app">
                <aside className="contacts">
                    {contacts.map(contact => (
                        <div 
                            className="contact" 
                            key={contact} 
                            onClick={() => openChat(contact)}
                        >
                            {contact}
                        </div>
                    ))}
                </aside>

                <section className="chat-section">
                    <div className="chat-header">{selectedPerson ? `Chat with ${selectedPerson}` : 'Select a contact'}</div>
                    <div className="chat-window">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'You' ? 'message sent' : 'message received'}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder="Type your message..." 
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChatApp;
