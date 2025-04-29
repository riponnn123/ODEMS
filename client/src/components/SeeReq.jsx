import React, { useState, useEffect } from 'react';
import '../styles/main.css';

const SeeReq = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching requests
    const fetchRequests = async () => {
      try {
        // Replace with actual API call
        const mockRequests = [
          {
            id: 1,
            title: 'Document Request 1',
            status: 'Pending',
            date: '2024-04-28',
            requester: 'John Doe'
          },
          {
            id: 2,
            title: 'Document Request 2',
            status: 'Approved',
            date: '2024-04-27',
            requester: 'Jane Smith'
          }
        ];
        setRequests(mockRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="requests">
      <h2 className="mb-2">Document Requests</h2>
      <div className="card">
        <div className="flex justify-between mb-2">
          <h3>Recent Requests</h3>
          <button className="btn btn-primary">New Request</button>
        </div>
        <div className="requests-list">
          {requests.map(request => (
            <div key={request.id} className="card mb-1">
              <div className="flex justify-between items-center">
                <div>
                  <h4>{request.title}</h4>
                  <p className="text-muted">Requested by: {request.requester}</p>
                  <p className="text-muted">Date: {request.date}</p>
                </div>
                <span 
                  style={{ 
                    color: getStatusColor(request.status),
                    fontWeight: 'bold'
                  }}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeReq;
