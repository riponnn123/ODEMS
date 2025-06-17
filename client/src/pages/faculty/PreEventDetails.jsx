import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7777/api";

const FinalizeEvent = () => {
  const navigate = useNavigate();
  const { E_id } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  //const [submitting, setSubmitting] = useState(false); // 🔹 added

  useEffect(() => {
    axios.get(`${BASE_URL}/events/get-event/${E_id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Event fetch error", err));
  }, [E_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (submitting) return; // ✅ prevent if already submitting

    // setSubmitting(true); // 🔐 disable further clicks
    // setMessage("");

    try {
      await axios.post(`${BASE_URL}/events/prefinalize/${E_id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setMessage("Pre-event details submitted!");
      setTimeout(() => {
      navigate("/faculty/dashboard");
      }, 1500);

    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!event) return <p>Loading event...</p>;


  return (
    <div className="finalize-container">
      <h2>Finalize {event.E_type} (Pre-event Details)</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {event.E_type === "Meeting" && (
          <>
            <textarea name="Agenda" placeholder="Agenda" onChange={handleChange} required />
            <input name="Members" placeholder="Presiding Members" onChange={handleChange} />
            <input name="Points" placeholder="Key Points" onChange={handleChange} />
          </>
        )}
        {event.E_type === "Workshop" && (
          <>
            <input name="Topics" placeholder="Topics" onChange={handleChange} />
            <input name="Trainers" placeholder="Trainers" onChange={handleChange} />
          </>
        )}
        {event.E_type === "Conferences" && (
          <>
            <input name="Theme" placeholder="Theme" onChange={handleChange} />
            <input name="Speakers" placeholder="Speakers" onChange={handleChange} />
          </>
        )}
        <button type="submit">Submit Pre-Event Details</button>
      </form>
    </div>
  );
};

export default FinalizeEvent;
