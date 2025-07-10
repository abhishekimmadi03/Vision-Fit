import React from 'react';
import Navbar from './NavBar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white flex flex-col justify-center">
      <Navbar />

      <header className="py-20 px-6 text-center flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-xl">
          About VisionFit AI
        </h2>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          VisionFit AI is your all-in-one fitness companion, offering AI-powered solutions for meal plans, workout routines, and real-time pose corrections, all tailored to your unique goals.
        </p>
      </header>

      <section className="py-12 px-6 text-center bg-gray-800">
        <h3 className="text-4xl font-semibold text-orange-400 mb-6">How to Use VisionFit AI</h3>
        <div className="max-w-3xl mx-auto text-left">
          <ol className="list-decimal text-gray-300 text-lg space-y-4">
            <li><strong>Sign Up or Log In:</strong> Create an account to start using VisionFit AI.</li>
            <li><strong>Input Your Details:</strong> Fill out your age, weight, height, and fitness goals.</li>
            <li><strong>Get Your Meal Plan:</strong> Based on your details, VisionFit AI generates a personalized meal plan.</li>
            <li><strong>Get Your Workout Plan:</strong> Receive a tailored workout plan to help you reach your fitness goals.</li>
            <li><strong>Real-Time Pose Analysis:</strong> Upload an image or use your camera to analyze your posture and get feedback.</li>
          </ol>
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h3 className="text-4xl font-semibold text-orange-400 mb-8">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl">
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-bold text-orange-300">AI-Powered Meal & Workout Planner</h4>
            <p className="mt-3 text-gray-400">
              Get a personalized meal plan tailored to your diet preferences and fitness goals, as well as a custom workout routine to help you stay on track and achieve your desired results.
            </p>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-bold text-orange-300">Real-Time Pose Correction</h4>
            <p className="mt-3 text-gray-400">
              Ensure you're performing exercises with the correct posture through real-time feedback, minimizing injury risks and maximizing efficiency.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 border-t border-gray-700">
        <p className="text-lg">&copy; 2025 VisionFit AI. Designed for Excellence.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
