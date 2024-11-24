import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);


  const navigate = useNavigate(); // Use useNavigate hook

  const handleAuthChange = () => {
    setIsRegistering(!isRegistering);
    if (!isRegistering) {
      // Immediately navigate to FirstPage when user clicks on Register
      navigate("/"); 
    }
  };

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
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
      } else {
        alert("Registration error: " + data.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  // Login user
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
        
        // Call onLogin to notify the parent component that the user is logged in
        onLogin(username);
        
        alert("Login successful!");
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      registerUser();
    } else {
      loginUser();
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={handleAuthChange}>
        {isRegistering ? "Already have an account? Log in" : "No account? Register"}
      </button>
    </div>
  );
};

export default Auth;




// reglemente bloquer

// 6kva 