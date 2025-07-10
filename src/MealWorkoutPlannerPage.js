import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const MealWorkoutPlanner = ({ user }) => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    dietPreference: "",
    fitnessGoal: "",
    healthConditions: "",
  });

  const [mealPlan, setMealPlan] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);
  const [isPlanSaved, setIsPlanSaved] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePlan = (e) => {
    // if (!user) {
    //   alert("User not found. Please log in.");
    //   navigate("/login");
    //   return;
    // }
    e.preventDefault();

    const generatedMealPlan = `Meal Plan for ${formData.dietPreference} diet: Breakfast - Oats, Lunch - Grilled Chicken Salad, Dinner - Quinoa and Vegetables.`;
    const generatedWorkoutPlan = `Workout Plan for Goal "${formData.fitnessGoal}": 3x Week - Full-body strength training with Cardio on off-days.`;

    setMealPlan(generatedMealPlan);
    setWorkoutPlan(generatedWorkoutPlan);
    setIsPlanGenerated(true);
    setIsPlanSaved(false); // Reset save status
  };

  const savePlan = async () => {
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/save-plan", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          age: formData.age,
          weight: formData.weight,
          height: formData.height,
          dietPreference: formData.dietPreference,
          healthConditions: formData.healthConditions,
          fitnessGoal: formData.fitnessGoal,
          generatedMealPlan: mealPlan,
          generatedWorkoutPlan: workoutPlan,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are sent with request
      });

      const result = await response.json();
      if (result.success) {
        setIsPlanSaved(true);
        alert("Plan saved successfully!");
      } else {
        throw new Error("Failed to save plan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving plan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <div className="py-40 px-10 max-w-3xl mx-auto">
        {!isPlanGenerated ? (
          <>
            <h2 className="text-4xl font-bold text-center text-orange-400 mb-12">
              AI-Powered Meal & Workout Planner
            </h2>
            <form
              onSubmit={generatePlan}
              className="bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="mb-4">
                <label className="block text-gray-300">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Diet Preference</label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                >
                  <option value="">Select</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Fitness Goal</label>
                <input
                  type="text"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  placeholder="Example: Lose Weight, Build Muscle"
                  required
                  style={{ fontSize: "0.875rem" }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Health Conditions</label>
                <input
                  type="text"
                  name="healthConditions"
                  value={formData.healthConditions}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                  placeholder="Example: Diabetes, Hypertension"
                  style={{ fontSize: "0.875rem" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-orange-800 transition"
              >
                Generate My Meal Plan and Workout Plan
              </button>
            </form>
          </>
        ) : (
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold text-orange-400 mb-4">
              Generated Meal Plan
            </h3>
            <p className="text-gray-300">{mealPlan}</p>

            <h3 className="text-3xl font-semibold text-orange-400 mt-8 mb-4">
              Generated Workout Plan
            </h3>
            <p className="text-gray-300">{workoutPlan}</p>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setIsPlanGenerated(false)}
                className="flex-1 bg-gray-600 px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Back
              </button>
              <button
                onClick={savePlan}
                className={`flex-1 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition ${
                  isPlanSaved
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-800"
                }`}
                disabled={isPlanSaved}
              >
                {isPlanSaved ? "Plan Saved" : "Save Plan"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealWorkoutPlanner;
