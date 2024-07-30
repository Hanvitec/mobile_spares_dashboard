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
    quantity: 0,
    compatibleBrand: "",
    compatibleProduct: "",
    image: null,
    productCode: "", // New field
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const selectedFiles = Array.from(files);
      if (selectedFiles.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }
      setFormData({ ...formData, [name]: selectedFiles });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "productCategory") {
        const selectedCategory = categories.find((cat) => cat.name === value);
        setSubCategories(
          selectedCategory ? selectedCategory.subcategories : []
        );
      }
      if (name === "compatibleBrand") {
        const selectedBrand = brands.find((brand) => brand.name === value);
        setBrandProducts(selectedBrand ? selectedBrand.products : []);
      }
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, productDescription: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("FORM: ", formData);
      const formDataToSend = new FormData();
      formData.image.forEach((file, index) => {
        formDataToSend.append(`image${index}`, file);
      });
      formDataToSend.append("data", JSON.stringify(formData));

      const response = await fetch("/api/add-products", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Clear the form
        console.log("Data saved successfully");
        setFormData({
          productName: "",
          productDescription: "",
          productCategory: "",
          subCategory: "",
          retailPrice: "",
          businessPrice: "",
          quantity: 0,
          compatibleBrand: "",
          compatibleProduct: "",
          image: null,
          productCode: "",
        });
      } else {
        toast.error(data.message);
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
          // console.log("GET DATA from the database: ", data);
          setCategories([...data.categoriesFromDb]);
          setBrands([...data.brandsFromDb]);
        }
      } catch (error) {
        console.log("Error while fetching categories");
      }
    };
    getDropdownValues();
  }, []);

  // console.log("Categories From Database: ", categories);

  return (
    <div className="rounded-md p-2 min-h-[97vh] bg-gray-50 flex justify-center items-center">
      <Toaster />
      <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
        <h1 className="font-serif font-semibold text-3xl text-center text-gray-800 mb-6">
          Add Products
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="productName"
                name="productName"
                placeholder="Enter Product Name"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="productDescription"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Description
              </label>
              <ReactQuill
                value={formData.productDescription}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                theme="snow"
                className="shadow-sm border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="productCategory"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Category
              </label>
              <select
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <div>
              <label
                htmlFor="subCategory"
                className="block text-gray-700 font-medium mb-2"
              >
                Sub Category
              </label>
              <select
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="retailPrice"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Retail Price
                </label>
                <input
                  type="number"
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="retailPrice"
                  name="retailPrice"
                  placeholder="Enter Retail Price"
                  value={formData.retailPrice}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="businessPrice"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Business Price
                </label>
                <input
                  type="number"
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="businessPrice"
                  name="businessPrice"
                  placeholder="Enter Business Price"
                  value={formData.businessPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="compatibleBrand"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Compatible Brand
                </label>
                <select
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="compatibleBrand"
                  name="compatibleBrand"
                  value={formData.compatibleBrand}
                  onChange={handleChange}
                >
                  <option value="">Select Compatible Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="compatibleProduct"
                className="block text-gray-700 font-medium mb-2"
              >
                Compatible Product
              </label>
              <select
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="compatibleProduct"
                name="compatibleProduct"
                value={formData.compatibleProduct}
                onChange={handleChange}
              >
                <option value="">Select Compatible Product</option>
                {brandProducts.map((product) => (
                  <option key={product._id} value={product.productName}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="productCode"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Code
              </label>
              <input
                type="text"
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="productCode"
                name="productCode"
                placeholder="Enter Product Code"
                value={formData.productCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Image
              </label>
              <input
                type="file"
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="image"
                name="image"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
