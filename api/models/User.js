const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;

async function handleSubmit(e) {
  e.preventDefault();
  console.log(formData);

  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("Server Response:", result); // Log server response

    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Check the console.");
  }
}
