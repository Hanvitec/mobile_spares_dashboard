import dbConnect from "./lib/mongoose";
import Categories from "./models/Categories";
// Connect to MongoDB

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body; // Assuming id is the _id of the category to delete
  await dbConnect();
  
  try {
    // Validate input
    if (!id) {
      return res.status(400).json({ error: 'Category ID not provided' });
    }

    // Find the category by _id and delete
    const deletedCategories = await Categories.findByIdAndDelete(id);

    if (!deletedCategories) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
