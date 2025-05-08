CREATE TABLE Meeting (
    Meeting_id INT PRIMARY KEY AUTO_INCREMENT,
    Agenda TEXT NOT NULL,
    E_id INT,
    FOREIGN KEY (E_id) REFERENCES Event(E_id)
);

CREATE TABLE Meeting_Members (
    Member_id INT PRIMARY KEY AUTO_INCREMENT,
    Meeting_id INT,
    Member_Name VARCHAR(255),
    FOREIGN KEY (Meeting_id) REFERENCES Meeting(Meeting_id)
);

CREATE TABLE Meeting_Points (
    Point_id INT PRIMARY KEY AUTO_INCREMENT,
    Meeting_id INT,
    Point TEXT,
    FOREIGN KEY (Meeting_id) REFERENCES Meeting(Meeting_id)
);

CREATE TABLE Meeting_Minutes (
    Minute_id INT PRIMARY KEY AUTO_INCREMENT,
    Meeting_id INT,
    Minute TEXT,
    FOREIGN KEY (Meeting_id) REFERENCES Meeting(Meeting_id)
);
USE odems;
SELECT * FROM Meeting;
SELECT * FROM Meeting_Members;
SELECT * FROM Meeting_Points;


