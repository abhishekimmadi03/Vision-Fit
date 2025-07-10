const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Schema for storing meal plans, exercise plans, and related data
const PlanSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  dietPreference: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  healthConditions: { type: String, default: "None" },
  generatedMealPlan: {
    type: String,
    required: true,
    default: "No meal plan generated yet",
  },
  generatedWorkoutPlan: {
    type: String,
    required: true,
    default: "No workout plan generated yet",
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp when the plan is created
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;
