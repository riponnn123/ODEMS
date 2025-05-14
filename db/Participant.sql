DROP TABLE IF EXISTS Participant;

CREATE TABLE Participant (
    Participant_id INT PRIMARY KEY AUTO_INCREMENT,
    Attended BOOLEAN NOT NULL DEFAULT TRUE,
    S_rollno VARCHAR(30),
    F_id VARCHAR(30),
    E_id INT NOT NULL,
    user_role ENUM('student', 'faculty') NOT NULL,
    FOREIGN KEY (S_rollno) REFERENCES Student(S_rollno) ON DELETE SET NULL,
    FOREIGN KEY (F_id) REFERENCES Faculty(F_id) ON DELETE SET NULL,
    FOREIGN KEY (E_id) REFERENCES Event(E_id) ON DELETE CASCADE
);
select* from participant;
delete from participant;


drop table participant;