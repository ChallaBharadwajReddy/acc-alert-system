import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { db, rdb } from './firebase';
import { ref, onValue, update } from "firebase/database";
import { FaCarCrash, FaCheckCircle } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();

  const [activeAccidents, setActiveAccidents] = useState([]);
  const [dealtAccidents, setDealtAccidents] = useState([]);
  const [selectedTab, setSelectedTab] = useState("active");

  useEffect(() => {
    const accidentRef = ref(rdb, "accidents/");

    const unsubscribe = onValue(accidentRef, (snapshot) => {
      const active = [];
      const dealt = [];

      snapshot.forEach((accident) => {
        const data = accident.val();
        if (data.status === 'active') {
          active.push({ id: accident.key, ...data });
        } else {
          dealt.push({ id: accident.key, ...data });
        }
      });

      setActiveAccidents(active.sort((a, b) => b.accident_no - a.accident_no));
      setDealtAccidents(dealt.sort((a, b) => b.accident_no - a.accident_no));
    });

    return () => unsubscribe();
  }, []);

  const handleAccidentClick = (accident) => {
    navigate("/notifications", { state: { accident } });
  };

  const markAsDealt = (accidentId) => {
    const accident = activeAccidents.find((a) => a.id === accidentId);
    if (accident) {
      setActiveAccidents(activeAccidents.filter((a) => a.id !== accidentId));
      setDealtAccidents([...dealtAccidents, { ...accident, status: 'dealt' }]);

      const accidentRef = ref(rdb,`accidents/${accidentId}`);
      update(accidentRef, { status: "dealt" })
        .then(() => console.log("Accident marked as dealt successfully!"))
        .catch((error) => console.error("Error updating accident:", error));
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="page-title">🚨 Accident/emergency Alert System</h1>
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
  {(selectedTab === "active" ? activeAccidents : dealtAccidents).map((accident) => (
      <div key={accident.id} className="accident-item">
        <div className="accident-icon">
          {selectedTab === "active" ? (
            accident.type === 1 ? (
              <MdMedicalServices color="red" size={40} />
            ) : (
              <FaCarCrash color="red" size={40} />
            )
          ) : (
            <FaCheckCircle color="green" size={40} />
          )}
        </div>
        <div className="accident-details">
          <p><strong>Accident No:</strong> {accident.accident_no}</p>
          <p><strong>Place:</strong> {accident.place}</p>
          <p><strong>Location:</strong> {accident.latitude} {accident.longitude}</p>
          <p><strong>Time:</strong> {accident.time}</p>
        </div>
        <div className="action-buttons">
          <button className="details-button" onClick={() => handleAccidentClick(accident)}>View Details</button>
          {selectedTab === "active" && (
            <button className="mark-dealt-button" onClick={() => markAsDealt(accident.id)}>Mark as Dealt</button>
          )}
        </div>
      </div>
  ))}
</div>
    </div>
  );
};

export default Home;