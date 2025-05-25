import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    E_title: "",
    E_type: "Meeting",
    Date: "",
    Time: "",
    Duration: "",
    Organizer: "",
    V_name: "",
  });

  const [message, setMessage] = useState("");

  const venues = [
    { V_name: "Auditorium A" },
    { V_name: "Deans Gallery" },
    { V_name: "Conference Hall" },
    { V_name: "Seminar Hall" },
    { V_name: "Project Lab" },
    { V_name: "Smart Classroom" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/events/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Event created and sent for approval.");
      alert("Event created and sent for approval.");
      setFormData({
        E_title: "",
        E_type: "Meeting",
        Date: "",
        Time: "",
        Duration: "",
        Organizer: "",
        V_name: "",
      });
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      {message && <p className="form-message">{message}</p>}

      <div className="create-form-row">
        <label>Event Title</label>
        <input
          type="text"
          name="E_title"
          value={formData.E_title}
          onChange={handleChange}
          placeholder="e.g. Workshop on IoT"
          required
        />
      </div>

      <div className="create-form-row">
        <label>Event Type</label>
        <select name="E_type" value={formData.E_type} onChange={handleChange}>
          <option value="Meeting">Meeting</option>
          <option value="Workshop">Workshop</option>
          <option value="Conferences">Conference</option>
        </select>
      </div>

      <div className="create-form-row">
        <label>Event Date</label>
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]} // sets today as the minimum selectable date
        />
      </div>


      <div className="create-form-row">
        <label>Event Time</label>
        <input
          type="time"
          name="Time"
          value={formData.Time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="create-form-row">
        <label>Duration (in hours)</label>
        <input
          type="number"
          name="Duration"
          value={formData.Duration}
          onChange={handleChange}
          min="1"
          placeholder="e.g. 2"
          required
        />
      </div>

      <div className="create-form-row">
        <label>Organizer Name</label>
        <input
          type="text"
          name="Organizer"
          value={formData.Organizer}
          onChange={handleChange}
          placeholder="e.g. Prof. A. Sharma"
          required
        />
      </div>

      <div className="create-form-row">
        <label>Venue</label>
        <select
          name="V_name"
          value={formData.V_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Venue</option>
          {venues.map((venue) => (
            <option key={venue.V_name} value={venue.V_name}>
              {venue.V_name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
