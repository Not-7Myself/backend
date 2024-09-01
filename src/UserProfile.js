import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import "./UserProfile.css";

function UserProfile() {
  const { user, updateUser, logout, addEvent, loading } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    username: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        schoolName: user.schoolName || "",
        username: user.username || "",
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <p>No user data available. Please log in again.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user: ", error);
      alert("Failed to update user. Please try again.");
    }
  };
  const handleClick = (e) => {
    const eventId = e.target.id;
    addEvent(eventId, user);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
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
            />
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>School Name:</strong> {user.schoolName}
          </p>
          <p>
            <strong>User Name:</strong> {user.username}
          </p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      <button onClick={logout} className="logout-button">
        Log Out
      </button>
      <br />
      <button id="ideathon" onClick={handleClick}>
        Ideathon
      </button>
    </div>
  );
}

export default UserProfile;
