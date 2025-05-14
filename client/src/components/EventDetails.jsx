import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const EventDetails = () => {
  const { E_id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BASE_URL}/events/event-details/${E_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setEvent(res.data))
      .catch(err => console.error("Error loading event:", err));
  }, [E_id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${BASE_URL}/participant/register`, { E_id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("You have successfully registered for the event!");
      navigate("/student/dashboard"); // or /faculty/dashboard
    } catch (err) {
      alert("Registration failed.");
    }
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-details">
      <h2>{event.E_title}</h2>
      <p><strong>Type:</strong> {event.E_type}</p>
      <p><strong>Organizer:</strong> {event.Organizer}</p>
      <p><strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.Time}</p>
      <p><strong>Duration:</strong> {event.Duration} hrs</p>
      <p><strong>Venue:</strong> {event.V_name}</p>

      {event.E_type === "Meeting" && (
        <p><strong>Agenda:</strong> {event.Agenda}</p>
      )}
      {event.E_type === "Workshop" && (
        <>
          <p><strong>Topics:</strong> {event.Topics}</p>
          <p><strong>Trainers:</strong> {event.Trainers}</p>
        </>
      )}
      {event.E_type === "Conferences" && (
        <>
          <p><strong>Theme:</strong> {event.Theme}</p>
          <p><strong>Speakers:</strong> {event.Speakers}</p>
        </>
      )}

      <button onClick={handleRegister}>Register for Event</button>
    </div>
  );
};

export default EventDetails;
