import { React, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import FeaturesPage from "./FeaturesPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import MealWorkoutPlannerPage from "./MealWorkoutPlannerPage";
import PoseCorrectionPage from "./PoseCorrectionPage";
import SignUpPage from "./SignUpPage";
import UserProfilePage from "./UserProfilePage"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      const result = await response.json();
      if (result.user) {
        setUser(result.user); 
        console.log(user);
      }
    }
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route
            path="/meal-workout-planner"
            element={<MealWorkoutPlannerPage user={user} />}
          />
          <Route path="/pose-correction" element={<PoseCorrectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
