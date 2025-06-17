import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/adminDashboard.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BASE_URL}/admin/event/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events", err));
  }, []);

  const handleStatus = async (status, E_id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/admin/event/${status}`,
        { E_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // Update UI immediately:
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.E_id === E_id
            ? {
                ...event,
                ConfirmationStatus: status === "approve" ? 1 : 2,
              }
            : event
        )
      );
    } catch (error) {
      console.error("Status update failed:", error.message);
      alert("Failed to update event status.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Event Approvals</h2>
      {events.map((event) => (
        <div key={event.E_id} className="event-card">
          <h3>{event.E_title}</h3>
          <p>
            <strong>Type:</strong> {event.E_type}
          </p>
          <p>
            <strong>Organizer:</strong> {event.Organizer}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.Time}
          </p>
          <p>
            <strong>Venue:</strong> {event.V_name}
          </p>

          <div className="button-group">
            {event.ConfirmationStatus === 0 ? (
              <>
                <button onClick={() => handleStatus("approve", event.E_id)}>
                  Approve
                </button>
                <button onClick={() => handleStatus("reject", event.E_id)}>
                  Reject
                </button>
              </>
            ) : event.ConfirmationStatus === 1 ? (
              <>
                <span className="approved-tag">Approved</span>
                <button
                  onClick={() =>
                    navigate(`/admin/view-participants/${event.E_id}`)
                  }
                >
                  View Participants
                </button>
              </>
            ) : (
              <span className="rejected-tag">Rejected</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
