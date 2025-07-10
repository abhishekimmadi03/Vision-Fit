import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { FaUser, FaWeight, FaDumbbell, FaAppleAlt, FaHeartbeat, FaClipboardList } from "react-icons/fa";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile Data:", data);
        if (data.user) setUser(data.user);
        if (data.plans && Array.isArray(data.plans)) {
          setPlans(data.plans);
        } else {
          console.log("No plans found for user");
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-8 pt-28 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-orange-400 text-center mb-6">
          {user ? `${user.name}'s Fitness Plans` : "Loading Profile..."}
        </h2>

        <div className="w-full max-w-6xl flex flex-col items-center">
          {user && plans.length > 0 ? (
            plans.map((plan, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-4xl mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <FaUser className="text-orange-400 text-3xl" />
                  <h4 className="text-2xl font-semibold text-orange-300">Plan {index + 1}</h4>
                </div>
                <div className="text-gray-300 space-y-3 text-base">
                  <p><FaClipboardList className="inline text-orange-400" /> <span className="font-semibold">Goal:</span> {plan.fitnessGoal}</p>
                  <p><FaWeight className="inline text-orange-400" /> <span className="font-semibold">Weight:</span> {plan.weight} kg</p>
                  <p><FaHeartbeat className="inline text-orange-400" /> <span className="font-semibold">Health:</span> {plan.healthConditions || "None"}</p>
                  <p><FaAppleAlt className="inline text-orange-400" /> <span className="font-semibold">Diet:</span> {plan.dietPreference}</p>
                </div>
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <p className="font-semibold text-orange-300 text-lg">Meal Plan</p>
                  <p className="text-gray-400 text-base">{plan.generatedMealPlan}</p>
                </div>
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <p className="font-semibold text-orange-300 text-lg">Workout Plan</p>
                  <p className="text-gray-400 text-base">{plan.generatedWorkoutPlan}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-base">No plans generated yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
