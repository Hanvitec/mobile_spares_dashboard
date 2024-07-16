// "use client"

// import React, { useState, useEffect } from 'react';

// const Page = () => {
//   const [categories, setCategories] = useState([]); // Assuming categories are fetched from API or stored locally
//   const [category, setCategory] = useState({ name: '', subcategories: [''] });
//   const [editCategory, setEditCategory] = useState(null); // State to track which category is being edited
//   const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close

//   useEffect(() => {
//     // Fetch categories from API or set from local state
//     // Example of fetching categories:
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/get-categories'); // Adjust API endpoint as per your implementation
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Data From GET API REQUEST: ', data);
//           setCategories(data.categories); // Assuming API returns categories as an array in 'categories' key
//         } else {
//           console.error('Failed to fetch categories');
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryNameChange = (value) => {
//     setCategory(prevState => ({
//       ...prevState,
//       name: value
//     }));
//   };

//   const handleSubcategoryChange = (index, value) => {
//     setCategory(prevState => ({
//       ...prevState,
//       subcategories: [
//         ...prevState.subcategories.slice(0, index),
//         value,
//         ...prevState.subcategories.slice(index + 1)
//       ]
//     }));
//   };

//   const addSubcategory = () => {
//     setCategory(prevState => ({
//       ...prevState,
//       subcategories: [...prevState.subcategories, '']
//     }));
//   };

//   const removeSubcategory = (index) => {
//     if (index === 0) return; // Prevent removing the first subcategory
//     setCategory(prevState => ({
//       ...prevState,
//       subcategories: prevState.subcategories.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/add-categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(category),
//       });

//       if (response.ok) {
//         console.log('Category added successfully');
//         // Clear the form after successful submission
//         setCategory({ name: '', subcategories: [''] });
//       } else {
//         console.log('Failed to add category');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleEditClick = (index) => {
//     setEditCategory(index); // Set the index of the category being edited
//     setModalOpen(true); // Open the modal
//     // Populate form fields with the category data
//     setCategory({
//       id: categories[index]._id, // Assuming '_id' is the MongoDB ObjectId of the category
//       name: categories[index].name,
//       subcategories: categories[index].subcategories.slice(),
//     });
//   };

//   const handleModalClose = () => {
//     setModalOpen(false); // Close the modal
//     setEditCategory(null); // Reset the edit category state
//     setCategory({ name: '', subcategories: [''] }); // Clear the form fields
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch('/api/update-category', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(category),
//       });

//       if (response.ok) {
//         console.log('Category updated successfully');
//         // Optionally update categories state after successful update
//         // Fetch updated categories list or update locally
//       } else {
//         console.log('Failed to update category');
//       }

//       // Close the modal and reset state
//       setModalOpen(false);
//       setEditCategory(null);
//       setCategory({ name: '', subcategories: [''] });
//     } catch (error) {
//       console.error('Error updating category:', error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-700">Category Name:</span>
//               <input
//                 type="text"
//                 value={category.name}
//                 onChange={(e) => handleCategoryNameChange(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </label>
//             {category.subcategories.map((sub, subIndex) => (
//               <div key={subIndex} className="flex items-center space-x-2">
//                 <label className="block flex-grow">
//                   <span className="text-gray-700">Subcategory:</span>
//                   <input
//                     type="text"
//                     value={sub}
//                     onChange={(e) => handleSubcategoryChange(subIndex, e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </label>
//                 {subIndex > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removeSubcategory(subIndex)}
//                     className="mt-6 px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 {subIndex === category.subcategories.length - 1 && (
//                   <button
//                     type="button"
//                     onClick={addSubcategory}
//                     className="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Add 
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Modal for Edit Category */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//             <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
//             <form className="space-y-4">
//               <div>
//                 <label className="block">
//                   <span className="text-gray-700">Category Name:</span>
//                   <input
//                     type="text"
//                     value={category.name}
//                     onChange={(e) => handleCategoryNameChange(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </label>
//               </div>
//               {category.subcategories.map((sub, subIndex) => (
//                 <div key={subIndex}>
//                   <label className="block">
//                     <span className="text-gray-700">Subcategory {subIndex + 1}:</span>
//                     <input
//                       type="text"
//                       value={sub}
//                       onChange={(e) => handleSubcategoryChange(subIndex, e.target.value)}
//                       className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </label>
//                 </div>
//               ))}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleModalClose}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleUpdate}
//                   className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;




"use client"

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [categories, setCategories] = useState([]); // Assuming categories are fetched from API or stored locally
  const [category, setCategory] = useState({ name: '', subcategories: [''] });
  const [editCategory, setEditCategory] = useState(null); // State to track which category is being edited
  const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close

  useEffect(() => {
    // Fetch categories from API or set from local state
    // Example of fetching categories:
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/get-categories'); // Adjust API endpoint as per your implementation
        if (response.ok) {
          const data = await response.json();
          console.log('Data From GET API REQUEST: ', data);
          setCategories(data.categories); // Assuming API returns categories as an array in 'categories' key
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
        // Optionally fetch categories again to update the list
        await fetchCategories();
      } else {
        console.log('Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditClick = (index) => {
    setEditCategory(index); // Set the index of the category being edited
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
    setEditCategory(null); // Reset the edit category state
    setCategory({ name: '', subcategories: [''] }); // Clear the form fields
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/update-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log('Category updated successfully');
        // Optionally update categories state after successful update
        // Fetch updated categories list or update locally
        await fetchCategories();
      } else {
        console.log('Failed to update category');
      }

      // Close the modal and reset state
      setModalOpen(false);
      setEditCategory(null);
      setCategory({ name: '', subcategories: [''] });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Categories List */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mt-6">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul>
            {categories.map((cat, index) => (
              <li key={cat._id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{cat.name}</h3>
                    <ul className="list-disc list-inside">
                      {cat.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEditClick(index)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <form className="space-y-4">
              <div>
                <label className="block">
                  <span className="text-gray-700">Category Name:</span>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleCategoryNameChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
              </div>
              {category.subcategories.map((sub, subIndex) => (
                <div key={subIndex}>
                  <label className="block">
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
                      className="mt-2 px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
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
                  type="button"
                  onClick={handleUpdate}
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
