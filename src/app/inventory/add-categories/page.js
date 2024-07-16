"use client"
import React, { useState } from 'react';

const Page = () => {
  const [category, setCategory] = useState({ name: '', subcategories: [''] });

  const handleCategoryNameChange = (value) => {
    setCategory(prevState => ({
      ...prevState,
      name: value
    }));
  };

  const handleSubcategoryChange = (index, value) => {
    setCategory(prevState => ({
      ...prevState,
      subcategories: [
        ...prevState.subcategories.slice(0, index),
        value,
        ...prevState.subcategories.slice(index + 1)
      ]
    }));
  };

  const addSubcategory = () => {
    setCategory(prevState => ({
      ...prevState,
      subcategories: [...prevState.subcategories, '']
    }));
  };

  const removeSubcategory = (index) => {
    if (index === 0) return; // Prevent removing the first subcategory
    setCategory(prevState => ({
      ...prevState,
      subcategories: prevState.subcategories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log('Category added successfully');
        // Clear the form after successful submission
        setCategory({ name: '', subcategories: [''] });
      } else {
        console.log('Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center w-[80vw] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Category Name:</span>
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            {category.subcategories.map((sub, subIndex) => (
              <div key={subIndex} className="flex items-center space-x-2">
                <label className="block flex-grow">
                  <span className="text-gray-700">Subcategory:</span>
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => handleSubcategoryChange(subIndex, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
                {subIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSubcategory(subIndex)}
                    className="mt-6 px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
                {subIndex === category.subcategories.length - 1 && (
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add 
                  </button>
                )}
              </div>
            ))}
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
