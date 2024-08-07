"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Modal from "./Modal"; // Make sure to import the custom modal

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      toast.promise(
        (async () => {
          const response = await fetch("/api/get-orders");
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          const data = await response.json();
          setOrders(data.orders);
          setFilteredOrders(data.orders);
        })(),
        {
          loading: "Fetching orders...",
          success: "Orders fetched successfully",
          error: "Error fetching orders",
        }
      );
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) =>
          order._id.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-4xl font-bold mb-8 text-center">Orders</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by Order ID"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Order ID
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              User
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Products
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Total Cost
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Status
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id} className="even:bg-gray-100 odd:bg-white">
              <td className="py-3 px-4 border-b">{order._id}</td>
              <td className="py-3 px-4 border-b">
                {order.user.username} <br />
                {/* ({order.user.userDetails.businessName}) */}
              </td>
              <td className="py-3 px-4 border-b">
                {/* {order.products.map((product, index) => (
                  <div key={index}>{product.product.productName}</div>
                ))} */}
                <div className=" text-center w-[60%]  ">
                  <p className="">
                  {
                    order.products.length
                  }
                  </p>
                </div>
              </td>
              <td className="py-3 px-4 border-b">₹{order.totalCost}</td>
              <td className="py-3 px-4 border-b">{order.deliveryStatus}</td>
              <td className="py-3 px-4 border-b">
                <button
                  onClick={() => openModal(order)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <Modal isOpen={true} onClose={closeModal}>
          <h2 className="text-3xl font-semibold mb-6">Order Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>User:</strong> {selectedOrder.user.username}
            </p>
            <p>
              <strong>User Email:</strong> {selectedOrder.user.email}
            </p>
            {selectedOrder.user.userDetails.businessName && (
              <p>
                <strong>Business Name:</strong>{" "}
                {selectedOrder.user.userDetails.businessName}
              </p>
            )}
            <p>
              <strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}
            </p>
            <p>
              <strong>Total Cost:</strong> ₹{selectedOrder.totalCost}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.deliveryStatus}
            </p>
          </div>
          <h3 className="text-xl font-semibold mt-4">Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {selectedOrder.products.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h4 className="text-lg font-semibold">
                  {product.product.productName}
                </h4>
                <p className="mt-2">
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong>Single Product Cost:</strong> ₹
                  {product.singleProductCost}
                </p>
                <p>
                  <strong>Total Cost:</strong> ₹{product.totalCost}
                </p>
                {product.product.images.length > 0 && (
                  <div className="mt-4">
                    <Image
                      src={product.product.images[0]}
                      alt={product.product.productName}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={closeModal}
            className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Page;
