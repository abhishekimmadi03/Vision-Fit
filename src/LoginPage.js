// LoginPage.js
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./NavBar";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function login(ev) {
    ev.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        setUser(result.user); 
        setRedirect(true);
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console.");
    }
  }

  if (redirect) {
    return <Navigate to="/features" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
            Login
          </h2>

          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                className="block text-sm font-semibold text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-400"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-400">
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-400"
              >
                Forgot Password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-orange-600 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-orange-800 transition-all"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 border-t border-gray-700">
        <p className="text-lg">
          &copy; 2025 VisionFit AI. Designed for Excellence.
        </p>
      </footer>
    </div>
  );
}
