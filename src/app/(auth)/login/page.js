"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If user is already logged in, redirect to homepage
      router.replace("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("Please provide all the credentials");
      return;
    }

    try {
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (res.error) {
        console.log("Invalid Credentials");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // If the user is already logged in, display a loading message while redirecting
  if (session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center  w-full ">
      <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/register">
              <p className="text-blue-500 hover:underline">
                Don&apos;t have an account? Register
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
