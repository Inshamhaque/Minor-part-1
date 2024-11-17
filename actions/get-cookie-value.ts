'use server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { nullable } from 'zod';
export async function getcookie (){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if(!token){
        console.error("no token is found");
        return null;
    }
    try{
        const payload = jwt.decode(token);
        if(!payload){
            console.error("cookie content not found");
            return null;
        }
        return payload;
    }
    catch(e){
        console.error('some error occurred on the server side : ',e);
    }
}