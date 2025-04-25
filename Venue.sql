CREATE TABLE Venue (
    V_id VARCHAR(30) PRIMARY KEY,
    V_name VARCHAR(255) NOT NULL,
    V_availability BOOLEAN NOT NULL
);

INSERT INTO Venue (V_id, V_name, V_availability) VALUES
('V001', 'Auditorium A', TRUE),
('V002', 'Deans Gallery', TRUE),
('V003', 'Conference Hall', TRUE),
('V004', 'Seminar Hall', TRUE),
('V005', 'Project Lab', TRUE),
('V006', 'Smart Classroom', TRUE);
select * from Venue;

use ODEMS;

