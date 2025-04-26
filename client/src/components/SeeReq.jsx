import axios from "axios";
import { useEffect, useState } from "react";
export const SeeReq = () => {
  const getAllRequests = async () => {
    const response = await axios.get(
      "http://localhost:7777/api/faculty/see-all-req"
    );
    return response;
  };
  const [allreq, setallreq] = useState([]);
  useEffect(() => {
    const get = async () => {
      const response = await getAllRequests();
      setallreq(response.data.data);
    };
    get();
  }, []);
  return (
    <div className="request-container">
      <div className="request-header">
        <span className="request-item">Title</span>
        <span className="request-item">Type</span>
        <span className="request-item">Date</span>
        <span className="request-item">Time</span>
        <span className="request-item">Venue ID</span>
        <span className="request-item">Organizers</span>
      </div>
      {allreq.map((req, index) => (
        <div key={index} className="request-row">
          <span className="request-item">{req.E_title}</span>
          <span className="request-item">{req.E_type}</span>
          <span className="request-item">{req.Date}</span>
          <span className="request-item">{req.Time}</span>
          <span className="request-item">{req.Venue_id}</span>
          <span className="request-item">{req.Organizer}</span>
          {req.confirmationStatus ? (
            <div className="status">APPROVED</div>
          ) : (
            <div className="status">PENDING</div>
          )}
        </div>
      ))}
    </div>
  );
};
