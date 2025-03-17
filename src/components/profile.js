import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css"; // You can add custom styles in this file

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  const fetchUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User data not found");
          }
        } else {
          console.log("User is not logged in");
        }
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Set loading state to false once data is fetched
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="profile-container">
      {loading ? (
        <div className="loading-message">Loading...</div> // Better loading state
      ) : userDetails ? (
        <>
          <div className="profile-header">
            <img
              src={userDetails.photo}
              alt="Profile"
              className="profile-img"
            />
            <h3 className="welcome-message">
              Welcome, {userDetails.firstName} 🙏
            </h3>
          </div>
          <div className="user-details">
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            {/* <p><strong>Last Name:</strong> {userDetails.lastName}</p> */}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p className="no-user">User data not found</p>
      )}
    </div>
  );
}

export default Profile;
