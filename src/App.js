import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./Login";
import UserProfile from "./UserProfile";
import EventRegistrationForm from "./eventReg";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <nav className="navbar">
            <div className="logo">Logo</div>
            <div className="nav-items">
              <Link to="#home">Home</Link>
              <Link to="#about">About</Link>
              <Link to="#team">Team</Link>
            </div>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </nav>
          <main>
            <Routes>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/" element={<h1>Welcome to My App</h1>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route
                path="/user-info/ideathon"
                element={<EventRegistrationForm eventId="ideathon" />}
              />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
