import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./login.js";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, fname, lname } = formData;

    if (!fname || !lname || !email || !password) {
      toast.error("All fields are required", { position: "top-center" });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });

      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Registration error:", error.message);

      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }

      toast.error(errorMessage, { position: "bottom-center" });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>&nbsp; AdoptASideKick🐾 <br></br>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
