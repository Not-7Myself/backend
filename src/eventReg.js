import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { db } from "./firebase";

function EventRegistrationForm({ eventId }) {
  const { user } = useUser();
  const [eventData, setEventData] = useState({
    participant_name: "",
    class: "",
    discord: "",
    phone_num: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (user) {
        try {
          const userRef = db.collection("registrations").doc(user.id);
          const userDoc = await userRef.get();

          if (userDoc.exists) {
            const events = userDoc.data().events || {};
            setEventData(
              events[eventId] || {
                participant_name: "",
                class: "",
                discord: "",
                phone_num: "",
              }
            );
          }
        } catch (error) {
          console.error("Error fetching event data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventData();
  }, [eventId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        const userRef = db.collection("registrations").doc(user.id);
        await userRef.update({
          [`events.${eventId}`]: eventData,
        });
        alert("Event updated successfully!");
      } catch (error) {
        console.error("Error updating event: ", error);
        alert("Failed to update event. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="event-registration-form">
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="participant_name">Participant Name</label>
          <input
            type="text"
            id="participant_name"
            name="participant_name"
            value={eventData.participant_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="class">Class</label>
          <select
            id="class"
            name="class"
            value={eventData.class}
            onChange={handleChange}
            required
          >
            <option value="">Select a class</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="discord">Discord Id</label>
          <input
            type="text"
            id="discord"
            name="discord"
            value={eventData.discord}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_num">Phone Number</label>
          <input
            type="text"
            id="phone_num"
            name="phone_num"
            value={eventData.phone_num}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EventRegistrationForm;
