import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  _id: Schema.Types.ObjectId,
  street: { type: String, },
  city: { type: String,  },
  state: { type: String,  },
  pinCode: { type: String,  },
  country: { type: String, }
});

const cartItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const wishlistItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
});

const userDetailsSchema = new Schema({
  businessName: { type: String },
  name: { type: String },
  mobileNo: { type: String,  },
  GSTIN: { type: String },
  permanentAddress: { type: addressSchema, }
}, { _id: false });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, },
  type: { type: String, enum: ['Business', 'Individual'], required: true },
  userDetails: { type: userDetailsSchema, },
  images: [{ type: String }], // Multiple image URLs
  isValidated: { type: Boolean, default: false }, // Validation field
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }], // Reference to Order schema
  cart: [cartItemSchema],
  wishlist: [wishlistItemSchema],
  deliveryAddress: [addressSchema]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
