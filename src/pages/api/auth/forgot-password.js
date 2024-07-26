// pages/api/auth/forgot-password.js

import dbConnect from '../lib/mongoose';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import AdminUser from '../models/AdminUser';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email } = req.body;

  await dbConnect();
//   const user = await db.collection('users').findOne({ email });
  const user = await AdminUser.findOne({email})

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Configure the email transport using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Password Reset',
    text: `You requested for a password reset. Please use the following link: ${process.env.NEXTAUTH_URL}/reset-password?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    return res.status(500).json({ message: 'Email could not be sent' });
  }
};

export default handler;
