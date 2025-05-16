import { useNavigate } from "react-router-dom";

const AdminEventCard = ({ event, onDecision }) => {
  const navigate = useNavigate();

  const handleViewParticipants = () => {
    navigate(`/admin/participants/${event.E_id}`);
  };

  return (
    <div className="event-card">
      <h4>{event.E_title}</h4>
      <p>
        <strong>Type:</strong> {event.E_type}
      </p>
      <p>
        <strong>Organizer:</strong> {event.Organizer}
      </p>
      <p>
        <strong>Venue:</strong> {event.V_name}
      </p>
      <p>
        <strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {event.Time}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {event.ConfirmationStatus === 1
          ? "Approved"
          : event.ConfirmationStatus === 2
          ? "Rejected"
          : "Pending"}
      </p>

      {event.ConfirmationStatus === 0 && (
        <>
          <button onClick={() => handleStatus("approve", event.E_id)}>
            Approve
          </button>
          <button onClick={() => handleStatus("reject", event.E_id)}>
            Reject
          </button>
        </>
      )}

      {event.ConfirmationStatus === 1 && (
        <span className="approved-tag">Approved</span>
      )}

      {event.ConfirmationStatus === 2 && (
        <span className="rejected-tag">Rejected</span>
      )}
    </div>
  );
};

export default AdminEventCard;
