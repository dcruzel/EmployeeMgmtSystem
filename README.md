# Employee Management System


## Description
```md
This project is to build a command-line application to manage a company's employee database.  
```
The database schema as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/100-sql-challenge-ERD.png)


## User Story
```md
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business
```


## Table of Contents

- [Introduction](#introduction)
- [Technology](#technology)
- [Usage](#usage)
- [Contact](#credits)
- [License](#license)

## Introduction
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, update an employee's manager, delete a department, delete a role, delete an employee, view employees by manager, view employees by department and view the total utilized budget of a department
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
WHEN I choose to update the employee's manager
THEN I am prompted to enter the employee's manager's id and this information is updated in the database
WHEN I choose to delete a department
THEN I am prompted to enter the department id to delete and this information is deleted in the database, but it can't have associated employees due to foreign key rules
WHEN I choose to delete a role
THEN I am prompted to enter the role id and this information is deleted in the database, but it can't have associated employees due to foreign key rules
WHEN I choose to delete a employee
THEN I am prompted to enter the role id and this information is deleted in the database
WHEN I choose to view the employees by manager
THEN I am presented with a formatted table showing the employees name by manager
WHEN I choose to view the employees by department
THEN I am presented with a formatted table showing the employees name by department
WHEN I choose to view the total utilized budget of a department
THEN I am presented with a formatted table showing the department name and the total salary
```

## Technology

[![Node.js](https://img.shields.io/badge/Platform-Node.js-339933?style=plastic&logo=Node.js&logoWidth=10)](https://nodejs.org/)
[![Inquirer](https://img.shields.io/badge/Library-Inquirer-00bcd4?style=plastic&logo=JavaScript&logoWidth=10)](https://www.npmjs.com/package/inquirer)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=plastic&logo=PostgreSQL&logoWidth=10)](https://www.postgresql.org/)

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-00ff00?style=plastic&logo=TypeScript&logoWidth=10)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/Tools-npm-ff0000?style=plastic&logo=npm&logoWidth=10)](https://www.npmjs.com/)
[![VS Code](https://img.shields.io/badge/IDE-VSCode-ff0000?style=plastic&logo=VisualStudioCode&logoWidth=10)](https://code.visualstudio.com/docs)

## Usage
- [Github Repo](https://github.com/dcruzel/EmployeeMgmtSystem)
- [Video](https://drive.google.com/file/d/1sDMPuunnOFMpPNdsR5j2_P7IRMoxgsf0/view?usp=sharing)


## Contact

Elizabeth D'Cruz
- [Github Profile](https://github.com/dcruzel)
- [Email](Liz.c.dcruz@gmail.com)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

