import { getServerSession } from "next-auth";
import dbConnect from "./lib/mongoose";
import User from "./models/User";
import { authOptions } from "./auth/[...nextauth]";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res
      .status(401)
      .json({ message: "Unauthorized access. You need to be logged in" });
    return;
  }

  if (req.method === "POST") {
    try {
      await dbConnect();
      const { userId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      user.isValidated = !user.isValidated;

      await user.save();

      // Send email notification
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any email service
        auth: {
          user: process.env.EMAIL_USERNAME, // Your email
          pass: process.env.EMAIL_PASSWORD, // Your email password
        },
      });

      const emailContent = user.isValidated
        ? `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Congratulations, ${user.username}!</h2>
            <p style="font-size: 16px;">
              We are thrilled to inform you that your account has been <strong>approved</strong>! 
              You now have full access to all the exclusive features of our platform.
            </p>
            <p style="font-size: 16px;">
              Welcome aboard! We're excited to have you with us.
            </p>
            <p style="font-size: 16px;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            <p style="font-size: 16px; margin-top: 20px;">
              Cheers,<br/>
              The Team
            </p>
          </div>`
        : `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #f44336;">Hello, ${user.username}</h2>
            <p style="font-size: 16px;">
              We regret to inform you that your account has been <strong>rejected</strong> at this time.
            </p>
            <p style="font-size: 16px;">
              Please don't hesitate to get in touch with our support team if you have any questions or need further assistance.
            </p>
            <p style="font-size: 16px; margin-top: 20px;">
              Sincerely,<br/>
              The Team
            </p>
          </div>`;


      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: user.isValidated ? '🎉 Account Approved!' : '❌ Account Rejected',
        html: emailContent,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email: ', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({ message: "Approval Toggled Successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
}
