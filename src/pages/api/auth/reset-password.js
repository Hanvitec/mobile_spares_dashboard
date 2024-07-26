// pages/api/auth/reset-password.js
import dbConnect from "../lib/mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { token, password } = req.body;

  let email;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    email = decoded.email;
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  await dbConnect();
  // const user = await db.collection('users').findOne({ email });
  const user = await AdminUser.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // await db.collection('users').updateOne({ email }, { $set: { password: hashedPassword } });
  await AdminUser.updateOne({ email }, { $set: { password: hashedPassword } });

  return res.status(200).json({ message: "Password reset successful" });
};

export default handler;
