import dbConnect from "./lib/mongoose";
import Categories from "./models/Categories";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in" });
    return;
  }

  if (req.method === "GET") {
    await dbConnect();

    try {
      const categoriesFromDb = await Categories.find({});
      res
        .status(201)
        .json({
          message: "Categories fetched and sent as respose",
          categoriesFromDb,
        });
    } catch (error) {
      console.log("Error fetching Dropdown Details: ", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
