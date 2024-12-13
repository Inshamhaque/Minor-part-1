'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
    joinChannel: (channel: string) => void;
    sendMessage: (channel: string, msg: string) => void;
    messages: Record<string, string[]>;
}

interface SocketProviderProps {
    children?: React.ReactNode;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('SocketContext must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Record<string, string[]>>({});

    const joinChannel = useCallback(
        (channel: string) => {
            if (socket) {
                console.log(`Joining channel: ${channel}`);
                socket.emit('join-channel', channel);
            }
        },
        [socket]
    );

    const sendMessage = useCallback(
        (channel: string, msg: string) => {
            if (socket) {
                socket.emit('event:messages', { channel, message: msg });
            }
        },
        [socket]
    );

    const onMessageReceive = useCallback(
        (channel: string, msg: string) => {
            console.log(`Message received on channel [${channel}]: ${msg}`);
            setMessages((prev) => ({
                ...prev,
                [channel]: [...(prev[channel] || []), msg],
            }));
        },
        []
    );

    // Receive initial messages when joining a channel
    const onInitialMessagesReceive = useCallback(
        (channel: string, receivedMessages: string[]) => {
            console.log(`Initial messages for channel [${channel}]:`, receivedMessages);
            setMessages((prev) => ({
                ...prev,
                [channel]: receivedMessages,
            }));
        },
        []
    );

    useEffect(() => {
        const _socket = io('http://localhost:8000');
        setSocket(_socket);

        _socket.on('message', ({ channel, message }) => {
            onMessageReceive(channel, message);
        });

        _socket.on('initial-messages', ({ channel, messages }) => {
            onInitialMessagesReceive(channel, messages);
        });

        return () => {
            _socket.disconnect();
            setSocket(null);
        };
    }, [onMessageReceive, onInitialMessagesReceive]);

    return (
        <SocketContext.Provider value={{ joinChannel, sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    );
};
