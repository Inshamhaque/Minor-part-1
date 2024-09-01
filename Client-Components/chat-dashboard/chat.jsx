import React, { useState } from 'react';
import "./chat.css"

const ChatApp = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const contacts = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5'];

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
            setMessages([...messages, { sender: 'You', text: inputValue }]);
            setInputValue('');
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                AMU Connect
            </header>
        <div className="chat-app">
            <aside className="contacts">
                {contacts.map(contact => (
                    <div className="contact" key={contact} onClick={() => openChat(contact)}>
                        {contact}
                    </div>
                ))}
            </aside>

            <section className="chat-section">
                <div className="chat-header">Chat</div>
                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div key={index}><strong>{msg.sender}:</strong> {msg.text}</div>
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
        <div/>
    </div>
    );
};

export default ChatApp;
