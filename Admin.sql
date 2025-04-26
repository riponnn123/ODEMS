CREATE TABLE Admin (
    A_id VARCHAR(30) PRIMARY KEY,
    A_fname VARCHAR(100) NOT NULL,
    A_lname VARCHAR(100) NOT NULL,
    A_email VARCHAR(150) UNIQUE NOT NULL,
    A_password VARCHAR(255) NOT NULL,
    F_id VARCHAR(30),
    FOREIGN KEY (F_id) REFERENCES Faculty(F_id)
);
INSERT INTO Admin VALUES 
	("adm101", "Sarat", "Saharia", "ss@tezu.ernet.in", "SS@123", "cs102");
select * from Admin;


