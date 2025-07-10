import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar'; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <Navbar /> 

      <header className="text-center py-40 flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-xl">
          Elevate Your Fitness Journey
        </h2>
        <p className="mt-4 text-xl text-gray-300 max-w-xl">
          AI-driven meal plans & real-time workout analysis tailored just for you.
        </p>
        <div className="mt-6">
          <Link to="/signup" className="bg-orange-600 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-orange-800 transition-all">
            Get Started
          </Link>
        </div>
      </header>
      
      <section className="py-20 px-10 text-center">
        <h3 className="text-4xl font-semibold text-orange-400">Why Choose VisionFit AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg transform hover:scale-105 transition-all">
            <h4 className="text-2xl font-bold text-orange-300">AI-Powered Meal Plans</h4>
            <p className="mt-3 text-gray-400">Smart meal suggestions customized for your fitness goals.</p>
          </div>
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg transform hover:scale-105 transition-all">
            <h4 className="text-2xl font-bold text-orange-300">Real-Time Pose Analysis</h4>
            <p className="mt-3 text-gray-400">AI-driven posture correction for safe and effective workouts.</p>
          </div>
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg transform hover:scale-105 transition-all">
            <h4 className="text-2xl font-bold text-orange-300">Performance Insights</h4>
            <p className="mt-3 text-gray-400">Monitor progress and enhance your training with AI analytics.</p>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-gray-400 text-center py-6 border-t border-gray-700">
        <p className="text-lg">&copy; 2025 VisionFit AI. Designed for Excellence.</p>
      </footer>
    </div>
  );
};

export default HomePage;
