// Example in a login page
"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Password reset email sent");
    } else {
      setMessage(data.message);
    }
  };

  useState(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center  w-full ">
      <Toaster />
      <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
