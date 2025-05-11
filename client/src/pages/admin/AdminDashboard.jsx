import { useEffect, useState } from "react";
import axios from "axios";
import AdminEventCard from "../../components/admin/AdminEventCard";

const BASE_URL = "http://localhost:7777/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/allevents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDecision = async (eventId, decision) => {
  try {
    const endpoint = decision === 1
      ? `${BASE_URL}/admin/approveRequest/${eventId}`
      : `${BASE_URL}/admin/rejectRequest/${eventId}`;

    await axios.post(endpoint, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    fetchEvents(); // Refresh events
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="event-list">
          {events.length > 0 ? (
            events.map(event => (
              <AdminEventCard
                key={event.E_id}
                event={event}
                onDecision={handleDecision}
              />
            ))
          ) : (
            <p>No pending events</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
