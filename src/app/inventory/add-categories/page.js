"use client";
import React, { useState } from "react";

const Page = () => {
  const [category, setCategory] = useState({ name: "", subcategories: [""] });

  const handleCategoryNameChange = (value) => {
    setCategory((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleSubcategoryChange = (index, value) => {
    setCategory((prevState) => ({
      ...prevState,
      subcategories: [
        ...prevState.subcategories.slice(0, index),
        value,
        ...prevState.subcategories.slice(index + 1),
      ],
    }));
  };

  const addSubcategory = () => {
    setCategory((prevState) => ({
      ...prevState,
      subcategories: [...prevState.subcategories, ""],
    }));
  };

  const removeSubcategory = (index) => {
    setCategory((prevState) => ({
      ...prevState,
      subcategories: prevState.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log("Category added successfully");
        // Clear the form after successful submission
        setCategory({ name: "", subcategories: [""] });
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[97vh] py-4 rounded-lg
    bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200
     ">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Category Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">
                Category Name:
              </span>
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            {category.subcategories.map((sub, subIndex) => (
              <div
                key={subIndex}
                className="flex  flex-col  items-start "
              >
                <label className="block flex-grow">
                  <span className="text-lg font-medium text-gray-700">
                    Subcategory:
                  </span>
                </label>
                <div className="flex  w-full jusitify-between gap-5 items-center">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) =>
                      handleSubcategoryChange(subIndex, e.target.value)
                    }
                    className="  w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubcategory(subIndex)}
                    className=" px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    -
                  </button>
                  {subIndex === category.subcategories.length - 1 && (
                    <button
                      type="button"
                      onClick={addSubcategory}
                      className=" px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
