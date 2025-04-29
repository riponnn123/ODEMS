import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import '../../styles/main.css';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [events, setEvents] = useState({
    pending: [],
    approved: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [infoResponse, eventsResponse] = await Promise.all([
        axios.get(API_ENDPOINTS.ADMIN.GET_INFO, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(API_ENDPOINTS.EVENTS.GET_ALL, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setAdminInfo(infoResponse.data);
      
      // Filter events by status
      const filteredEvents = {
        pending: eventsResponse.data.filter(event => event.ConfirmationStatus === 'pending'),
        approved: eventsResponse.data.filter(event => event.ConfirmationStatus === 'approved'),
        rejected: eventsResponse.data.filter(event => event.ConfirmationStatus === 'rejected')
      };
      
      setEvents(filteredEvents);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch admin information');
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        API_ENDPOINTS.ADMIN.APPROVE_REQUEST(eventId),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAdminData();
    } catch (err) {
      setError('Failed to approve event');
    }
  };

  const handleReject = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        API_ENDPOINTS.ADMIN.REJECT_REQUEST(eventId),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAdminData();
    } catch (err) {
      setError('Failed to reject event');
    }
  };

  const EventCard = ({ event, showActions = false }) => (
    <div className={`event-card ${event.ConfirmationStatus}`}>
      <h4>{event.E_title}</h4>
      <div className="event-details">
        <p><strong>Type:</strong> {event.E_type}</p>
        <p><strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.Time}</p>
        <p><strong>Duration:</strong> {event.Duration} hours</p>
        <p><strong>Venue:</strong> {event.V_name}</p>
        <p><strong>Organizer:</strong> {event.Organizer}</p>
        <p><strong>Status:</strong> 
          <span className={`status-badge ${event.ConfirmationStatus}`}>
            {event.ConfirmationStatus}
          </span>
        </p>
      </div>
      {showActions && event.ConfirmationStatus === 'pending' && (
        <div className="event-actions">
          <button
            className="btn btn-success"
            onClick={() => handleApprove(event.E_id)}
          >
            Approve
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleReject(event.E_id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      
      {adminInfo && (
        <div className="admin-info">
          <h3>Your Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Name:</strong> {adminInfo.A_name}
            </div>
            <div className="info-item">
              <strong>Admin ID:</strong> {adminInfo.A_id}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {adminInfo.A_email}
            </div>
            <div className="info-item">
              <strong>Role:</strong> {adminInfo.A_role}
            </div>
          </div>
        </div>
      )}

      <div className="events-section">
        <div className="events-category">
          <h3>Pending Events</h3>
          <div className="events-list">
            {events.pending.length > 0 ? (
              events.pending.map(event => (
                <EventCard key={event.E_id} event={event} showActions={true} />
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
              events.approved.map(event => <EventCard key={event.E_id} event={event} />)
            ) : (
              <p>No approved events</p>
            )}
          </div>
        </div>

        <div className="events-category">
          <h3>Rejected Events</h3>
          <div className="events-list">
            {events.rejected.length > 0 ? (
              events.rejected.map(event => <EventCard key={event.E_id} event={event} />)
            ) : (
              <p>No rejected events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 