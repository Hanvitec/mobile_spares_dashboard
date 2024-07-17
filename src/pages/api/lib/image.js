// models/Image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default ImageSchema