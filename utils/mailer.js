import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    service: 'gmail', // or 'hotmail', 'yahoo', or use `host` and `port`
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendSignUpEmail = async (email, token) => {
    const url = `${process.env.CLIENT_URL}/user/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `
        <h3>Hello!</h3>
        <p>Thank you for signing up.</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${url}" style="color: blue;">Verify Email</a>
        <p>If you didn’t request this, ignore this email.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Signup email sent to', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
