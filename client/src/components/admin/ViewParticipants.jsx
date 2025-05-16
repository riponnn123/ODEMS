import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // this line is critical and must be placed AFTER jsPDF


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
  console.log("autoTable exists:", typeof jsPDF.prototype.autoTable); // should log: function


  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Participants List - ${eventTitle} (ID: ${E_id})`, 14, 15);

    const tableColumn = ["#", "Name", "Email", "Role"];
    const tableRows = [];

    participants.forEach((p, index) => {
      const role = p.user_role ?? "Unknown";

      const name =
        role === "student"
          ? p.S_name ?? "N/A"
          : `${p.F_fname ?? ""} ${p.F_lname ?? ""}`.trim();

      const email =
        role === "student" ? p.S_email ?? "N/A" : p.F_email ?? "N/A";

      tableRows.push([
        index + 1,
        name,
        email,
        role.charAt(0).toUpperCase() + role.slice(1),
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${eventTitle}_Participants.pdf`);
    console.log("PDF downloaded");
     // should log "function"

  };

  const filtered = participants.filter(
    (p) =>
      (p.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.id?.toLowerCase() || "").includes(search.toLowerCase())
  );
console.log(typeof jsPDF.prototype.autoTable);
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
        <button onClick={downloadPDF} className="download-btn">
          Download PDF
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
