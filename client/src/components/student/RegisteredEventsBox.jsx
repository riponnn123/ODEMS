// components/student/RegisteredEventsBox.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const RegisteredEventsBox = () => {
  const [registered, setRegistered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BASE_URL}/participants/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRegistered(res.data))
      .catch((err) => console.error("Registered events fetch error", err));
  }, []);

  return (
    <div className="registered-events-box">
      <h3>Registered Events</h3>
      {registered.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        registered.map((e) => (
          <div
            key={e.E_id}
            className="event-overview-card"
            onClick={() => navigate(`/events/details/${e.E_id}`)}
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

export default RegisteredEventsBox;
