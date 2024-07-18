import dbConnect from "./lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Product from "./models/Products";

export default async function handler(req, res) {
  // Establish database connection
  await dbConnect();

  // Get the user session
  const session = await getServerSession(req, res, authOptions);

  // Check if the user is logged in
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // Handle GET request
  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      console.log("products", products);
      return res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: "Method not allowed" });
  }
}
