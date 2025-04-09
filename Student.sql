create database ODEMS;
use ODEMS;
CREATE TABLE Student (
    S_id INT PRIMARY KEY,
    S_fname VARCHAR(255) NOT NULL,
    S_lname VARCHAR(255) NOT NULL,
    S_year INT NOT NULL,
    S_email VARCHAR(255) UNIQUE NOT NULL,
    S_password VARCHAR(255) NOT NULL
);
CREATE TABLE Employee (
    Emp_id INT PRIMARY KEY,
    Emp_fname VARCHAR(255) NOT NULL,
    Emp_lname VARCHAR(255) NOT NULL,
    Emp_email VARCHAR(255) UNIQUE NOT NULL,
    Emp_password VARCHAR(255) NOT NULL,
    Role ENUM('Faculty', 'Admin') NOT NULL
);
CREATE TABLE Venue (
    V_id INT PRIMARY KEY,
    V_name VARCHAR(255) NOT NULL,
    V_availability BOOLEAN NOT NULL
);
CREATE TABLE Event (
    E_id INT PRIMARY KEY,
    E_title VARCHAR(255) NOT NULL,
    E_type ENUM('Meeting', 'Conferences', 'Workshop') NOT NULL,
    V_id INT,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Duration INT NOT NULL,
    Organizer VARCHAR(255) NOT NULL,
    ConfirmationStatus BOOLEAN NOT NULL,
    S_id INT,
    Emp_id INT,
    FOREIGN KEY (V_id) REFERENCES Venue(V_id) ON DELETE SET NULL,
    FOREIGN KEY (S_id) REFERENCES Student(S_id) ON DELETE SET NULL,
    FOREIGN KEY (Emp_id) REFERENCES Employee(Emp_id) ON DELETE SET NULL
);
CREATE TABLE Meeting (
    Meeting_id INT PRIMARY KEY,
    Agenda TEXT NOT NULL,
    E_id INT UNIQUE,  -- Each event can only be linked to one meeting
    FOREIGN KEY (E_id) REFERENCES Event(E_id) ON DELETE CASCADE
);
CREATE TABLE Meeting_Points (
    Point_id INT PRIMARY KEY AUTO_INCREMENT,
    Meeting_id INT,
    Point TEXT NOT NULL,
    FOREIGN KEY (Meeting_id) REFERENCES Meeting(Meeting_id) ON DELETE CASCADE
);
CREATE TABLE Meeting_Persons (
    Person_id INT PRIMARY KEY AUTO_INCREMENT,
    Meeting_id INT,
    Person_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Meeting_id) REFERENCES Meeting(Meeting_id) ON DELETE CASCADE
);
CREATE TABLE Conference (
    Conference_id INT PRIMARY KEY,
    Theme TEXT NOT NULL,
    E_id INT UNIQUE,  -- Each event can only be linked to one conference
    FOREIGN KEY (E_id) REFERENCES Event(E_id) ON DELETE CASCADE
);
CREATE TABLE Conference_Speakers (
    Speaker_id INT PRIMARY KEY AUTO_INCREMENT,
    Conference_id INT,
    Speaker_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Conference_id) REFERENCES Conference(Conference_id) ON DELETE CASCADE
);
CREATE TABLE Workshop (
    Workshop_id INT PRIMARY KEY,
    E_id INT UNIQUE,  -- Each event can only be linked to one workshop
    FOREIGN KEY (E_id) REFERENCES Event(E_id) ON DELETE CASCADE
);
CREATE TABLE Workshop_Topics (
    Topic_id INT PRIMARY KEY AUTO_INCREMENT,
    Workshop_id INT,
    Topic TEXT NOT NULL,
    FOREIGN KEY (Workshop_id) REFERENCES Workshop(Workshop_id) ON DELETE CASCADE
);
CREATE TABLE Workshop_Trainers (
    Trainer_id INT PRIMARY KEY AUTO_INCREMENT,
    Workshop_id INT,
    Trainer_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Workshop_id) REFERENCES Workshop(Workshop_id) ON DELETE CASCADE
);
-- Creating Participant Table
CREATE TABLE Participant (
    Participant_id INT PRIMARY KEY AUTO_INCREMENT,
    Attended BOOLEAN NOT NULL DEFAULT FALSE,
    S_id INT,
    Emp_id INT,
    E_id INT NOT NULL,
    FOREIGN KEY (S_id) REFERENCES Student(S_id) ON DELETE SET NULL,
    FOREIGN KEY (Emp_id) REFERENCES Employee(Emp_id) ON DELETE SET NULL,
    FOREIGN KEY (E_id) REFERENCES Event(E_id) ON DELETE CASCADE
);

INSERT INTO Venue(V_id,V_name,V_availability)
VALUES (1,'Seminar Hall', TRUE), (2,'Deans Gallery ', TRUE), (3,'SCR', FALSE);





