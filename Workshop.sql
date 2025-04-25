CREATE TABLE Workshop (
    Workshop_id INT PRIMARY KEY AUTO_INCREMENT,
    E_id INT,
    FOREIGN KEY (E_id) REFERENCES Event(E_id)
);

CREATE TABLE Workshop_Topics (
    Topic_id INT PRIMARY KEY AUTO_INCREMENT,
    Workshop_id INT,
    Topic VARCHAR(255),
    FOREIGN KEY (Workshop_id) REFERENCES Workshop(Workshop_id)
);

CREATE TABLE Workshop_Trainers (
    Trainer_id INT PRIMARY KEY AUTO_INCREMENT,
    Workshop_id INT,
    Trainer_Name VARCHAR(255),
    FOREIGN KEY (Workshop_id) REFERENCES Workshop(Workshop_id)
);

CREATE TABLE Workshop_Sessions (
    Session_id INT PRIMARY KEY AUTO_INCREMENT,
    Workshop_id INT,
    Session_Title VARCHAR(255),
    FOREIGN KEY (Workshop_id) REFERENCES Workshop(Workshop_id)
);

drop table Workshop;

