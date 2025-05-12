const EventListBox = ({ events }) => {
  
  //console.log(events)

  return (
    <div className="event-list-box">
      <h3>Event List</h3>
      <table>
        <thead>
          <tr>
            <th>No.</th><th>Title</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.E_id}>
              <td>{index + 1}</td>
              <td>{event.E_title}</td>
              <td>{event.ConfirmationStatus === 1 ? "Approved" :event.ConfirmationStatus===0? "Pending":"Rejected"}</td>
              <td>
                {event.ConfirmationStatus === 1 ? (
                  <a href={`/events/prefinalize/${event.E_id}`}>Add Details</a>
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