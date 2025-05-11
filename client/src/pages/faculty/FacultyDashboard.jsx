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
console.log(events);

  return (
    <div className="faculty-dashboard bg-red-100 ">
      <div className="main-grid ">
        <div className="left-column">
          <FacultyInfoBox faculty={facultyInfo} />
        </div>

        <div className="right-column">
          <EventListBox events={events}  />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="create-box">
          <button onClick={() => setShowCreateEvent(!showCreateEvent)}>
            {showCreateEvent ? "Close Event Form":"Create New Event"  }
          </button>
          {showCreateEvent && <CreateEvent showCreateEvent/>}
        </div>
        <UpcomingEventsBox />
      </div>
    </div>
  );
};

export default FacultyDashboard;