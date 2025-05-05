import React from "react";
import { db, rdb } from './firebase';
import { useLocation, useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import "./Notifications.css";

const Notifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const accident = location.state?.accident;

  if (!accident) {
    return <p>No accident details available</p>;
  }

  // Handle mark as dealt
  const handleMarkDealt = () => {
    // Logic to convert the accident to dealt (you can update your backend or state here)
    const accidentRef = ref(rdb,`accidents/${accident.id}`);
          update(accidentRef, { status: "dealt" })
            .then(() => console.log("Accident marked as dealt successfully!"))
            .catch((error) => console.error("Error updating accident:", error));
    console.log(`Accident ${accident.accident_id} marked as dealt.`);
    // Navigate back to the home page
    navigate("/home");
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate("/home");
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
          <p><strong>Accident No:</strong> {accident.accident_no}</p>
          <p><strong>Accident Place:</strong> {accident.place}</p>
          <p><strong>Location:</strong> {accident.latitude} {accident.longitude}</p>
          <p><strong>Time:</strong> {accident.time}</p>
        </div>

        {/* Right Side: Map */}
        <div className="map-container">
          <iframe
            title="Accident Location"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps?q=${accident.latitude},${accident.longitude}&hl=es&z=14&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
