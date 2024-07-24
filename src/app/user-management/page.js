"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch("/api/get-users");

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setFilteredUsers(data.users);
        }
      } catch (error) {
        console.log("Error while getting user details: ", error);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      [user.username, user.type, user.userDetails?.mobileNo, user.email, user.userDetails?.permanentAddress?.state]
        .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">User Management</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">S.No.</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Mobile Number</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">State</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">View</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr className="even:bg-gray-100 odd:bg-white" key={user._id}>
              <td className="py-3 px-4 border-b">{index + 1}</td>
              <td className="py-3 px-4 border-b">{user.username}</td>
              <td className="py-3 px-4 border-b">{user.type}</td>
              <td className="py-3 px-4 border-b">{user.userDetails?.mobileNo}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">{user.userDetails?.permanentAddress?.state}</td>
              <td className="py-3 px-4 border-b">
                <button
                  onClick={() => openModal(user)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0" onClick={closeModal}></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-lg">
            <h2 className="text-3xl font-semibold mb-6">User Details</h2>
            <div className="space-y-4">
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Type:</strong> {selectedUser.type}</p>
              <p><strong>Mobile Number:</strong> {selectedUser.userDetails?.mobileNo}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Business Name:</strong> {selectedUser.userDetails?.businessName}</p>
              <p><strong>Address:</strong> {`${selectedUser.userDetails?.permanentAddress?.street}, ${selectedUser.userDetails?.permanentAddress?.city}, ${selectedUser.userDetails?.state}, ${selectedUser.userDetails?.permanentAddress?.pinCode}, ${selectedUser.userDetails?.permanentAddress?.country}`}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
