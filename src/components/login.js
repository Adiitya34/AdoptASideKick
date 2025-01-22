import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "./login.css";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully", { position: "top-center" });

      // Redirect to index2.html
      window.location.href = "/landingpage.html";
    } catch (error) {
      console.error("Login error:", error.message);

      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }

      toast.error(errorMessage, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3> &nbsp; AdoptASideKick🐾 <br></br>Login</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <p className="forgot-password text-right">
          New user? <a href="/register">Register Here</a>
        </p>
        <SignInwithGoogle />
      </form>
    </div>
  );
}

export default Login;
