// src/components/faculty/CompletedEventsBox.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const CompletedEventsBox = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BASE_URL}/events/completed`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCompletedEvents(res.data))
      .catch((err) => console.error("Completed events fetch error", err));
  }, []);

  return (
    <div className="completed-events-box">
      <h3>Completed Events</h3>
      {completedEvents.length === 0 ? (
        <p>No completed events found.</p>
      ) : (
        completedEvents.map((e) => (
          <div
            key={e.E_id}
            className="event-overview-card"
            onClick={() => navigate(`/events/postfinalize/${e.E_id}`)}
          >
            <h4>{e.E_title}</h4>
            <p>
              <strong>Date:</strong> {new Date(e.Date).toLocaleDateString("en-IN")}
            </p>
            <p>
              <strong>Time:</strong> {e.Time}
            </p>
            <p>
              <strong>Venue:</strong> {e.V_name || e.V_id}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedEventsBox;
