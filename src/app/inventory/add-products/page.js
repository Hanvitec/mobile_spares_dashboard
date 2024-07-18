"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast, Toaster } from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Page = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    subCategory: "",
    retailPrice: "",
    businessPrice: "",
    availability: "In Stock",
    compatibleBrand: "",
    compatibleProduct: "",
    image: null,
    productCode: "", // New field
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "productCategory") {
        const selectedCategory = categories.find((cat) => cat.name === value);
        setSubCategories(
          selectedCategory ? selectedCategory.subcategories : []
        );
      }
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, productDescription: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const response = await fetch("/api/add-products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Product successfully saved");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting the form:", error);
  //     // Handle error (e.g., show an error message)
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Product successfully saved");
        // Clear the form
        console.log('Data saved Succesfully');
        setFormData({
          productName: "",
          productDescription: "",
          productCategory: "",
          subCategory: "",
          retailPrice: "",
          businessPrice: "",
          availability: "In Stock",
          compatibleBrand: "",
          compatibleProduct: "",
          image: null,
          productCode: "",
        });
      } else {
        toast.error("Error saving product");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form");
    }
  };

  useEffect(() => {
    const getDropdownValues = async () => {
      try {
        const response = await fetch("/api/get-dropdown-values", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        // console.log("response: ", response);
        if (response.ok) {
          const data = await response.json();
          setCategories([...data.categoriesFromDb]);
        }
      } catch (error) {
        console.log("Error while fetching categories");
      }
    };
    getDropdownValues();
  }, []);

  console.log("Categories From Database: ", categories);

  return (
    <div className="rounded-md p-2 h-[97vh]">
      {/* Top Heading */}
      <Toaster />
      <div className="">
        <h1 className="font-serif font-[600] text-2xl">Add Products</h1>
        <form onSubmit={handleSubmit} className="shadow-lg rounded-md p-6">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              name="productName"
              placeholder="Enter Product Name"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Description
            </label>
            <ReactQuill
              value={formData.productDescription}
              onChange={handleQuillChange}
              modules={modules}
              formats={formats}
              theme="snow"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productCategory"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subCategory"
              className="block text-gray-700 font-bold mb-2"
            >
              Sub Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="retailPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Retail Price
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="retailPrice"
              name="retailPrice"
              placeholder="Enter Retail Price"
              value={formData.retailPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Business Price
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessPrice"
              name="businessPrice"
              placeholder="Enter Business Price"
              value={formData.businessPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-gray-700 font-bold mb-2"
            >
              Availability
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="compatibleBrand"
              className="block text-gray-700 font-bold mb-2"
            >
              Compatible Brand
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="compatibleBrand"
              name="compatibleBrand"
              value={formData.compatibleBrand}
              onChange={handleChange}
            >
              <option value="">Select Compatible Brand</option>
              <option value="Brand1">Brand 1</option>
              <option value="Brand2">Brand 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="compatibleProduct"
              className="block text-gray-700 font-bold mb-2"
            >
              Compatible Product
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="compatibleProduct"
              name="compatibleProduct"
              value={formData.compatibleProduct}
              onChange={handleChange}
            >
              <option value="">Select Compatible Product</option>
              <option value="Product1">Product 1</option>
              <option value="Product2">Product 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productCode"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Code
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productCode"
              name="productCode"
              placeholder="Enter Product Code"
              value={formData.productCode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <input
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
