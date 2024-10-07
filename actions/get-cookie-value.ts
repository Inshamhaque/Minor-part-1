'use server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
export async function getcookie (){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const payload = jwt.decode(token||'');
    return payload;
}