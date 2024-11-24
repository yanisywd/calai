import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./FirstPage.css"; // For animations and styles

const FirstPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate(); // Initialize the navigate hook

  // Define the questions
  const questions = [
    { label: "Username", value: username, setter: setUsername },
    { label: "Password", value: password, setter: setPassword },
    { label: "Age", value: age, setter: setAge },
  ];

  // Register user
  const registerUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Logging you in...");
        await loginUser(); // Log the user in immediately after registration
      } else {
        alert("Registration error: " + data.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      setIsSubmitting(false);
    }
  };

  // Log the user in and get the token
  const loginUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the token and username in localStorage after a successful login
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", username);
        alert("Login successful!");
        await saveUserInfo(); // Proceed to save additional user info after login
      } else {
        alert("Login failed: " + data.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      setIsSubmitting(false);
    }
  };

  // Save user info (age)
  const saveUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/save_user_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ age }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User information saved successfully!");
        setIsSubmitting(false);
        navigate("/app"); // Redirect to /app after successful submission
      } else {
        alert("Error saving user info: " + data.detail);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !age) {
      alert("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    await registerUser();
  };

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle "Enter" press to go to next question
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  // Handle "Login" button click to directly go to /app
  const handleLoginRedirect = () => {
    navigate("/app"); // Redirect to the /app route immediately
  };

  return (
    <div
      className="questionnaire-container"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <h2>Register and Provide Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="question-container">
          <label>{questions[currentQuestionIndex].label}</label>
          <input
            type={currentQuestionIndex === 1 ? "password" : "text"}
            value={questions[currentQuestionIndex].value}
            onChange={(e) =>
              questions[currentQuestionIndex].setter(e.target.value)
            }
            required
            autoFocus
          />
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </form>

      <div className="login-button-container">
        {/* Button to login directly and redirect to /app */}
        <button onClick={handleLoginRedirect}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default FirstPage;
