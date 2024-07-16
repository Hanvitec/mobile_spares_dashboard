// User database schema

import mongoose from "mongoose";

const { Schema } = mongoose;

// Simple User Schema
const adminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "admin-user",
    timestamps: true,
  }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
