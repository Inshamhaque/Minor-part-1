import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
}
