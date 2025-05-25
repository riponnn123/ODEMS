import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const UpcomingEventsBox = () => {
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
  .get(`${BASE_URL}/events/upcoming`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    //console.log("Full upcoming event data:", res.data); // 👈 check this
    setUpcoming(res.data);
  })
  .catch((err) => {
    console.error("Upcoming fetch error", err);
    setUpcoming([]);
  });
}, []);

  return (
  <div className="upcoming-events-box">
    <h3>Participate Upcoming Events</h3>

    {upcoming.length === 0 ? (
      <p>No upcoming events available.</p>
    ) : (
      <div className="event-list-scroll">
        {upcoming.map((e) => (
          <div
            key={e.E_id}
            className="event-overview-card"
            onClick={() => navigate(`/events/details/${e.E_id}`)}
          >
            <h4>{e.E_title}</h4>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(e.Date).toLocaleDateString("en-IN")}
            </p>
            <p>
              <strong>Time:</strong> {e.Time}
            </p>
            <p>
              <strong>Venue:</strong> {e.V_name || e.V_id}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
)
};


export default UpcomingEventsBox;
