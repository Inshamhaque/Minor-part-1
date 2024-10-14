//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import client from '@/prisma/index'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
//connecting to redis client
import { Redis } from '@upstash/redis';

// TODO:  try to use this in the process.env ... not working fine 
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
})
export async function POST(req:NextRequest){
    const { facultyId, password } = await req.json();
    try{
        // first check in redis 
        var redis_flag = 1;
        var existing_user = await redis.get(facultyId);
        // console.log('from redis : ',existing_user.isVerified);
        if(!existing_user){
            existing_user = await client.user.findUnique({
                where : {
                    facultyId : facultyId
                }
            }) 
            redis_flag  = 0;
            var dbPassword = existing_user?.password;
        }
        //@ts-ignore 
        var dbPassword  = existing_user?.password;
        if(!existing_user){
            return NextResponse.json({
                msg : "Damn , user does not exists"
            },{
                status : 401
            })
        }
        const success = await bcrypt.compare(password,dbPassword || "");
        if(!success){
            return NextResponse.json({
                message : "Incorrect password",
            },{
                status : 404
            })
        }
        if(redis_flag==0){
            await redis.set(facultyId,{
                mail : "",
                password : dbPassword,
                //@ts-ignore
                name : existing_user?.name,
                //@ts-ignore
                verifyOTP : existing_user?.verifyOTP,
                isVerified : existing_user?.isVerified,
                department : existing_user?.department,
            })
        }
        const token = jwt.sign({
            //@ts-ignore
            facultyId : facultyId,
            //@ts-ignore
            name : existing_user.name,
            //@ts-ignore
            isverified : existing_user.isVerified,
            department : existing_user.department
        },process.env.NEXT_PUBLIC_JWT_SECRET || "");

        const response =  NextResponse.json({
            message: "User login successfully",
        },{
            status : 200
        });
        response.cookies.set('token',token,{
            path: '/',
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // true in production, false in development
            maxAge: 60 * 60 
        });
        return response;
    

    }
    catch(e){
        console.log('some error occurred '+e);
        return NextResponse.json({
            message : "some error occurred"
        },{
            status : 500
        })
    }
}