import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";


const BASE_URL = "http://localhost:7777/api";

const ViewParticipants = () => {
  const { E_id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventTitle, setEventTitle] = useState(""); // New
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get participants
        const response = await axios.get(
          `${BASE_URL}/admin/participants/${E_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setParticipants(response.data);

        // Get event title
        const eventRes = await axios.get(`${BASE_URL}/events/get-event/${E_id}`
        );
        setEventTitle(eventRes.data.E_title || "Event");

        console.log("Participants fetched:", response.data);
      } catch (err) {
        console.error("Fetch participants failed:", err.message);
      }
    };
    fetchParticipants();
  }, [E_id]);
  //console.log("autoTable exists:", typeof jsPDF.prototype.autoTable); // should log: function


  const downloadExcel = () => {
  const worksheetData = participants.map((p, i) => ({
    "#": i + 1,
    Name: p.name,
    ID: p.id,
    Email: p.email,
    Role: p.role.charAt(0).toUpperCase() + p.role.slice(1),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

  XLSX.writeFile(workbook, `Participants_Event_${eventTitle|| "Unknown"}.xlsx`);
};

  const filtered = participants.filter(
    (p) =>
      (p.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.id?.toLowerCase() || "").includes(search.toLowerCase())
  );
//console.log(typeof jsPDF.prototype.autoTable);
  return (
    <div className="participants-page">
      <h2>
        Participants for: <strong>{eventTitle}</strong> (ID: {E_id})
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search participants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button onClick={downloadExcel} className="download-btn">
          Download Excel
        </button>
      </div>

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
