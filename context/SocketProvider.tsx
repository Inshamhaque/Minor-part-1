'use client'
// in this we create a Socket Context and a Socket context provider, we have to implement the send message 
// functionlaity on the socket context porvider, we will wrap this socket context provider in the entire chat part, so that
// the socket can be used efficiently, 
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client'
interface SocketProviderprops{
    children? : React.ReactNode
}
interface ISocketContext{
    sendMessage : (msg : string) => any;
    messages : string[]
}
const SocketContext = React.createContext<ISocketContext|null>(null);
//we create a custom hook to send the context of Socket 
export const useSocket = ()=>{
    const state = useContext(SocketContext);
    if(!state){
        throw new Error('state is undefned');
    }
    return state;
}
export const SocketProvider : React.FC = ( { children } : SocketProviderprops )=>{
    const [socket,setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);

    // this is the send message functionality
    const sendMessage : ISocketContext["sendMessage"] = useCallback((msg : string)=>{
        // emit this to the server
        if(socket){
            console.log('message successfully sent to the server');
            socket.emit('event:messages',{message: msg});
            console.log('message emitted');
        }
        
    },[socket]);
    // this is the receive message functionality 
    const onMessageRec = useCallback((msg:string)=>{
        console.log('message recieved from the server', msg);
        const { message } = JSON.parse(msg) as { message:string }
        setMessages((prev)=>[...prev,message]);
    },[]);
    //everytime this component mounts, a new connection will be established with the exisitng socket.io connection 
    useEffect(()=>{
        const _socket = io('http://localhost:8000');
        _socket.on('message',onMessageRec);
        setSocket(_socket);
        // when this component unmounts, this socket cnnection shoud be removed
        return ()=>{
            _socket.off('message',onMessageRec);
            _socket.disconnect();
            setSocket(undefined);
        }


    },[])

    return(
        <SocketContext.Provider value={{ sendMessage, messages }}> 
            {children}
        </SocketContext.Provider>
    )

}