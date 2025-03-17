import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Sample data for accidents
  const [activeAccidents, setActiveAccidents] = useState([
    {
      id: 1,
      accidentPlace: "Highway 21",
      location: "Latitude: 34.0522, Longitude: -118.2437",
      injuredPersons: 2,
    },
    {
      id: 2,
      accidentPlace: "Main Street",
      location: "Latitude: 36.7783, Longitude: -119.4179",
      injuredPersons: 1,
    },
    {
      id: 3,
      accidentPlace: "bharadwaj street",
      location: "Latitude: 36.7783, Longitude: -119.4179",
      injuredPersons: 1,
    }
  ]);

  const [dealtAccidents, setDealtAccidents] = useState([
    {
      id: 3,
      accidentPlace: "Park Avenue",
      location: "Latitude: 40.7128, Longitude: -74.0060",
      injuredPersons: 3,
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("active");

  // Function to handle the click and navigate to the detailed notification page
  const handleAccidentClick = (accident) => {
    navigate("/notifications", { state: { accident } });
  };

  // Function to mark accident as dealt
  const markAsDealt = (accidentId) => {
    const accident = activeAccidents.find((a) => a.id === accidentId);
    if (accident) {
      // Remove accident from active list and add it to dealt list
      setActiveAccidents(activeAccidents.filter((a) => a.id !== accidentId));
      setDealtAccidents([...dealtAccidents, accident]);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    // For example, navigate to the login page or clear user session
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="page-title">Accident Alert System</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === "active" ? "active" : ""}`}
          onClick={() => setSelectedTab("active")}
        >
          Active Accidents
        </button>
        <button
          className={`tab-button ${selectedTab === "dealt" ? "active" : ""}`}
          onClick={() => setSelectedTab("dealt")}
        >
          Dealt Accidents
        </button>
      </div>

      <div className="accidents-list">
        {selectedTab === "active"
          ? activeAccidents.map((accident) => (
              <div key={accident.id} className="accident-item">
                <p><strong>Accident No:</strong> {accident.id}</p>
                <p><strong>Place:</strong> {accident.accidentPlace}</p>
                <p><strong>Location:</strong> {accident.location}</p>
                <p><strong>Injured Persons:</strong> {accident.injuredPersons}</p>
                <div className="action-buttons">
                  {/* Button to navigate to the detailed page */}
                  <button className="details-button" onClick={() => handleAccidentClick(accident)}>View Details</button>
                  {/* Button to mark the accident as dealt */}
                  <button className="mark-dealt-button" onClick={() => markAsDealt(accident.id)}>Mark as Dealt</button>
                </div>
              </div>
            ))
          : dealtAccidents.map((accident) => (
              <div key={accident.id} className="accident-item">
                <p><strong>Accident No:</strong> {accident.id}</p>
                <p><strong>Place:</strong> {accident.accidentPlace}</p>
                <p><strong>Location:</strong> {accident.location}</p>
                <p><strong>Injured Persons:</strong> {accident.injuredPersons}</p>
                <div className="action-buttons">
                  {/* Button to navigate to the detailed page */}
                  <button className="details-button" onClick={() => handleAccidentClick(accident)}>View Details</button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
