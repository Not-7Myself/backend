import React, { useState } from "react";
import { db } from "./firebase";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userRef = db
        .collection("registrations")
        .where("username", "==", username);
      const userSnapshot = await userRef.get();

      if (userSnapshot.empty) {
        alert("Club Name not found. Please check your credentials.");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      const isPasswordCorrect = await bcrypt.compare(
        password,
        userData.password
      );

      if (isPasswordCorrect) {
        localStorage.setItem("userId", userDoc.id);
        setUser(userData);
        navigate("/user-profile");
      } else {
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
