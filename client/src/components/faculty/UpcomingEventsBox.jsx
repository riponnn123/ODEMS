import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:7777/api"; // 🛠 replace with your actual base URL

const UpcomingEventsBox = () => {
  const [upcoming, setUpcoming] = useState([]);

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/event/upcoming`, { headers: { withCredentials: true } })
  //     .then(res => setUpcoming(res.data))
  //     .catch(err => console.error("Upcoming fetch error", err));
  // }, []);

  const handleJoin = async (eventId) => {
    await axios.post(`${BASE_URL}/participant/join`, {
      eventId,
      facultyId: "F123" // 🛠 replace with dynamic ID via context or JWT
    }, { headers: { withCredentials: true } });
    alert("You joined the event!");
  };

  return (
    <div className="upcoming-events-box">
      <h3>Participate Upcoming Events</h3>
      {upcoming.map((e, i) => (
        <div key={e.E_id} className="event-row">
          <span>Event {i + 1}: {e.E_title}</span>
          <button onClick={() => handleJoin(e.E_id)}>Join</button>
        </div>
      ))}
    </div>
  );
};
export default UpcomingEventsBox;