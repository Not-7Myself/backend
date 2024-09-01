import React, { useState } from "react";
import "./RegistrationPage.css";
import { db } from "./firebase";
import bcrypt from "bcryptjs";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    schoolName: "",

    username: "",
    password: "",
    events: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const schoolRef = db
        .collection("registrations")
        .where("schoolName", "==", formData.schoolName);
      const schoolSnapshot = await schoolRef.get();

      if (!schoolSnapshot.empty) {
        alert("School Name already exists. Please choose another one.");
        return;
      }

      const schoolName = formData.schoolName.trim().replace(/\s+/g, "_");

      await db.collection("registrations").doc(schoolName).set({
        schoolName: formData.schoolName,
        username: formData.username,
        password: hashedPassword,
        events: {},
      });

      alert("Registration successful!");
      setFormData({
        schoolName: "",
        username: "",
        password: "",
        events: {},
      });
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
