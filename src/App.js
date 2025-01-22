import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import { auth } from "./components/firebase";
import { signOut } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthChecked(true); // Indicate that auth check is complete
    });
    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user from Firebase
      setUser(null); // Clear the user state
      // Redirect to the login page after logout
      window.location.href = "/login";
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  if (!authChecked) {
    // Optionally show a loader or nothing until auth check is complete
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* Only show the navbar if a user is logged in */}
            {user && (
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <a className="navbar-brand" href="/profile">
                    Are you sure you want to logout?
                  </a>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </nav>
            )}
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/index2.html" /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/register"
                element={
                  user ? <Navigate to="/landingpage.html" /> : <SignUp />
                }
              />
              {/* Add any other routes you need */}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
