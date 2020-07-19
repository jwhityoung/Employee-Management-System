DROP DATABASE IF EXISTS employeemgmt_DB;

CREATE DATABASE employeemgmt_DB;

USE employeemgmt_DB;

CREATE TABLE IF NOT EXISTS department (
    department_id integer not null auto_increment,
    department_name varchar(30) not null,
    primary key (department_id)
);

CREATE TABLE IF NOT EXISTS employee_role (
    role_id integer not null auto_increment,
    title varchar(30) not null,
    salary decimal (20,2),
 FOREIGN KEY (department_id) REFERENCES department (department_id),
    primary key (role_id)
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id integer not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    FOREIGN KEY (role_id) REFERENCES employee_role (role_id),
    primary key (employee_id)
);

