"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [categories, setCategories] = useState([]); // Assuming categories are fetched from API or stored locally
  const [category, setCategory] = useState({ name: "", subcategories: [""] });
  const [editCategories, seteditCategories] = useState(null); // State to track which category is being edited
  const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close

  useEffect(() => {
    // Fetch categories from API or set from local state
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/get-categories"); // Adjust API endpoint as per your implementation
        if (response.ok) {
          const data = await response.json();
          console.log("Data From GET API REQUEST: ", data);
          setCategories(data.categories); // Assuming API returns categories as an array in 'categories' key
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
    // if (index === 0) return; // Prevent removing the first subcategory
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
        // Optionally fetch categories again to update the list
        await fetchCategories();
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = (index) => {
    seteditCategories(index); // Set the index of the category being edited
    setModalOpen(true); // Open the modal
    // Populate form fields with the category data
    setCategory({
      id: categories[index]._id, // Assuming '_id' is the MongoDB ObjectId of the category
      name: categories[index].name,
      subcategories: categories[index].subcategories.slice(),
    });
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    seteditCategories(null); // Reset the edit category state
    setCategory({ name: "", subcategories: [""] }); // Clear the form fields
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/get-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log("Category updated successfully");
        // Optionally update categories state after successful update
        await fetchCategories();
      } else {
        console.log("Failed to update category");
      }

      // Close the modal and reset state
      setModalOpen(false);
      seteditCategories(null);
      setCategory({ name: "", subcategories: [""] });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteClick = async (categoryId) => {
    // if (confirm("Are you sure you want to delete this category?"))
    {
      try {
        const response = await fetch(
          `/api/delete-categories?categoryId=${categoryId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: categoryId }),
          }
        );

        if (response.ok) {
          console.log("Category deleted successfully");
          // Update the categories state after deletion
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== categoryId)
          );
        } else {
          console.log("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      {/* Categories List */}
      <div className="p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-600">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div
                key={cat._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {cat.name}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {cat.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={() => handleEditClick(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(cat._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg h-[80vh] overflow-auto scrollbar-thin shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Edit Category
            </h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div>
                <label className="block">
                  <span className="text-gray-700">Category Name:</span>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleCategoryNameChange(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
              </div>
              {category.subcategories.map((sub, subIndex) => (
                <div key={subIndex} className="flex items-center space-x-2">
                  <label className="block flex-1">
                    <span className="text-gray-700">Subcategory:</span>
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) =>
                        handleSubcategoryChange(subIndex, e.target.value)
                      }
                      className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                  {category.subcategories.length > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSubcategory(subIndex)}
                      className="px-4 mt-7 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSubcategory}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Subcategory
              </button>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
