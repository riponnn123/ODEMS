CREATE TABLE Faculty (
    F_id VARCHAR(30) PRIMARY KEY,
    F_fname VARCHAR(100) NOT NULL,
    F_lname VARCHAR(100) NOT NULL,
    F_email VARCHAR(150) UNIQUE NOT NULL,
    F_password VARCHAR(255) NOT NULL
);

drop table faculty;
