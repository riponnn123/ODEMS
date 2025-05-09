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
    V_name: "", // send venue name only
  });

  const [message, setMessage] = useState("");

  const venues = [
    { V_name: "Auditorium A" },
    { V_name: "Deans Gallery" },
    { V_name: "Conference Hall" },
    { V_name: "Seminar Hall" },
    { V_name: "Project Lab" },
    { V_name: "Smart Classroom" }
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
        }
    });
      setMessage("Event created and sent for approval.");
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
    <form className="create-event-form" onSubmit={handleSubmit}>
      {message && <p>{message}</p>}

      <input
        name="E_title"
        value={formData.E_title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />

      <select name="E_type" value={formData.E_type} onChange={handleChange}>
        <option value="Meeting">Meeting</option>
        <option value="Workshop">Workshop</option>
        <option value="Conferences">Conference</option>
      </select>

      <input
        type="date"
        name="Date"
        value={formData.Date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="Time"
        value={formData.Time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Duration"
        value={formData.Duration}
        onChange={handleChange}
        placeholder="Duration (in hours)"
        required
      />
      <input
        name="Organizer"
        value={formData.Organizer}
        onChange={handleChange}
        placeholder="Organizer Name"
        required
      />

      <select name="V_name" value={formData.V_name} onChange={handleChange} required>
        <option value="">Select Venue</option>
        {venues.map((venue) => (
          <option key={venue.V_name} value={venue.V_name}>
            {venue.V_name}
          </option>
        ))}
      </select>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
