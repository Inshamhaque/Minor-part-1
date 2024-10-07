//@ts-nocheck
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
//connecting to redis client
import { Redis } from '@upstash/redis';

// TODO:  try to use this in the process.env ... not working fine 
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
})

export async function POST(req: NextRequest) {
    const { otp } = await req.json();

    try {
        console.log('Received OTP from client: ', otp); // clearer logging
        // console.log('Received f_id from client: ', f); // clearer logging
        const token = req.cookies.get('token')?.value;
        const payload = jwt.decode(token||'');
        //@ts-ignore
        const f_id = payload?.facultyId;

        // Find the user by faculty ID
        // try to retreive from redis 
        //@ts-ignore
        const user = await redis.get(f_id);
        console.log('user from redis is : ' ,user);
        // retreiving the token from the request 
        
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
                
            },{
                status : 404
            });
        }

        // Log the OTP from the database for verification
        //@ts-ignore
        console.log('Stored OTP in database: ', user.verifyOTP); // clearer debugging

        // Verify the OTP (converting both to strings if necessary)
        //@ts-ignore
        if (String(otp) === String(user.verifyOTP)) {
            // Update user verification status
            //update in redis as well... but is it really required
            const userdata = await redis.get(user.facultyId);
            const userObject = JSON.parse(userdata);
            userObject.isverified = true;
            const updateduser = JSON.stringify(userObject);
            await redis.set(user.facultyId,updateduser);
            //update in primary db 
            await prisma.user.update({
                where: {
                    //@ts-ignore
                    facultyId: payload?.facultyId
                },
                data: {
                    isVerified : true 
                }
            });
            

            console.log('User verified successfully'); 
            //reset the cookie with new jwt payload 
            const new_token = jwt.sign({
                //@ts-ignore
                facultyId : payload?.facultyId,
                isverified : true,
                //@ts-ignore
                name : payload?.name
            },process.env.NEXT_PUBLIC_JWT_SECRET||'');

            const response =  NextResponse.json({
                message: "User login successfully",
            },{
                status : 200
            });
            response.cookies.set('token',new_token,{
                path: '/',
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', // true in production, false in development
                maxAge: 60 * 60 
            });
            return response;
            
            
        }

        // If OTP doesn't match
        return NextResponse.json({
            message: 'Invalid OTP',
            status: 400
        });

    } catch (e) {
        console.error('Error occurred:', e); // log the actual error for debugging

        return NextResponse.json({
            message: "Internal server error",
        },{
            status : 500
        });
    }
}
