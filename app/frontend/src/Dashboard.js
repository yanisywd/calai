import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Make sure to create this CSS file

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Full response:", response.data);
        if (response.data) {
          setUser(response.data.user);
          setMeals(response.data.meals);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to see your meals.</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>{`Welcome, ${user.username}`}</h1>
      <h2>Your Saved Meals:</h2>
      <div className="meal-list">
        {meals && meals.length > 0 ? (
          meals.map((meal, index) => (
            <div key={index} className="meal-card">
              <div className="meal-header">
                <h3>{meal.meal_type.toUpperCase()}</h3>
                <p>{`Date: ${meal.created_at}`}</p>
              </div>
              <div className="meal-info">
                <p><strong>Total Calories:</strong> {meal.total_calories} kcal</p>
                <h4>Aliments:</h4>
                <ul className="aliments-list">
                  {meal.aliments.map((item, idx) => (
                    <li key={idx} className="aliment-item">
                      <span className="aliment-name">{item.nom}</span> - 
                      <span className="aliment-category">{item.categorie}</span> |
                      <span className="aliment-weight">{item["poids (g)"]}g</span> |
                      <span className="aliment-calories">{item.calories} kcal</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No meals saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
