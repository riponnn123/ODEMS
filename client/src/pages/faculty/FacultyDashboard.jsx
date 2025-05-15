import { useEffect, useState } from "react";
import FacultyInfoBox from "../../components/faculty/FacultyInfoBox"
import EventListBox from "../../components/faculty/EventListBox";
import CreateEvent from "../../components/faculty/CreateEvent";
import UpcomingEventsBox from "../../components/faculty/UpcomingEventsBox";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api"; // 🛠 replace with your actual base URL

const FacultyDashboard = () => {
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(true);

  const fetchData = async () => {
    try {
      console.log("token in localStorage:", localStorage.getItem("token"));
      const info = await axios.get(`${BASE_URL}/faculties/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      //console.log("Faculty info:", info.data);
      setFacultyInfo(info.data);
    } catch (err) {
      console.error("Dashboard load error:", err.message);
    }
  };


  const fetchStatusEvents=async()=>{
    try{
      const eventRes = await axios.get(`${BASE_URL}/faculties/events/with/status`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        // withCredentials: true,
      });
      setEvents(eventRes.data);
      //console.log(eventRes.data);
      
    }
    catch(err){
      console.error("Error fetching events:", err.message);
    }
  }

  useEffect(() => {
    fetchData();
    fetchStatusEvents();
  }, []);

return (
  <div className="faculty-dashboard">
    <h2 className="dashboard-title">Faculty Dashboard</h2>

    <div className="main-grid">
      <div className="dashboard-box">
        <h3 className="box-title">Faculty Info</h3>
        <FacultyInfoBox faculty={facultyInfo} />
      </div>

      <div className="dashboard-box">
        <h3 className="box-title">Your Event List</h3>
        <div className="event-list-table">
          <EventListBox events={events} />
        </div>
      </div>
    </div>

    <div className="bottom-grid">
      <div className="create-box">
        <h3 className="box-title">Create New Event</h3>
        <button onClick={() => setShowCreateEvent(!showCreateEvent)}>
          {showCreateEvent ? "Close Form" : "Create New Event"}
        </button>
        {showCreateEvent && <CreateEvent showCreateEvent />}
      </div>

      <div className="dashboard-box">
        <h3 className="box-title">Upcoming Events</h3>
        <UpcomingEventsBox />
      </div>
    </div>
  </div>

  );
};

export default FacultyDashboard;