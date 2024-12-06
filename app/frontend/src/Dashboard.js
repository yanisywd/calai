import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import AnimatedNavbar from './AnimatedNavbar';
import UserInfo from "./UserInfo";
import "./Dashboard.css";
import "./App.css";
import Auth from "./auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const [expandedDates, setExpandedDates] = useState({}); // Track expanded dates
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  // Logout functionality
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
    alert("Logged out successfully.");
  };

  // Group meals by date
  const groupedMeals = meals.reduce((acc, meal) => {
    const date = format(parseISO(meal.created_at), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meal);
    return acc;
  }, {});

  // Get the latest date
  const latestDate = Object.keys(groupedMeals).sort().reverse()[0];

  // Set the latest date as selected by default
  useEffect(() => {
    if (latestDate) {
      setSelectedDate(latestDate);
    }
  }, [groupedMeals, latestDate]);

  // Toggle expanded meals for a specific date
  const toggleDateExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date], // Toggle the expanded state
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to see your meals.</div>;
  }

  return (
    <div className="dashboard-container">
      <AnimatedNavbar 
        onHomeClick={() => navigate("/app")}
        onDashboardClick={() => {/* Already on dashboard */}}
        onLogoutClick={logoutUser}
        username={user.username}
      />
      
      <UserInfo user={user.username} onLogout={logoutUser} />

      <h1>{`Welcome, ${user.username}`}</h1>
      <h2>Your Saved Meals:</h2>

      {/* Display only dates */}
      <div className="dates-container">
        {Object.keys(groupedMeals).map((date) => (
          <div key={date} className="date-item">
            <div className="date-header" onClick={() => toggleDateExpand(date)}>
              <h3>{format(parseISO(date), "EEEE, MMMM do, yyyy")}</h3>
              {/* Arrow Icon */}
              <span className={`arrow ${expandedDates[date] ? "expanded" : ""}`}>
                &#x25BC; {/* Down arrow */}
              </span>
            </div>

            {/* Display meals for the selected and expanded date */}
            {expandedDates[date] && (
              <div className="date-section">
                <table className="meals-table">
                  <thead>
                    <tr>
                      <th>Meal Type</th>
                      <th>Total Calories</th>
                      <th>Aliments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedMeals[date].map((meal, index) => (
                      <tr key={index} className="meal-row">
                        <td>{meal.meal_type.toUpperCase()}</td>
                        <td>{meal.total_calories} kcal</td>
                        <td>
                          <ul>
                            {meal.aliments.map((item, idx) => (
                              <li key={idx}>
                                <strong>{item.nom}</strong> - {item.categorie},{" "}
                                {item["poids (g)"]}g, {item.calories} kcal
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
