import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const BASE_URL = "http://localhost:7777/api";

const EventDetails = () => {
  const { E_id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/events/event-details/${E_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [E_id]);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/participant/register`, { E_id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Registered successfully!");
      navigate("/student/dashboard");
    } catch (err) {
      alert("Error registering for event.");
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="error">Event not found.</div>;

  return (
    <div className="event-details-container">
      <h2>{event.E_title}</h2>
      <p><strong>Type:</strong> {event.E_type}</p>
      <p><strong>Organizer:</strong> {event.Organizer}</p>
      <p><strong>Date:</strong> {new Date(event.Date).toLocaleDateString("en-IN")}</p>
      <p><strong>Time:</strong> {event.Time}</p>
      <p><strong>Duration:</strong> {event.Duration} hrs</p>
      <p><strong>Venue:</strong> {event.V_name}</p>

      {event.E_type === "Meeting" && (
        <>
          <h4>Agenda:</h4>
          <p>{event.Agenda}</p>
          <h4>Members:</h4>
          <ul>
            {event.Members?.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
          <h4>Points to Discuss:</h4>
          <ul>
            {event.Points?.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </>
      )}

      {event.E_type === "Workshop" && (
        <>
          <h4>Topics:</h4>
          <ul>
            {event.Topics?.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <h4>Trainers:</h4>
          <ul>
            {event.Trainers?.map((tr, i) => <li key={i}>{tr}</li>)}
          </ul>
        </>
      )}

      {event.E_type === "Conferences" && (
        <>
          <h4>Theme:</h4>
          <p>{event.Theme}</p>
          <h4>Speakers:</h4>
          <ul>
            {event.Speakers?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </>
      )}

      <button className="register-btn" onClick={handleRegister}>
        Register for this Event
      </button>
    </div>
  );
};

export default EventDetails;
