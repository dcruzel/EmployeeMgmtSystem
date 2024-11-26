/* Drop database if employeecms_db exists */

DROP DATABASE IF EXISTS employeecms_db;

/* Create the employeecms_db*/
CREATE DATABASE employeecms_db;

/* Connect the employeecms_db*/
\c employeecms_db;


/* Connect the department table */
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

/* Connect the role table */
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);
/* Connect the employee table */
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);