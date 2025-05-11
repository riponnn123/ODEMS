import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api";

const PostFinalizeEvent = () => {
  const { E_id } = useParams();
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/events/postfinalize/${E_id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setMessage("Post-event data submitted!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="finalize-container">
      <h2>Submit Post-Event Data</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea name="Minutes" placeholder="Minutes of Meeting" onChange={handleChange} />
        <input name="Sessions" placeholder="Workshop Sessions" onChange={handleChange} />
        <input name="Papers" placeholder="Conference Papers" onChange={handleChange} />
        <button type="submit">Submit Post-Event</button>
      </form>
    </div>
  );
};

export default PostFinalizeEvent;
