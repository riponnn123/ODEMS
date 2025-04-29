import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "../../config/api";
import "../../styles/main.css";

const fetchFac = async () => {
  const response = await axios.get(BASE_URL + "/faculties/info", {
    withCredentials: true,
  });
  console.log(response);;
};

const FacultyDashboard = () => {
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [events, setEvents] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* const fetchFacultyData = async () => {
    try {
      // console.log("token", token);
      console.log("infoResponse");
      const infoResponse = await axios.get(BASE_URL + "/faculties/info", {
        withCredentials: true,
      });

      setFacultyInfo(infoResponse.data);

      // Filter events by status
      const filteredEvents = {
        pending: eventsResponse.data.filter(
          (event) => event.ConfirmationStatus === "pending"
        ),
        approved: eventsResponse.data.filter(
          (event) => event.ConfirmationStatus === "approved"
        ),
        rejected: eventsResponse.data.filter(
          (event) => event.ConfirmationStatus === "rejected"
        ),
      };

      setEvents(filteredEvents);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch faculty information" + err.message);
      setLoading(false);
    }
  }; */
  useEffect(() => {
    fetchFacultyData();
  }, []);
  const EventCard = ({ event }) => (
    <div className={`event-card ${event.ConfirmationStatus}`}>
      <h4>{event.E_title}</h4>
      <div className="event-details">
        <p>
          <strong>Type:</strong> {event.E_type}
        </p>
        <p>
          <strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {event.Time}
        </p>
        <p>
          <strong>Duration:</strong> {event.Duration} hours
        </p>
        <p>
          <strong>Venue:</strong> {event.V_name}
        </p>
        <p>
          <strong>Status:</strong>
          <span className={`status-badge ${event.ConfirmationStatus}`}>
            {event.ConfirmationStatus}
          </span>
        </p>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Faculty Dashboard</h2>
      {error && <div className="error-message">{error}</div>}

      {facultyInfo && (
        <div className="faculty-info">
          <h3>Your Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Name:</strong> {facultyInfo.F_name}
            </div>
            <div className="info-item">
              <strong>Faculty ID:</strong> {facultyInfo.F_id}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {facultyInfo.F_email}
            </div>
            <div className="info-item">
              <strong>Department:</strong> {facultyInfo.F_department}
            </div>
          </div>
        </div>
      )}

      <div className="events-section">
        <div className="events-category">
          <h3>Pending Events</h3>
          <div className="events-list">
            {events.pending.length > 0 ? (
              events.pending.map((event) => (
                <EventCard key={event.E_id} event={event} />
              ))
            ) : (
              <p>No pending events</p>
            )}
          </div>
        </div>

        <div className="events-category">
          <h3>Approved Events</h3>
          <div className="events-list">
            {events.approved.length > 0 ? (
              events.approved.map((event) => (
                <EventCard key={event.E_id} event={event} />
              ))
            ) : (
              <p>No approved events</p>
            )}
          </div>
        </div>

        <div className="events-category">
          <h3>Rejected Events</h3>
          <div className="events-list">
            {events.rejected.length > 0 ? (
              events.rejected.map((event) => (
                <EventCard key={event.E_id} event={event} />
              ))
            ) : (
              <p>No rejected events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
