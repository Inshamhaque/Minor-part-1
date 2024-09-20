import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { f_id, otp } = await req.json();

    try {
        console.log('Received OTP from client: ', otp); // clearer logging
        console.log('Received f_id from client: ', f_id); // clearer logging

        // Find the user by faculty ID
        const res = await prisma.user.findFirst({
            where: {
                facultyId: f_id
            }
        });

        if (!res) {
            return NextResponse.json({
                message: 'User not found',
                status: 404
            });
        }

        // Log the OTP from the database for verification
        console.log('Stored OTP in database: ', res.verifyOTP); // clearer debugging

        // Verify the OTP (converting both to strings if necessary)
        if (String(otp) === String(res.verifyOTP)) {
            // Update user verification status
            await prisma.user.update({
                where: {
                    facultyId: f_id
                },
                data: {
                    is_verified: true
                }
            });

            console.log('User verified successfully'); // logging success

            return NextResponse.json({
                message: "User verified successfully",
                status: 200
            });
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
            status: 500
        });
    }
}
