import { getServerSession } from "next-auth";
import dbConnect from "./lib/mongoose";
import User from "./models/User";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res){
    const session = getServerSession(req, res, authOptions);
    if(!session){
        res.status(401).json({message: 'You need to be signed in.'})
    }
    try {
        await dbConnect();
        const users = await User.find({});
        console.log('Users From DB: ', users);
        res.status(200).json({message: 'Users Fetched!', users})
    } catch (error) {
        console.log("Internal Server Error: ", error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}