"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const Page = () => {
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    products: [{ productName: "", productImageUrl: "" }],
  });

  const handleBrandChange = (key, value) => {
    console.log('Inside brand change: ', key, value);
    
    setBrand((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleProductChange = (index, key, value) => {
    setBrand((prevState) => ({
      ...prevState,
      products: prevState.products.map((product, i) =>
        i === index ? { ...product, [key]: value } : product
      ),
    }));
  };

  const addProduct = () => {
    setBrand((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products,
        { productName: "", productImageUrl: "" },
      ],
    }));
  };

  const removeProduct = (index) => {
    setBrand((prevState) => ({
      ...prevState,
      products: prevState.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("BRAND: ", brand);

      const response = await fetch("/api/add-brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
      });

      if (response.ok) {
        console.log("Brand added successfully");
        // Clear the form after successful submission
        setBrand({
          name: "",
          url: "",
          products: [{ productName: "", productImageUrl: "" }],
        });
      } else {
        console.log("Failed to add brand");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Add Brand and Products
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-600">Brand Name:</span>
              <input
                type="text"
                value={brand.name}
                onChange={(e) => handleBrandChange("name", e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Brand URL:</span>
              {/* <input
                type="text"
                value={brand.url}
                onChange={(e) => handleBrandChange("url", e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /> */}
            </label>
            <CldUploadWidget
              uploadPreset="ecommerceImages" // Replace this with your actual upload preset
              onSuccess={(e) => handleBrandChange("url", e.info.secure_url)}
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onClick={handleOnClick}
                  >
                    Upload Images
                  </button>
                );
              }}
            </CldUploadWidget>
            <h2 className="text-lg font-semibold text-gray-700">
              Brand Product List
            </h2>
            {brand.products.map((product, index) => (
              <div
                key={index}
                className="space-y-4 bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <div className="flex flex-col space-y-5 items-center space-x-4">
                  <label htmlFor="productName" className="block flex-1">
                    <span className="text-gray-600">Product Name:</span>
                  </label>
                  <input
                    id="productName"
                    type="text"
                    value={product.productName}
                    onChange={(e) =>
                      handleProductChange(index, "productName", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label htmlFor="imageUpload" className="block flex-1">
                    <span className="text-gray-600">Product Image URL:</span>
                    {/* <input
                    type="text"
                    value={product.productImageUrl}
                    onChange={(e) =>
                      handleProductChange(index, "productImageUrl", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  /> */}
                  </label>
                  <CldUploadWidget
                    id="imageUpload"
                    uploadPreset="ecommerceImages" // Replace this with your actual upload preset
                    onSuccess={(e) =>
                      handleProductChange(
                        index,
                        "productImageUrl",
                        e.info.secure_url
                      )
                    }
                  >
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onClick={handleOnClick}
                        >
                          Upload Images
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="mt-6 px-4 py-2 w-full bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addProduct}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Product
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
