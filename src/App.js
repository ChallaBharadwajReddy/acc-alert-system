import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import Notifications from "./components/Notifications"; // Import the Notifications component
import Home from "./components/Home"; // Import Home component
import { auth } from "./components/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} /> {/* Add Home Route */}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
