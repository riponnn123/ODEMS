CREATE TABLE Event (
    E_id INT PRIMARY KEY AUTO_INCREMENT,
    E_title VARCHAR(255) NOT NULL,
    E_type ENUM('Meeting', 'Conferences', 'Workshop') NOT NULL,
    V_id VARCHAR(30),
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Duration INT NOT NULL,
    Organizer VARCHAR(255) NOT NULL,
    ConfirmationStatus BOOLEAN DEFAULT FALSE,
    F_id VARCHAR(30),
    A_id VARCHAR(30),
    FOREIGN KEY (V_id) REFERENCES Venue(V_id),
    FOREIGN KEY (F_id) REFERENCES Faculty(F_id),
    FOREIGN KEY (A_id) REFERENCES Admin(A_id)
);
alter table Event drop column A_id;
select * from event;	 
drop table event;

update event set ConfirmationStatus= false where E_id = 1;
