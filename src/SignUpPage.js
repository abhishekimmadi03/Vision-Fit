import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log("Server Response:", result); // Log server response

    if (response.status === 200) {
      alert("Registration  successful!");
    } else {
      alert("Registration failed !" + result.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white flex justify-center items-center">
      <Navbar />

      <div className="max-w-lg w-full p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-orange-500">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-lg" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-lg" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Create a password"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-800 transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 hover:text-orange-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
