import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    businessPrice: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    compatibleBrand: {
      type: String,
      required: true,
    },
    compatibleProduct: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store the image URL or path
      default: null,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: 'product',
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
