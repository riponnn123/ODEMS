import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api";

const ViewParticipants = () => {
  const { E_id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/admin/participants/${E_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setParticipants(response.data);
        console.log("Participants fetched:", response.data);
      } catch (err) {
        console.error("Fetch participants failed:", err.message);
      }
    };
    fetchParticipants();
  }, [E_id]);

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="participants-page">
      <h2>Participants for Event ID: {E_id}</h2>
      <input
        type="text"
        placeholder="Search participants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {filtered.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <table className="participants-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i}>
                <td>{p.role}</td>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewParticipants;
