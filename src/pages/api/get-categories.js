// pages/api/update-category.js
import dbConnect from "./lib/mongoose";
import Categories from "./models/Categories";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  await dbConnect();

  if (req.method === "GET") {
    try {
      const categories = await Categories.find({});
      res.status(200).json({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    const { id, name, subcategories } = req.body;

    try {
      const updatedCategory = await Categories.findByIdAndUpdate(
        id,
        { name, subcategories },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res
        .status(200)
        .json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
