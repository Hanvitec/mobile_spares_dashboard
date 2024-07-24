import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define schema for delivery address
const addressSchema = new Schema({
  _id: Schema.Types.ObjectId,
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  country: { type: String, required: true }
});

// Define schema for order items with delivery address
const orderItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  deliveryAddress: { type: addressSchema, required: true }
});

// Define schema for cart items
const cartItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

// Define schema for wishlist items
const wishlistItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  // categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

// Define schema for user details
const userDetailsSchema = new Schema({
  businessName: { type: String },
  name: { type: String },
  mobileNo: { type: String, required: true },
  GSTIN: { type: String },
  permanentAddress: { type: addressSchema, required: true }
}, { _id: false });

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['Business', 'Individual'], required: true },
  userDetails: { type: userDetailsSchema, required: true },
  orderHistory: [orderItemSchema],
  cart: [cartItemSchema],
  wishlist: [wishlistItemSchema],
  deliveryAddress: [addressSchema]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
