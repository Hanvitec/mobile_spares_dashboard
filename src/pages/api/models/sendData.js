// models/Customer.js
import mongoose from 'mongoose';

const customerDetailsSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerDetailsSchema);
export default Customer;
