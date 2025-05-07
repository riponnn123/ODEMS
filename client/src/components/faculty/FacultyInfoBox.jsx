import React from "react";

const FacultyInfoBox = ({ faculty }) => {
  if (!faculty) return <p>Loading faculty info...</p>;

  return (
    <div className="faculty-info-box">
      <h3>Faculty Dashboard</h3>
      <p><strong>Name:</strong> {faculty.F_fname} {faculty.F_lname}</p>
      <p><strong>Email:</strong> {faculty.F_email}</p>
      <p><strong>ID:</strong> {faculty.F_id}</p>
    </div>
  );
};

export default FacultyInfoBox;
