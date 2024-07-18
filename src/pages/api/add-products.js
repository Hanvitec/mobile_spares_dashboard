import { getServerSession } from "next-auth";
import dbConnect from "./lib/mongoose";
import Product from "./models/Products";
import { authOptions } from "./auth/[...nextauth]";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "E-commerce Website",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js body parser to let multer handle it
  },
};
const handler = async (req, res) => {
  const multerUpload = upload.fields(
    Array.from({ length: 5 }, (_, i) => ({ name: `image${i}`, maxCount: 1 }))
  );

  multerUpload(req, res, async function (err) {
    if (err) {
      console.error("Error uploading images to Cloudinary:", err);
      res.status(500).json({ message: "Error uploading images" });
      return;
    }

    try {
      const dataToSave = JSON.parse(req.body.data);
      const existingProduct = await Product.find({
        productCode: dataToSave.productCode,
      });

      if (existingProduct.length !== 0) {
        res.status(400).json({ message: "Product Already exists" });
        return;
      }

      if (req.files) {
        const imageUrls = Object.values(req.files)
          .flat()
          .map((file) => file.path);
        dataToSave.images = imageUrls;
      }

      const newProduct = new Product(dataToSave);
      const result = await newProduct.save();
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ message: "Error saving product" });
    }
  });
};

export default handler;
