import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:7777/api";

const ViewParticipants = () => {
  const { E_id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BASE_URL}/admin/participants/${E_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setParticipants(res.data))
    .catch(err => console.error("Fetch error:", err));
  }, [E_id]);

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="participants-page">
      <h2>Participants for Event #{E_id}</h2>
      <input
        type="text"
        placeholder="Search by name/email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "16px" }}
      />
      <table className="participants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewParticipants;
