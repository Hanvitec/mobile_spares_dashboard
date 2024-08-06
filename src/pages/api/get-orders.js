// pages/api/get-orders.js
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Product from "./models/Products";
import Order from "./models/Order";
import User from "./models/User";
import dbConnect from "./lib/mongoose";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized Access. You need to be logged in." });
    return;
  }

  if (req.method === "GET") {
    await dbConnect();

    try {
      // Fetch orders sorted by latest first
      const orders = await Order.find().sort({ createdAt: -1 });

      // Fetch user and product details manually
      const userIds = [...new Set(orders.map(order => order.user.toString()))];
      const productIds = [...new Set(orders.flatMap(order => order.products.map(product => product.product.toString())))];

      const users = await User.find({ _id: { $in: userIds } }).select('username email userDetails.businessName');
      const products = await Product.find({ _id: { $in: productIds } }).select('productName productDescription retailPrice images');

      // Map users and products to their respective orders
      const userMap = Object.fromEntries(users.map(user => [user._id.toString(), user]));
      const productMap = Object.fromEntries(products.map(product => [product._id.toString(), product]));

      const populatedOrders = orders.map(order => ({
        ...order.toObject(),
        user: userMap[order.user.toString()],
        products: order.products.map(product => ({
          ...product.toObject(),
          product: productMap[product.product.toString()]
        }))
      }));

      res.status(200).json({ orders: populatedOrders });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
}
