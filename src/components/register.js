import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      toast.success("User Registered Successfully!!", { position: "top-center" });
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h3 className="register-title">Sign Up</h3>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Sign Up</button>
        <p className="login-text">
          Already registered? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
