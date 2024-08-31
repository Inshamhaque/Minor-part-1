import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from "@/zodfile/schema";
import { stat } from "fs";
export async function POST(req : NextRequest){
    const body = await req.json();
    const { mail, password, facultyId, name } = body;
    const OTP = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    //creating a row for the user 
    try{
        //TODO: backend zod implementation for name, password, mail, facultyId etc...
        //check if user already exists or not
        const existing_user = await prisma.user.findFirst({
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
            status : 200
        })
        
    }
    // handling the errors 
    catch(error : any ){
        return NextResponse.json({
            message : error.message,
            status : 500
        })
    }
}