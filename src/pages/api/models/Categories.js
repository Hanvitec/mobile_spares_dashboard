// Categories database schema

import mongoose from 'mongoose';

const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    subcategories: [{ type: String }],
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

const Categories = mongoose.models.Categories|| mongoose.model('Categories', categoriesSchema);

export default Categories;
