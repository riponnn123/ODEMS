import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/event.css';

function EventDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="event-details">
        <h1>Event ID: {id}</h1>
        <p>Event details will be shown here.</p>
      </div>
    </>
  );
}

export default EventDetails;
