import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from "@/zodfile/schema";
import { stat } from "fs";
export async function POST(req : NextRequest){
    const body = await req.json();
    const { mail, password, facultyId, name } = body;
    const OTP = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
    //creating a row for the user 
    try{
        //TODO: backend zod implementation for name, password, mail, facultyId etc...
         //check if user already exists or not  
        const existing_user = await prisma.user.findUnique({
            where:{
                facultyId : body.facultyId
            }
        })
        if(existing_user){
            return NextResponse.json({
                message : "user already exists",
                status : 404
        })
        }
        //for new user :-
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data : {
                mail,
                password : hashedPassword,
                facultyId,
                name,
                verifyOTP : OTP
            }
        });
        if(!user){
            return NextResponse.json({
                message : "some error occurred in signing up, try again later",
                status : 404
            })
        }
        return NextResponse.json({
            message : "User created successfully, verification awaited",
            otp : user.verifyOTP,
            facultyId : user.facultyId,
            status : 200
        })
        
    }
    // handling the errors 
    catch(error : any ){
        console.log("Error: ", error);
        return NextResponse.json({
            message : error.message,
            status : 500
        })
    }
}