DROP DATABASE IF EXISTS employeemgmt_DB;

CREATE DATABASE employeemgmt_DB;

USE employeemgmt_DB;

CREATE TABLE IF NOT EXISTS department (
   department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE IF NOT EXISTS role (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (12,2) NOT NULL,
    department VARCHAR(30) NOT NULL,
     role_id INT AUTO_INCREMENT NOT NULL,
 PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS employee (
       employee_id INT NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
   title VARCHAR(30) NOT NULL,
PRIMARY KEY(employee_id)
);

INSERT INTO department (department_name)
VALUES ("HR"),
("Sales"), 
("Operations"), 
("Engineering"), 
("Legal");

INSERT INTO role (title, salary, department, role_id)
VALUES ("Account Executive", 65000.00, "Sales", NULL),
 ("Implementation Manager", 70000.00, "Operations", NULL),
 ("HR Coordinator", 50000.00, "HR", NULL),
 ("Junior Software Developer", 75000.00, "Engineering", NULL);


INSERT INTO employee (employee_id, first_name, last_name, title)
VALUES (48937, "Olivia", "Gambucci", "Account Executive"),
 (93827, "Will", "Williams", "Implementation Manager"),
 (28716, "Sara", "Smith", "HR Coordinator")
