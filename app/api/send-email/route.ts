// app/api/send-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
//connecting to redis client
import { Redis } from '@upstash/redis';
import jwt from 'jsonwebtoken'

// TODO:  try to use this in the process.env ... not working fine 
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
})
export async function POST(req: NextRequest) {
    try {
        console.log('just entered the API')// initial debug statement
        // Parse the JSON body from the NextRequest object
        const { email, subject} = await req.json();
        const token = req.cookies.get('token')?.value;
        //decoding the token 
        const payload =  jwt.decode(token||'');
        //@ts-ignore
        console.log('faculty id is : ',payload.facultyId);

        // Basic input validation
        if (!email || !subject ) {
            return NextResponse.json({ error: 'Please provide all the required fields.' }, { status: 400 });
        }
 
        // Create a transporter using your SMTP credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or another email provider like SMTP
            auth: {
                user: process.env.SMTP_USER, // Your SMTP username (Gmail or other)
                pass: process.env.SMTP_PASS, // Your SMTP password (Gmail or other)
            },
        });    
        //@ts-ignore
        const data  = await redis.get(payload.facultyId);
        //@ts-ignore
        const otp = data?.verifyotp;
        //@ts-ignore
        const name = data?.name;
         
        // Send the email using nodemailer
        await transporter.sendMail({
            from: process.env.SMTP_USER, // Sender's email address
            to: email,                    // Recipient's email address
            subject: subject,              // Subject of the email
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>OTP Verification</h2>
                    <p>Hi,</p>
                    <h1 style = "font-weight:bold">${name}</h1>
                    <p>Please use the following One-Time Password (OTP) to verify your email:</p>
                    <div style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
                        ${otp}
                    </div>
                    <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Thank you for using our service!</p>
                    <div style="margin-top: 20px; font-size: 12px; color: #888;">
                        <p>If you’re having trouble, contact our support team at <a href="mailto:support@calsync.com" style="color: #4CAF50; text-decoration: none;">support@calsync.com</a>.</p>
                    </div>
                </div>
            `
        });

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
