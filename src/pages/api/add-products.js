import { getServerSession } from "next-auth";
import dbConnect from "./lib/mongoose";
import Product from "./models/Products";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = getServerSession(req, res, authOptions);
  if (!session) {
    res
      .status(401)
      .json({ message: "You must be logged in to make this request." });
  }
  if (req.method === "POST") {
    await dbConnect();
    console.log('DATA RECEIVED BY API: ', req.body)
    try {
      console.log('Before product validation');
      const existingProduct = await Product.find({
        productCode: req.body.productCode,
      });
      console.log('After product validation', existingProduct);
      if (existingProduct.length !== 0) {
        res.status(400).json({ message: "Product Already exists" });
        return;
      }

      const newProduct = new Product(req.body);
      const result = await newProduct.save();
      res.status(201).json({ message: "Products added successfully" });
    } catch (error) {
      console.error("Error: ", error);
      res
        .status(500)
        .json({ message: "Failed to add Product to the database" });
    }
  }
}
