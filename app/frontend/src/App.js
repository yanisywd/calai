// import React, { useState, useEffect } from "react";

// import "./App.css";
// import Auth from "./auth";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [isMealSaved, setIsMealSaved] = useState(false);
//   const [mealType, setMealType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [user, setUser] = useState(null);

//   // Check for logged-in user on app load
//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     if (username) setUser(username);
//   }, []);

//   // Handle user logout
//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");

//     setUser(null);
//     setFile(null);
//     setResult(null);
//     setIsMealSaved(false);
//     setMealType("");
//     setLoading(false);
//     setImageSrc(null);

//     alert("Logged out successfully. All data has been cleared.");
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setImageSrc(URL.createObjectURL(selectedFile));
//   };

//   // Analyze image
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please select an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/analyze-image", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const jsonResponse = await response.json();
//         setResult(
//           jsonResponse.aliments ? jsonResponse : { error: "Unexpected response structure" }
//         );
//       } else {
//         setResult({ error: "Image analysis failed." });
//       }
//     } catch (error) {
//       setResult({ error: "An error occurred: " + error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save meal data
//   const handleSaveMeal = async () => {
//     if (!result || !mealType) {
//       alert("Please analyze the image and select a meal type before saving.");
//       return;
//     }

//     const mealData = { ...result, meal_type: mealType };

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to save a meal.");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/save-meal", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Pass token in the Authorization header
//         },
//         body: JSON.stringify(mealData),
//       });

//       if (response.ok) {
//         alert("🎉 Meal saved successfully!");
//         setIsMealSaved(true);
//       } else {
//         alert("Failed to save meal.");
//       }
//     } catch (error) {
//       alert("An error occurred: " + error.message);
//     }
//   };

//   // Meal type selection
//   const mealTypes = ["petit dej", "dejeuner", "diner"];

//   return (
//     <div className="app-container">
//       {!user ? (
//         <Auth onLogin={setUser} />
//       ) : (
//         <>
//           <nav>
//             <button onClick={() => setMealType("")}>Home</button>
//             <button onClick={() => window.location.href = "/dashboard"}>Dashboard</button>
//             <button onClick={logoutUser}>Logout</button>
//           </nav>

//           <header className="app-header">
//             <h1>🍽️ Food Image Analyzer</h1>
//             <div className="user-info">
//               <span>Welcome, {user}</span>
//               <button onClick={logoutUser}>Logout</button>
//             </div>
//           </header>

//           <div className="upload-container">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="file-input"
//             />
//             <button onClick={handleSubmit} disabled={loading}>
//               {loading ? "Analyzing..." : "Analyze Image"}
//             </button>
//           </div>

//           {result && (
//             <div className="result-container">
//               <div className="result-left">
//                 <img src={imageSrc} alt="Food Preview" className="image-preview" />
//               </div>
//               <div className="result-right">
//                 <h2>Analysis Result:</h2>
//                 <div className="grid-container">
//                   {Array.isArray(result.aliments) &&
//                     result.aliments.map((item, index) => (
//                       <div key={index} className="food-card">
//                         <h3>{item.nom}</h3>
//                         <p>Category: {item.categorie}</p>
//                         <ul className="stats-list">
//                           <li>Weight: {item["poids (g)"]}g</li>
//                           <li>Calories: {item.calories} kcal</li>
//                           <li>Proteins: {item["proteins (g)"]}g</li>
//                           <li>Glucides: {item["glucides (g)"]}g</li>
//                           <li>Lipides: {item["lipides (g)"]}g</li>
//                         </ul>
//                       </div>
//                     ))}
//                 </div>

//                 <div className="meal-type-container">
//                   <h3>Select Meal Type:</h3>
//                   <div className="meal-type-buttons">
//                     {mealTypes.map((type) => (
//                       <button
//                         key={type}
//                         className={`meal-type-button ${mealType === type ? "selected" : ""}`}
//                         onClick={() => setMealType(type)}
//                       >
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                   <button
//                     onClick={handleSaveMeal}
//                     className="save-button"
//                     disabled={isMealSaved}
//                   >
//                     {isMealSaved ? "Meal Saved ✅" : "Save Meal"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default App;





import React, { useState, useEffect } from "react";

import "./App.css";
import Auth from "./auth";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isMealSaved, setIsMealSaved] = useState(false);
  const [mealType, setMealType] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [user, setUser] = useState(null);

  // Check for logged-in user on app load
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUser(username);
  }, []);

  // Handle user logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setUser(null);
    setFile(null);
    setResult(null);
    setIsMealSaved(false);
    setMealType("");
    setLoading(false);
    setImageSrc(null);

    alert("Logged out successfully. All data has been cleared.");
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  // Analyze image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setResult(
          jsonResponse.aliments ? jsonResponse : { error: "Unexpected response structure" }
        );
      } else {
        setResult({ error: "Image analysis failed." });
      }
    } catch (error) {
      setResult({ error: "An error occurred: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  // Save meal data
  const handleSaveMeal = async () => {
    if (!result || !mealType) {
      alert("Please analyze the image and select a meal type before saving.");
      return;
    }

    const mealData = { ...result, meal_type: mealType };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save a meal.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/save-meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
        body: JSON.stringify(mealData),
      });

      if (response.ok) {
        alert("🎉 Meal saved successfully!");
        setIsMealSaved(true);
      } else {
        alert("Failed to save meal.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  // Meal type selection
  const mealTypes = ["petit dej", "dejeuner", "diner"];

  return (
    <div className="app-container">
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <>
          <nav>
            <button onClick={() => setMealType("")}>Home</button>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>;
            <button onClick={logoutUser}>Logout</button>
          </nav>

          <header className="app-header">
            <h1>🍽️ Food Image Analyzer</h1>
            <div className="user-info">
              <span>Welcome, {user}</span>
              <button onClick={logoutUser}>Logout</button>
            </div>
          </header>

          <div className="upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>

          {result && (
            <div className="result-container">
              <div className="result-left">
                <img src={imageSrc} alt="Food Preview" className="image-preview" />
              </div>
              <div className="result-right">
                <h2>Analysis Result:</h2>
                <div className="grid-container">
                  {Array.isArray(result.aliments) &&
                    result.aliments.map((item, index) => (
                      <div key={index} className="food-card">
                        <h3>{item.nom}</h3>
                        <p>Category: {item.categorie}</p>
                        <ul className="stats-list">
                          <li>Weight: {item["poids (g)"]}g</li>
                          <li>Calories: {item.calories} kcal</li>
                          <li>Proteins: {item["proteins (g)"]}g</li>
                          <li>Glucides: {item["glucides (g)"]}g</li>
                          <li>Lipides: {item["lipides (g)"]}g</li>
                        </ul>
                      </div>
                    ))}
                </div>

                <div className="meal-type-container">
                  <h3>Select Meal Type:</h3>
                  <div className="meal-type-buttons">
                    {mealTypes.map((type) => (
                      <button
                        key={type}
                        className={`meal-type-button ${mealType === type ? "selected" : ""}`}
                        onClick={() => setMealType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSaveMeal}
                    className="save-button"
                    disabled={isMealSaved}
                  >
                    {isMealSaved ? "Meal Saved ✅" : "Save Meal"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
