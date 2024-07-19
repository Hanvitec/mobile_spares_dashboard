// "use client";

// import React, { useState, useEffect } from "react";

// const Page = () => {
//   const [brands, setBrands] = useState([]); // Assuming brands are fetched from API or stored locally
//   const [brand, setBrand] = useState({
//     name: "",
//     url: "",
//     products: [{ productName: "", productImageUrl: "" }],
//   });
//   const [editBrand, setEditBrand] = useState(null); // State to track which brand is being edited
//   const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close
//   const fetchBrands = async () => {
//     try {
//       const response = await fetch("/api/get-brands"); // Adjust API endpoint as per your implementation
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Data From GET API REQUEST: ", data);
//         setBrands(data.brands); // Assuming API returns brands as an array in 'brands' key
//       } else {
//         console.error("Failed to fetch brands");
//       }
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };
//   useEffect(() => {
//     // Fetch brands from API or set from local state

//     fetchBrands();
//   }, []);

//   const handleBrandChange = (field, value) => {
//     setBrand((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   const handleProductChange = (index, field, value) => {
//     setBrand((prevState) => ({
//       ...prevState,
//       products: [
//         ...prevState.products.slice(0, index),
//         { ...prevState.products[index], [field]: value },
//         ...prevState.products.slice(index + 1),
//       ],
//     }));
//   };

//   const addProduct = () => {
//     setBrand((prevState) => ({
//       ...prevState,
//       products: [
//         ...prevState.products,
//         { productName: "", productImageUrl: "" },
//       ],
//     }));
//   };

//   const removeProduct = (index) => {
//     // if (index === 0) return; // Prevent removing the first product
//     setBrand((prevState) => ({
//       ...prevState,
//       products: prevState.products.filter((_, i) => i !== index),
//     }));
//   };

//   const handleEditClick = (index) => {
//     setEditBrand(index); // Set the index of the brand being edited
//     setModalOpen(true); // Open the modal
//     // Populate form fields with the brand data
//     setBrand({
//       id: brands[index]._id, // Assuming '_id' is the MongoDB ObjectId of the brand
//       name: brands[index].name,
//       url: brands[index].url,
//       products: [...brands[index].products],
//     });
//   };
//   console.log("Brands from modal open", brand);
//   const handleModalClose = () => {
//     setModalOpen(false); // Close the modal
//     setEditBrand(null); // Reset the edit brand state
//     setBrand({
//       name: "",
//       url: "",
//       products: [{ productName: "", productImageUrl: "" }],
//     }); // Clear the form fields
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/get-brands?brand=${brand.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(brand),
//       });

//       if (response.ok) {
//         console.log("Brand updated successfully");
//         // Optionally update brands state after successful update
//         await fetchBrands();
//       } else {
//         console.log("Failed to update brand");
//       }

//       // Close the modal and reset state
//       setModalOpen(false);
//       setEditBrand(null);
//       setBrand({
//         name: "",
//         url: "",
//         products: [{ productName: "", productImageUrl: "" }],
//       });
//     } catch (error) {
//       console.error("Error updating brand:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen w-[80%] bg-gray-100">
//       {/* Brands List */}
//       <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto mt-6">
//         <h2 className="text-lg font-semibold mb-4">Brands</h2>
//         {brands.length === 0 ? (
//           <p>No brands available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {brands.map((brand, index) => (
//               <div
//                 key={brand._id}
//                 className="bg-white p-4 rounded-lg shadow-md"
//               >
//                 <div className="flex flex-col justify-between h-full">
//                   <div>
//                     <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
//                     <p className="mb-2 max-w-[90%] overflow-hidden  text-ellipsis">
//                       {brand.url}
//                     </p>
//                     <ul className="list-disc list-inside">
//                       {brand.products.map((product, productIndex) => (
//                         <li key={productIndex}>
//                           {product.productName} - {product.productImageUrl}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleEditClick(index)}
//                     className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal for Edit Brand */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//             <h2 className="text-lg font-semibold mb-4">Edit Brand</h2>
//             <form className="space-y-4" onSubmit={handleUpdate}>
//               <div>
//                 <label className="block">
//                   <span className="text-gray-700">Brand Name:</span>
//                   <input
//                     type="text"
//                     value={brand.name}
//                     onChange={(e) => handleBrandChange("name", e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </label>
//                 <label className="block mt-4">
//                   <span className="text-gray-700">Brand URL:</span>
//                   <input
//                     type="text"
//                     value={brand.url}
//                     onChange={(e) => handleBrandChange("url", e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </label>
//               </div>
//               {brand.products.map((product, productIndex) => (
//                 <div key={productIndex} className="flex items-center space-x-4">
//                   <div className="flex-1">
//                     <label className="block">
//                       <span className="text-gray-700">Product Name:</span>
//                       <input
//                         type="text"
//                         value={product.productName}
//                         onChange={(e) =>
//                           handleProductChange(
//                             productIndex,
//                             "productName",
//                             e.target.value
//                           )
//                         }
//                         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </label>
//                   </div>
//                   <div className="flex-1">
//                     <label className="block">
//                       <span className="text-gray-700">Product Image URL:</span>
//                       <input
//                         type="text"
//                         value={product.productImageUrl}
//                         onChange={(e) =>
//                           handleProductChange(
//                             productIndex,
//                             "productImageUrl",
//                             e.target.value
//                           )
//                         }
//                         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </label>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeProduct(productIndex)}
//                     className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                   >
//                     -
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addProduct}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 +
//               </button>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleModalClose}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
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













"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    products: [{ productName: "", productImageUrl: "" }],
  });
  const [editBrand, setEditBrand] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/get-brands");
      if (response.ok) {
        const data = await response.json();
        console.log("Data From GET API REQUEST: ", data);
        setBrands(data.brands);
      } else {
        console.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleBrandChange = (field, value) => {
    setBrand((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleProductChange = (index, field, value) => {
    setBrand((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products.slice(0, index),
        { ...prevState.products[index], [field]: value },
        ...prevState.products.slice(index + 1),
      ],
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

  const handleEditClick = (index) => {
    setEditBrand(index);
    setModalOpen(true);
    setBrand({
      id: brands[index]._id,
      name: brands[index].name,
      url: brands[index].url,
      products: [...brands[index].products],
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`/api/delete-brand?brand=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Brand deleted successfully");
        await fetchBrands(); // Refresh the brands list
      } else {
        console.log("Failed to delete brand");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditBrand(null);
    setBrand({
      name: "",
      url: "",
      products: [{ productName: "", productImageUrl: "" }],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/get-brands?brand=${brand.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
      });

      if (response.ok) {
        console.log("Brand updated successfully");
        await fetchBrands();
      } else {
        console.log("Failed to update brand");
      }

      setModalOpen(false);
      setEditBrand(null);
      setBrand({
        name: "",
        url: "",
        products: [{ productName: "", productImageUrl: "" }],
      });
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-[80%] bg-gray-100">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">Brands</h2>
        {brands.length === 0 ? (
          <p>No brands available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                    <p className="mb-2 max-w-[90%] overflow-hidden text-ellipsis">
                      {brand.url}
                    </p>
                    <ul className="list-disc list-inside">
                      {brand.products.map((product, productIndex) => (
                        <li key={productIndex}>
                          {product.productName} - {product.productImageUrl}
                        </li>
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
                      onClick={() => handleDeleteClick(brand._id)}
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

      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[55vw] max-w-[60vw] max-h-[90vh] overflow-y-auto scrollbar-thin ">
            <h2 className="text-lg font-semibold mb-4">Edit Brand</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div>
                <label className="block">
                  <span className="text-gray-700">Brand Name:</span>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => handleBrandChange("name", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
                <label className="block mt-4">
                  <span className="text-gray-700">Brand URL:</span>
                  <input
                    type="text"
                    value={brand.url}
                    onChange={(e) => handleBrandChange("url", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
              </div>
              {brand.products.map((product, productIndex) => (
                <div key={productIndex} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block">
                      <span className="text-gray-700">Product Name:</span>
                      <input
                        type="text"
                        value={product.productName}
                        onChange={(e) =>
                          handleProductChange(
                            productIndex,
                            "productName",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <label className="block">
                      <span className="text-gray-700">Product Image URL:</span>
                      <input
                        type="text"
                        value={product.productImageUrl}
                        onChange={(e) =>
                          handleProductChange(
                            productIndex,
                            "productImageUrl",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(productIndex)}
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addProduct}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                +
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
