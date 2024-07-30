"use client";

import Image from "next/image";
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

  const renderStyledDescription = (description) => {
    const tagStyles = {
      h1: "text-3xl font-bold mb-4 underline",
      h2: "text-2xl font-semibold mb-3 mt-4",
      p: "text-gray-700 leading-relaxed mb-2",
      ul: "list-disc ml-6 mb-2",
      ol: "list-decimal ml-6 mb-2",
      li: "mb-1",
    };

    const html = description.replace(/<(\/?)(\w+).*?>/g, (match, end, tag) => {
      const style = tagStyles[tag.toLowerCase()];
      if (style) {
        return `<${end}${tag} class="${style}">`;
      } else {
        return match;
      }
    });

    return { __html: html };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                "Name",
                "Category",
                "Sub-Category",
                "Retail Price",
                "Business Price",
                "Availability",
                "Compatible Brand",
                "Compatible Product",
                "View",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {[
                  "productName",
                  "productCategory",
                  "subCategory",
                  "retailPrice",
                  "businessPrice",
                  "quantity",
                  "compatibleBrand",
                  "compatibleProduct",
                ].map((field) => (
                  <td key={field} className="py-3 px-4 border-b text-gray-700">
                    {product[field]}
                  </td>
                ))}
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <Modal onClose={closeModal}>
          <div className="p-8 bg-white rounded-lg  max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              {selectedProduct.productName}
            </h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={renderStyledDescription(
                selectedProduct.productDescription
              )}
            />
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Category:</span>{" "}
              {selectedProduct.productCategory}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Sub-Category:</span>{" "}
              {selectedProduct.subCategory}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Retail Price:</span> $
              {selectedProduct.retailPrice}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Business Price:</span> $
              {selectedProduct.businessPrice}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Availability:</span>{" "}
              {selectedProduct.quantity}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Compatible Brand:</span>{" "}
              {selectedProduct.compatibleBrand}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Compatible Product:</span>{" "}
              {selectedProduct.compatibleProduct}
            </p>
            <div className="flex flex-wrap mt-4 bg-gray-100 px-4 py-2 rounded-md">
              {selectedProduct.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${selectedProduct.productName} - ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-[97vh] overflow-auto scrollbar-thin max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1 flex items-center justify-center"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Products;
