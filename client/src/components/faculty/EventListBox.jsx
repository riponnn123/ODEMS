import React from "react";
const EventListBox = ({ events }) => {
  const pending = events.filter(e => e.ConfirmationStatus === 0);
  const approved = events.filter(e => e.ConfirmationStatus === 1);

  return (
    <div className="event-list-box">
      <h3>Event List</h3>
      <table>
        <thead>
          <tr>
            <th>No.</th><th>Topic</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.E_id}>
              <td>{index + 1}</td>
              <td>{event.E_title}</td>
              <td>{event.ConfirmationStatus === 1 ? "Approved" : "Pending"}</td>
              <td>
                {event.ConfirmationStatus === 1 ? (
                  <a href={`/event/finalize/${event.E_id}`}>Add Details</a>
                ) : (
                  <span>Waiting</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EventListBox;