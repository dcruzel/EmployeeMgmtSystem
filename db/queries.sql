-- View all employees
SELECT employee.id, employee.first_name, employee.last_name, department.name 
as department_name, role.title, role.salary 
FROM employee 
JOIN role ON employee.role_id=role.id 
JOIN department ON role.department_id = department.id
ORDER BY id;
-- View all departments
SELECT * FROM department
ORDER BY id;
-- View all roles
SELECT * FROM role
ORDER BY id;
-- Add department
INSERT INTO department 
VALUES
(10,'Ambulance'); 
-- Add role
INSERT INTO role 
VALUES
(28,'Accountant', 100000, 10); 
-- Add employee
INSERT INTO employee 
VALUES
(73,'Christina', 'Cross', 28, 60); 
-- Update a employee's role
UPDATE employee
SET role_id = 6
WHERE id = 50;
-- Delete department by id
DELETE FROM department WHERE id = 12;