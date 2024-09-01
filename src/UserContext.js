import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userRef = db.collection("registrations").doc(userId);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            setUser({ id: userId, ...userDoc.data() });
          } else {
            console.error("No user document found.");
            localStorage.removeItem("userId");
            setUser(null);
            navigate("/login");
          }
        } else {
          console.error("No user ID found in localStorage.");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  const updateUser = async (updatedUserData) => {
    if (user && user.id) {
      try {
        const userRef = db.collection("registrations").doc(user.id);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          await userRef.update(updatedUserData);
          setUser((prev) => ({ ...prev, ...updatedUserData }));
        } else {
          console.error("Document to update does not exist.");
          alert(
            "User data could not be updated because the document does not exist."
          );
        }
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    } else {
      console.error("No user or user ID available for update.");
      alert("Unable to update user data because no user is logged in.");
    }
  };

  const addEvent = async (eventId, user) => {
    if (user) {
      try {
        const userRef = db.collection("registrations").doc(user.id);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const data = userDoc.data();
          const events = data.events || {};

          if (events.hasOwnProperty(eventId)) {
            console.log("Event already exists");
            navigate(`/user-info/${eventId}`);

            return;
          }

          await userRef.update({
            [`events.${eventId}`]: {
              participant_name: "",
              class: "",
              discord: "",
              phone_num: "",
            },
          });
          navigate(`/user-info/${eventId}`);
          console.log("Event added successfully");
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error adding event: ", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, logout, addEvent, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
