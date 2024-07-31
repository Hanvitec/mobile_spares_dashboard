import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
    quantity: {
      type: Number,
      required: true,
    },
    compatibleBrand: {
      type: String,
      required: true,
    },
    compatibleProduct: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    collection: "product",
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
