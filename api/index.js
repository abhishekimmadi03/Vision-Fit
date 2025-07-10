const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Plan = require("./models/Plan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const { Configuration, OpenAIApi, OpenAI } = require("openai");
// require("dotenv").config();

const secret = "qwertyuiop";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//connection to mongodb user name is "admin" password is "sjsu123"
mongoose.connect(
  "mongodb+srv://admin:sjsu123@userdata.xxbia.mongodb.net/?retryWrites=true&w=majority&appName=UserData"
);

// // OpenAI API Configuration
// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: "your-openai-api-key", // Replace with your actual API key
//     apiKey: process.env.OPENAI_API_KEY,
//   })
// );

//register endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(userDoc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create user" });
  }
});

//login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res.status(400).json({ message: "User not found" });
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        // Handle the error properly
        console.log(err);
        return res.status(500).json({ message: "Failed to generate token" });
      }
      res.cookie("token", token, { httpOnly: true }).json({
        success: true,
        user: { name: userDoc.name, email: userDoc.email },
      });
    });
  } else {
    res.status(400).json({ message: "Failed to login - wrong credentials" });
  }
});

// Logout Endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// // Generate Meal and Workout Plan Endpoint
// app.post("/generate-plan", async (req, res) => {
//   const {
//     age,
//     weight,
//     height,
//     dietPreference,
//     fitnessGoal,
//     healthConditions,
//     userId,
//   } = req.body;

//   try {
//     const prompt = `
//         Generate a personalized meal plan and workout plan based on the following details:
//         - Age: ${age}
//         - Weight: ${weight}kg
//         - Height: ${height}cm
//         - Diet Preference: ${dietPreference}
//         - Fitness Goal: ${fitnessGoal}
//         - Health Conditions: ${healthConditions || "None"}

//         Provide a detailed daily meal plan and workout routine.
//       `;

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//       max_tokens: 500,
//     });

//     const planText = response.data.choices[0].text.trim();

//     // Save generated plan to MongoDB
//     const plan = await Plan.create({
//       userId,
//       age,
//       weight,
//       height,
//       dietPreference,
//       fitnessGoal,
//       healthConditions,
//       generatedPlan: planText,
//     });

//     res.json({ success: true, plan });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating plan" });
//   }
// });

//save-plan endpoint
app.post("/save-plan", (req, res) => {
  const { token } = req.cookies; // Retrieve token from cookies

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    // const userId = mongoose.Types.ObjectId(decoded.id); // Extract user ID from token
    try {
      console.log("Decoded User ID (before conversion):", decoded.id);

      // Ensure userId is a valid ObjectId
      const userId = mongoose.Types.ObjectId.isValid(decoded.id)
        ? new mongoose.Types.ObjectId(decoded.id)
        : decoded.id;

      console.log("Final User ID:", userId);
      const {
        age,
        weight,
        height,
        dietPreference,
        healthConditions,
        fitnessGoal,
        generatedMealPlan,
        generatedWorkoutPlan,
      } = req.body;
      if (!age || !weight || !height || !dietPreference || !fitnessGoal) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const savedPlan = await Plan.create({
        userId,
        age,
        weight,
        height,
        dietPreference,
        healthConditions,
        fitnessGoal,
        generatedMealPlan,
        generatedWorkoutPlan,
      });

      console.log("Plan saved successfully:", savedPlan);
      res.json({ success: true, savedPlan });
    } catch (error) {
      console.error("Error saving plan:", error);
      res.status(500).json({ message: "Error saving plan" });
    }
  });
});

// Profile endpoint to fetch user details along with their saved plans
app.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      // Fetch user details excluding password
      const user = await User.findById(decoded.id).select(
        "name email age weight height dietPreference fitnessGoal healthConditions"
      );
      if (!user) {
        console.log("User not found in DB");
        return res.status(404).json({ message: "User not found" });
      }
      console.log("Fetched User:", user);
      // Fetch all plans associated with this user
      const plans = await Plan.find({ userId: decoded.id });

      console.log("Fetched Plans:", plans);

      res.json({ user, plans });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
