import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';
import { connectToDatabase } from '@/utils/db'; // Ensure the path is correct
import OTPBox from '@/components/otp-box'; // Updated import path

const otpStorage = new Map<string, { otp: string; expiry: number }>();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    // Handle sending OTP
    if (!otp && !newPassword) {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        otpStorage.set(email, { otp: generatedOtp, expiry });

        // Send OTP via email
        try {
            await sendEmail(email, 'Your OTP for Password Reset', `Your OTP is: ${generatedOtp}`);
        } catch (error) {
            return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
        }

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    }

    // Handle OTP verification and password reset
    if (otp && newPassword) {
        const storedOtpData = otpStorage.get(email);
        if (!storedOtpData) {
            return NextResponse.json({ message: 'OTP not found or expired' }, { status: 400 });
        }

        const { otp: storedOtp, expiry } = storedOtpData;
        if (storedOtp !== otp || Date.now() > expiry) {
            return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
        }

        // Connect to database and reset password
        const db = await connectToDatabase();
        const result = await db.collection('users').updateOne(
            { email },
            { $set: { password: newPassword } } // Ensure the password is hashed before saving
        );

        if (!result.modifiedCount) {
            return NextResponse.json({ message: 'Failed to reset password' }, { status: 500 });
        }

        // Clear OTP from storage
        otpStorage.delete(email);

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
}
