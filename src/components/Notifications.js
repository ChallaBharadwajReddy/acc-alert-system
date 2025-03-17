import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Notifications.css";

const Notifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const accident = location.state?.accident;

  if (!accident) {
    return <p>No accident details available</p>;
  }

  const [latitude, longitude] = accident.location
    .replace("Latitude: ", "")
    .replace("Longitude: ", "")
    .split(", ");

  // Handle mark as dealt
  const handleMarkDealt = () => {
    // Logic to convert the accident to dealt (you can update your backend or state here)
    console.log(`Accident ${accident.id} marked as dealt.`);
    // Navigate back to the home page
    navigate("/");
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="notifications-page">
      {/* Action Buttons on Top */}
      <div className="action-buttons">
        <button onClick={handleMarkDealt} className="mark-dealt-button">
          Mark as Dealt
        </button>
        <button onClick={handleBackToHome} className="back-to-home-button">
          Back to Home
        </button>
      </div>

      {/* Main Content - Accident Details + Map */}
      <div className="content-container">
        {/* Left Side: Accident Details */}
        <div className="notification-detail">
          <h2>Accident Details</h2>
          <p><strong>Accident No:</strong> {accident.id}</p>
          <p><strong>Accident Place:</strong> {accident.accidentPlace}</p>
          <p><strong>Location:</strong> {accident.location}</p>
          <p><strong>Number of Injured Persons:</strong> {accident.injuredPersons}</p>
        </div>

        {/* Right Side: Map */}
        <div className="map-container">
          <iframe
            title="Accident Location"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
