import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const FeaturesPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setIsAuthenticated(false);
      });
  }, []);

  const handleMealPlannerClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); 
      alert("Please log in to generate meal and workout plan");
      navigate("/login"); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <div className="flex-grow py-16 px-10 md:px-20">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-orange-400 mt-8 mb-10">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Link
            to={isAuthenticated ? "/meal-workout-planner" : "#"}
            onClick={handleMealPlannerClick}
            className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform block"
          >
            <h3 className="text-2xl font-semibold text-orange-300">
              AI-Powered Meal & Workout Planner
            </h3>
            <p className="mt-4 text-gray-400">
              Get personalized meal recommendations and workout plans tailored
              to your health goals and fitness level. Our AI dynamically adjusts
              both meal plans and workout routines to optimize your nutrition
              and performance.
            </p>
          </Link>

          <Link
            to="/pose-correction"
            className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform block"
          >
            <h3 className="text-2xl font-semibold text-orange-300">
              Real-Time Pose Correction
            </h3>
            <p className="mt-4 text-gray-400">
              Utilize advanced MoveNet AI technology for real-time exercise
              posture analysis. Get instant feedback and corrections to prevent
              injuries and maximize workout efficiency.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
