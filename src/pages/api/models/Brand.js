import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    productImageUrl: { type: String, required: true }
  },
);

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    products: [productSchema]
  },
  {
    collection: 'brands',
    timestamps: true
  }
);

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

export default Brand;
    