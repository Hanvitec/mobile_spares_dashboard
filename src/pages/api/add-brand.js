// pages/api/add-brand.js
import dbConnect from "./lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Brand from "./models/Brand";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  console.log('REQ DATA: ', req.body)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    try {
      const { name, url, products } = req.body;
      
      // Check if brand with the same name exists
      const existingBrand = await Brand.findOne({ name }); // Adjust if you have a separate Brand model

      if (existingBrand) {
        res.status(400).json({ message: "Brand already exists." });
        return;
      }

      // Create new brand
      const newBrand = new Brand({
        name,
        url,
        products
      });

      // Save the new brand
      const result = await newBrand.save();

      res.status(201).json({ message: "Brand added successfully", result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server error");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
