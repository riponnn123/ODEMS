import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api";

const EventDetailPage = () => {
  const { E_id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/events/full/${E_id}`, { withCredentials: true })
      .then(res => setEvent(res.data))
      .catch(err => setMessage("Error fetching event"));
  }, [E_id]);

  const handleRegister = async () => {
    try {
      await axios.post(`${BASE_URL}/participate`, { E_id }, {
        withCredentials: true
      });
      navigate("/faculty/dashboard"); // or /student/dashboard
    } catch (err) {
      setMessage("Error registering");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-detail">
      <h2>{event.E_title}</h2>
      <p><strong>Type:</strong> {event.E_type}</p>
      <p><strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.Time}</p>
      <p><strong>Duration:</strong> {event.Duration} hours</p>
      <p><strong>Venue:</strong> {event.V_name}</p>
      <p><strong>Organizer:</strong> {event.Organizer}</p>

      {event.E_type === "Meeting" && (
        <>
          <p><strong>Agenda:</strong> {event.Agenda}</p>
        </>
      )}
      {event.E_type === "Workshop" && (
        <>
          <p><strong>Topics:</strong> {event.Topics.join(", ")}</p>
          <p><strong>Trainers:</strong> {event.Trainers.join(", ")}</p>
        </>
      )}
      {event.E_type === "Conferences" && (
        <>
          <p><strong>Theme:</strong> {event.Theme}</p>
          <p><strong>Speakers:</strong> {event.Speakers.join(", ")}</p>
        </>
      )}

      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventDetailPage;
