import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import '../../styles/main.css';

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.STUDENT.GET_INFO, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudentInfo(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch student information');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      
      {studentInfo && (
        <div className="student-info">
          <h3>Your Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Name:</strong> {studentInfo.S_name}
            </div>
            <div className="info-item">
              <strong>Student ID:</strong> {studentInfo.S_id}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {studentInfo.S_email}
            </div>
            <div className="info-item">
              <strong>Department:</strong> {studentInfo.S_department}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <h3>Available Events</h3>
        <p>No events available at the moment.</p>
      </div>

      <div className="dashboard-section">
        <h3>Registered Events</h3>
        <p>You haven't registered for any events yet.</p>
      </div>
    </div>
  );
};

export default StudentDashboard; 