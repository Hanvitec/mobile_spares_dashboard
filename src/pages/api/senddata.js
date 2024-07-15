// pages/api/customer.js
import dbConnect from './lib/mongoose';
import Customer from './models/senddata';
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { customerName, address } = req.body;
        const customer = new Customer({ customerName, address }); // Use the Customer model
        await customer.save();
        res.status(201).json({ message: 'Customer added successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error adding customer', error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
