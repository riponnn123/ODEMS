import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/studentDashboard.css';
import UpcomingEventsBox from '../../components/faculty/UpcomingEventsBox'; // Reused component
import NewsBox from '../../components/student/NewsBox';
import RegisteredEventsBox from '../../components/student/RegisteredEventsBox';

const BASE_URL = "http://localhost:7777/api";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const info = await axios.get(`${BASE_URL}/students/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setStudentInfo(info.data);
    } catch (err) {
      console.error("Dashboard load error:", err.message);
      setError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <h2 className="dashboard-title">Student Dashboard</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-grid">
        <div className="grid-item">
          <h3 className="box-title">Student Info</h3>
          {studentInfo ? (
            <div className="info-content">
              <p><strong>Name:</strong> {studentInfo.S_name}</p>
              <p><strong>ID:</strong> {studentInfo.S_id}</p>
              <p><strong>Email:</strong> {studentInfo.S_email}</p>
            </div>
          ) : (
            <p>No student information available.</p>
          )}
        </div>

        <div className="grid-item">
          <h3 className="box-title">Participating Upcoming Events</h3>
          <UpcomingEventsBox />
        </div>

        <div className="grid-item">
          <h3 className="box-title">News & Notifications</h3>
          <NewsBox />
        </div>

        <div className="grid-item">
          <h3 className="box-title">Registered Events</h3>
          <RegisteredEventsBox />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
