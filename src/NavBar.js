import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user); 
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.log("Error fetching profile:", error);
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setUser(null); // Clear user state on logout
        navigate("/");
      })
      .catch((error) => console.log("Logout failed:", error));
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-opacity-90 backdrop-blur-lg fixed w-full top-0 z-10">
      <Link to="/" className="text-3xl font-extrabold text-orange-500">
        VisionFit AI
      </Link>
      <div className="space-x-6 text-lg">
        <Link
          to="/features"
          className="text-white hover:text-orange-500 transition"
        >
          Features
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-orange-500 transition"
        >
          About
        </Link>
        {user ? (
          <>
            <Link
              to="/user-profile"
              className="font-semibold text-orange-300 hover:text-orange-500 cursor-pointer hover:underline"
            >
              {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-orange-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-orange-500 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-orange-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-orange-700 transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
