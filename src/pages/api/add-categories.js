// pages/api/register.js
import bcrypt from "bcrypt";
import Categories from "./models/Categories";
import dbConnect from "./lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    try {
      const { name, subcategories } = req.body;

      // Check if category with the same name exists
      const existingCategory = await Categories.findOne({ name });

      if (existingCategory) {
        res.status(400).json({ message: "Categories already exists." });
        return;
      }

      // Create new category
      const newCategory = new Categories({
        name,
        subcategories
      });

      // Save the new category
      const result = await newCategory.save();

      res.status(201).json({ message: "Categories added successfully", result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server error");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
