// pages/api/delete-brand.js

import dbConnect from "./lib/mongoose";
import Brand from "./models/Brand";

 // Connect to MongoDB

export default async function handler(req, res) {
  const { brand } = req.query; // Assuming brand is the _id of the brand to delete
  await dbConnect();
  
  try {
    // Validate input
    if (!brand) {
      return res.status(400).json({ error: 'Brand ID not provided' });
    }

    // Find the brand by _id and delete
    const deletedBrand = await Brand.findByIdAndDelete(brand);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    return res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
