"use client";

import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/retrive-products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("data");
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Sub-Category</th>
            <th className="py-2 px-4 border-b">Retail Price</th>
            <th className="py-2 px-4 border-b">Business Price</th>
            <th className="py-2 px-4 border-b">Availability</th>
            <th className="py-2 px-4 border-b">Compatible Brand</th>
            <th className="py-2 px-4 border-b">Compatible Product</th>
            <th className="py-2 px-4 border-b">View</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 px-3 border-b">{product.productName}</td>
              <td className="py-2 px-3 border-b">{product.productCategory}</td>
              <td className="py-2 px-3 border-b">{product.subCategory}</td>
              <td className="py-2 px-3 border-b">${product.retailPrice}</td>
              <td className="py-2 px-3 border-b">${product.businessPrice}</td>
              <td className="py-2 px-3 border-b">{product.quantity}</td>
              <td className="py-2 px-3 border-b">{product.compatibleBrand}</td>
              <td className="py-2 px-3 border-b">
                {product.compatibleProduct}
              </td>
              <td className="py-2 px-3 border-b">
                <button
                  onClick={() => openModal(product)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <Modal onClose={closeModal}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">
              {selectedProduct.productName}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedProduct.productDescription,
              }}
            />
            <p>Category: {selectedProduct.productCategory}</p>
            <p>Sub-Category: {selectedProduct.subCategory}</p>
            <p>Retail Price: ${selectedProduct.retailPrice}</p>
            <p>Business Price: ${selectedProduct.businessPrice}</p>
            <p>Availability: {selectedProduct.quantity}</p>
            <p>Compatible Brand: {selectedProduct.compatibleBrand}</p>
            <p>Compatible Product: {selectedProduct.compatibleProduct}</p>
            <div className="flex flex-wrap">

            {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProduct.productName} - ${index + 1}`}
                  className="w-1/4 p-1"
                />
            ))}
              </div>

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-xl max-h-[90vh] overflow-y-auto scrollbar-thin ">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Products;
