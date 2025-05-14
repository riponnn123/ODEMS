CREATE TABLE Conference (
    Conference_id INT PRIMARY KEY AUTO_INCREMENT,
    Theme VARCHAR(255),
    E_id INT,
    FOREIGN KEY (E_id) REFERENCES Event(E_id)
);

CREATE TABLE Conference_Speakers (
    Speaker_id INT PRIMARY KEY AUTO_INCREMENT,
    Conference_id INT,
    Speaker_Name VARCHAR(255),
    FOREIGN KEY (Conference_id) REFERENCES Conference(Conference_id)
);

CREATE TABLE Conference_Papers (
    Paper_id INT PRIMARY KEY AUTO_INCREMENT,
    Conference_id INT,
    Paper_Title VARCHAR(255),
    FOREIGN KEY (Conference_id) REFERENCES Conference(Conference_id)
);

drop table conference;
select * from conference;
select * from conference_speakers;
select * from conference;
DELETE FROM conference;




