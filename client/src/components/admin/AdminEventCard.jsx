const AdminEventCard = ({ event, onDecision }) => {
  return (
    <div className="event-card">
      <h4>{event.E_title}</h4>
      <p><strong>Type:</strong> {event.E_type}</p>
      <p><strong>Organizer:</strong> {event.Organizer}</p>
      <p><strong>Venue:</strong> {event.V_name}</p>
      <p><strong>Date:</strong> {new Date(event.Date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.Time}</p>
      <p><strong>Status:</strong> {event.ConfirmationStatus ? "Approved" : "Pending"}</p>

      {!event.ConfirmationStatus && (
        <div className="actions">
          <button onClick={() => onDecision(event.E_id, "approve")}>Approve</button>
          <button onClick={() => onDecision(event.E_id, "reject")}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default AdminEventCard;
