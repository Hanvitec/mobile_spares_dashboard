// pages/api/upload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dbConnect from './lib/mongoose';
import ImageSchema from './lib/image';
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
    folder: 'your_folder_name', // Optional - folder in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'], // Optional - only allow certain file formats
    resource_type: 'auto', // Optional - use 'auto' to let Cloudinary determine the resource type
  },
});

// Multer instance
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js body parser to let multer handle it
  },
};

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database is connected

  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image to Cloudinary:', err);
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }

      // File uploaded successfully to Cloudinary
      const { path: secure_url } = req.file; // Get the Cloudinary URL
console.log(secure_url)
      // Optionally save `secure_url` into your MongoDB database or perform other operations

      res.status(200).json({ message: 'File uploaded successfully!', url: secure_url });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
