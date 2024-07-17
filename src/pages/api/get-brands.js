// // pages/api/get-brand.js
import dbConnect from "./lib/mongoose";
import Brand from "./models/Brand";
// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'GET') {
//     try {
//       const brands = await Brand.find({});
//       res.status(200).json({ brands });
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// pages/api/get-brand.js
// pages/api/get-brand.js
// import dbConnect from "../../lib/mongoose";
// import Brand from "../../models/Brand";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const brands = await Brand.find({});
      res.status(200).json({ brands });
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "PUT") {
    const brandQuery = req.query.brand;
    console.log("Brand Query", brandQuery);
    const { name, url, products } = req.body;

    try {
      const updatedBrand = await Brand.findByIdAndUpdate(
        brandQuery,
        { name, url, products },
        { new: true }
      );

      if (!updatedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }

      res
        .status(200)
        .json({ message: "Brand updated successfully", updatedBrand });
    } catch (error) {
      console.error("Error updating brand:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
