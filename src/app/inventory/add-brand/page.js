// "use client";
// import React, { useState } from "react";

// const Page = () => {
//   const [brand, setBrand] = useState({
//     name: "",
//     url: "",
//     products: [{ productName: "", productImageUrl: "" }],
//   });

//   const handleBrandChange = (key, value) => {
//     setBrand((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   console.log("Brand Vluaees outside", brand);

//   const handleProductChange = (index, key, value) => {
//     setBrand((prevState) => ({
//       ...prevState,
//       products: prevState.products.map((product, i) =>
//         i === index ? { ...product, [key]: value } : product
//       ),
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/add-brand", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(brand),
//       });
//       console.log("Brand: ", brand);

//       if (response.ok) {
//         console.log("Brand added successfully");
//         // Clear the form after successful submission
//         setBrand({
//           name: "",
//           url: "",
//           products: [{ productName: "", productImageUrl: "" }],
//         });
//       } else {
//         console.log("Failed to add brand");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex items-center w-[80vw] justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-700">Brand Name:</span>
//               <input
//                 type="text"
//                 value={brand.name}
//                 onChange={(e) => handleBrandChange("name", e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </label>
//             <label className="block">
//               <span className="text-gray-700">Brand URL:</span>
//               <input
//                 type="text"
//                 value={brand.url}
//                 onChange={(e) => handleBrandChange("url", e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </label>
//             <h1 className="text-black font-bold">Brand Product List</h1>
//             {brand.products.map((product, index) => (
//               <div key={index} className="space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <label className="block flex-1">
//                     <span className="text-gray-700">productName:</span>
//                     <input
//                       type="text"
//                       value={product.productName}
//                       onChange={(e) =>
//                         handleProductChange(
//                           index,
//                           "productName",
//                           e.target.value
//                         )
//                       }
//                       className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </label>
//                   <label className="block flex-1">
//                     <span className="text-gray-700">Product Image URL:</span>
//                     <input
//                       type="text"
//                       value={product.productImageUrl}
//                       onChange={(e) =>
//                         handleProductChange(
//                           index,
//                           "productImageUrl",
//                           e.target.value
//                         )
//                       }
//                       className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </label>
//                   {index > 0 && (
//                     <button
//                       type="button"
//                       onClick={() => removeProduct(index)}
//                       className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                     >
//                       -
//                     </button>
//                   )}
//                 </div>
//                 {index === brand.products.length - 1 && (
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={addProduct}
//                       className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       +
//                     </button>
//                   </div>
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
//     </div>
//   );
// };

// export default Page;












"use client";
import React, { useState } from "react";

const Page = () => {
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    products: [{ productName: "", productImageUrl: "" }],
  });

  const handleBrandChange = (key, value) => {
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
    <div className="flex items-center w-[80vw] justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Brand Name:</span>
              <input
                type="text"
                value={brand.name}
                onChange={(e) => handleBrandChange("name", e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Brand URL:</span>
              <input
                type="text"
                value={brand.url}
                onChange={(e) => handleBrandChange("url", e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <h1 className="text-black font-bold">Brand Product List</h1>
            {brand.products.map((product, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="block flex-1">
                    <span className="text-gray-700">Product Name:</span>
                    <input
                      type="text"
                      value={product.productName}
                      onChange={(e) =>
                        handleProductChange(index, "productName", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                  <label className="block flex-1">
                    <span className="text-gray-700">Product Image URL:</span>
                    <input
                      type="text"
                      value={product.productImageUrl}
                      onChange={(e) =>
                        handleProductChange(index, "productImageUrl", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addProduct}
                className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                +
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
