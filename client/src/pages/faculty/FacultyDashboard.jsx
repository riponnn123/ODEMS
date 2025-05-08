import React, { useEffect, useState } from "react";
import FacultyInfoBox from "../../components/faculty/FacultyInfoBox"
import EventListBox from "../../components/faculty/EventListBox";
import CreateEvent from "../../components/faculty/CreateEvent";
import UpcomingEventsBox from "../../components/faculty/UpcomingEventsBox";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api"; // 🛠 replace with your actual base URL

const FacultyDashboard = () => {
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const fetchData = async () => {
    try {
      console.log("token in localStorage:", localStorage.getItem("token"));
      const info = await axios.get(`${BASE_URL}/faculties/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Faculty info:", info.data);
      setFacultyInfo(info.data);
      

      const eventRes = await axios.get(`${BASE_URL}/faculties/requests`, {
        withCredentials: true,
      });
      setEvents(eventRes.data.data);
    } catch (err) {
      console.error("Dashboard load error:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="faculty-dashboard">
      <div className="main-grid">
        <div className="left-column">
          <FacultyInfoBox faculty={facultyInfo} />
        </div>

        <div className="right-column">
          <EventListBox events={events} faculty={facultyInfo} />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="create-box">
          <button onClick={() => setShowCreateEvent(!showCreateEvent)}>
            {showCreateEvent ? "Close Event Form" : "Create New Event"}
          </button>
          {showCreateEvent && <CreateEvent />}
        </div>
        <UpcomingEventsBox />
      </div>
    </div>
  );
};

export default FacultyDashboard;