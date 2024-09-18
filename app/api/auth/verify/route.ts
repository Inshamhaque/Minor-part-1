import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { f_id,otp } = await req.json();
    try{
        const res = await prisma.user.findFirst({
            where : {
                facultyId : f_id
            }
        })
        // verifying the otp
        if(otp==res?.verifyOTP){
            const update = await prisma.user.update({
                where :{
                    facultyId : f_id
                },
                data :{
                    is_verified : true
                }
            })
            return NextResponse.json({
                message : "User verified successfully",
                status : 200
            })
        }
        //user not found 
        else{
            return NextResponse.json({
                message : "user not found",
                status : 404
            })
        }

    }
    catch(e){
        // some error occurred
        return NextResponse.json({
            message : "Some error occurred", 
            status : 500
        })
    }

}