use odems;
CREATE TABLE Student (
    S_rollno VARCHAR(20) PRIMARY KEY,
    S_fname VARCHAR(100) NOT NULL,
    S_lname VARCHAR(100) NOT NULL,
    S_email VARCHAR(150) UNIQUE NOT NULL,
    S_password VARCHAR(255) NOT NULL
);
drop table student;

select * from student;

