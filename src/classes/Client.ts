// importing classes from other files and got the import, connectToDB and PORT from bootcamp Module 10 - SQL activity 24
import inquirer from "inquirer"; 
import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';


await connectToDb();

const PORT = process.env.PORT || 3001;

//define a client
class Client {
    menu: string;
    exit: boolean = false;

    constructor(menu:string){
        this.menu = menu;
    }
    //view the employees table
    viewEmployees():void {
        const sql = `SELECT employee.id, 
            employee.first_name, 
            employee.last_name, 
            department.name as department_name, 
            role.title, 
            role.salary, 
            employee.manager_id 
            FROM employee 
            JOIN role ON employee.role_id=role.id 
            JOIN department ON role.department_id = department.id
            ORDER BY id;`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          console.table(result.rows);
          this.startClient();
        });
    }

    //view the departments table
    viewDepartments():void {
        const sql = `SELECT * FROM department`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          console.table(result.rows);
          this.startClient();
        });
    }

    //view the Role table
    viewRoles():void {
        const sql = `SELECT role.id, role.title, department.name, role.salary 
        FROM role JOIN department ON role.department_id = department.id`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          console.table(result.rows);
          this.startClient();
        });
    }

    //add department into the Department table
    addDepartment():void {
        let last_id =0;
        let sql = `SELECT * FROM department order by id desc limit 1`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          last_id = result.rows[0].id+1  || 1;
        });
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the name of the department?',
                name: 'departmentName'
            },
        ])
        .then((response) => 
        {
            if (!response.departmentName) {
                console.log(`Response cannot be blank`);
                this.startClient();
                return;
            }
            sql = `INSERT INTO department VALUES (${last_id},'${String(response.departmentName)}')`;
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Added department");
                this.startClient();
            });
        });
    }

    //add role into the Role table
    addRole():void {

        //Get the last id to add to the table
        let last_id =0;
        let sql = `SELECT * FROM role ORDER BY id desc limit 1`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          last_id = result.rows[0].id+1  || 1;
        });

        //Prompt client for the information
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the name of the role?',
                name: 'roleName'
            },
            {
                type: 'input', 
                message: 'What is the salary for the role?',
                name: 'roleSalary'
            },
            {
                type: 'input', 
                message: 'What is the department for the role?',
                name: 'roleDept'
            },
        ])
        .then((response) => 
        {
            sql = `INSERT INTO role VALUES (${last_id},'${String(response.roleName)}', 
                ${parseFloat(response.roleSalary)}, ${parseInt(response.roleDept, 10)})`;
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Added role");
                this.startClient();
            });
        });
    }

    //add employee into the Employee table
    addEmployee():void {

        //Get the last id to add to the table
        let last_id =0;
        let sql = `SELECT * FROM employee ORDER BY id desc limit 1`;
        pool.query(sql, (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
            this.startClient();
            return;
          }
          console.log("");
          last_id = result.rows[0].id+1  || 1;
        });

        //Prompt client for the information
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the first name of the employee?',
                name: 'firstName'
            },
            {
                type: 'input', 
                message: 'What is the last name of the employee?',
                name: 'lastName'
            },
            {
                type: 'input', 
                message: 'What is the role id?',
                name: 'roleId'
            },
            {
                type: 'input', 
                message: 'What is the manager id?',
                name: 'managerId'
            },
        ])
        .then((response) => 
        {
            sql = `INSERT INTO employee VALUES (${last_id},'${String(response.firstName)}','${String(response.lastName)}', 
                ${parseInt(response.roleId)}, ${parseInt(response.managerId)})`;
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Added employee");
                this.startClient();
            });
        });
    }

    //delete department in the Department table
    deleteDepartment():void {
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the department id?',
                name: 'departmentId'
            },
        ])
        .then((response) => 
        {
            if (!response.departmentId) {
                console.log(`Response cannot be blank`);
                this.startClient();
                return;
            }
            let sql = `DELETE FROM department WHERE id = CAST($1 AS INTEGER)`;
            const params = [response.departmentId];
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Deleted department");
                this.startClient();
            });
        });
    }

    //delete role in the Role table
    deleteRole():void {
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the role id?',
                name: 'roleId'
            },
        ])
        .then((response) => 
        {
            if (!response.roleId) {
                console.log(`Response cannot be blank`);
                this.startClient();
                return;
            }
            let sql = `DELETE FROM role WHERE id = CAST($1 AS INTEGER)`;
            const params = [response.roleId];
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Deleted department");
                this.startClient();
            });
        });
    }

    //delete employee in the Employee table
    deleteEmployee():void {
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the employee id?',
                name: 'employeeId'
            },
        ])
        .then((response) => 
        {
            if (!response.employeeId) {
                console.log(`Response cannot be blank`);
                this.startClient();
                return;
            }
            let sql = `DELETE FROM employee WHERE id = CAST($1 AS INTEGER)`;
            const params = [response.employeeId];
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Deleted employee");
                this.startClient();
            });
        });
    }
    //add employee into the Employee table
    updateEmployeeRole():void {

        //Prompt client for the information
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the employee id that you want to update?',
                name: 'employeeId'
            },
            {
                type: 'input', 
                message: 'What is the new role id?',
                name: 'roleId'
            },
        ])
        .then((response) => 
        {
            //Update the employee's role id by using the employee id
            let sql = `UPDATE employee VALUES SET role_id = ${parseInt(response.roleId)}
            WHERE id = ${parseInt(response.employeeId)}`;
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Updated role ID for employee");
                this.startClient();
            });
        });
    }
    //add employee into the Employee table
    updateEmployeeManager():void {

    //Prompt client for the information
        inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the employee id that you want to update?',
                name: 'employeeId'
            },
            {
                type: 'input', 
                essage: 'What is the manager id?',
                name: 'managerId'
            },
            ])
        .then((response) => 
        {
            //Update the employee's manager id by using the employee id
            let updateManagerId;
            if(response.managerId==""){
                updateManagerId=null;
            }else{
                updateManagerId=parseInt(response.managerId)
            }
            let sql = `UPDATE employee VALUES SET manager_id = ${updateManagerId}
            WHERE id = ${parseInt(response.employeeId)}`;
        
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                    this.startClient();
                    return;
                }
                console.log("");
                console.log("Updated manager ID for employee");
                this.startClient();
            });
        });
    }

    viewEmployeeByManager():void {
        const sql = `SELECT employee.manager_id as manager_id, 
        employee.first_name AS first_name, employee.last_name AS last_name
        FROM employee 
        ORDER BY employee.manager_id;`;
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
                this.startClient();
            return;
        }
        console.log("");
        console.table(result.rows);
        this.startClient();
        });
    }
    //view employee by department
    viewEmployeeByDept():void {
        const sql = `SELECT department.name as department_name, 
        employee.first_name AS first_name, employee.last_name
        FROM employee 
        JOIN role ON employee.role_id=role.id 
        JOIN department ON role.department_id = department.id
        ORDER BY department.name;`;
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
                this.startClient();
            return;
        }
        console.log("");
        console.table(result.rows);
        this.startClient();
        });
    }
    //View the total utilized budget of a department
    sumSalaryByDept():void {
        const sql = `SELECT department.name as department_name, 
        SUM(role.salary) AS total_salary
        FROM employee 
        JOIN role ON employee.role_id=role.id 
        JOIN department ON role.department_id = department.id
        GROUP BY department.name
        ORDER BY department.name;`;
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
                this.startClient();
            return;
        }
        console.log("");
        console.table(result.rows);
        this.startClient();
        });
    }

    startClient(): void {

        //Print out MENU title
        
        console.log("");
        console.log("___________________________________________________________________________");
        console.log(`                      ${this.menu.toUpperCase()}               `);
        console.log("___________________________________________________________________________");

        //prompt the available choices
        inquirer
        .prompt([
            {
                type: 'list', 
                name: 'Task', 
                message: 
                    'What would you want to do?',
                choices: [
                    'View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update an employee manager',
                    'Update an employee role',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'View employees by manager',
                    'View employees by department',
                    'View the total utilized budget of a department',
                    'exit'
                ],    
            }, 
        ])
        .then((answers: {Task:string})=>{
            //Using switch, use the correct functions
            switch(answers.Task){
                case 'View all departments':
                    this.viewDepartments();
                    break;
                case 'View all roles':
                    this.viewRoles();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'Add a department':
                    this.addDepartment();
                    break;
                case 'Add a role': 
                    this.addRole();
                    break;
                case 'Add an employee':
                    this.addEmployee();
                    break;
                case 'Update an employee manager': 
                    this.updateEmployeeManager();
                    break;
                case 'Update an employee role': 
                    this.updateEmployeeRole();
                    break;
                case 'Delete a department':
                    this.deleteDepartment();
                    break;
                case 'Delete a role':
                    this.deleteRole();
                    break;
                case 'Delete an employee':
                    this.deleteEmployee();
                    break;
                case 'View employees by manager':
                    this.viewEmployeeByManager();
                    break;
                case 'View employees by department':
                    this.viewEmployeeByDept();
                    break;
                case 'View the total utilized budget of a department':
                    this.sumSalaryByDept();
                    break;
                case 'exit': 
                    this.exit = true;
                    process.exit(); //help from tutor Benicio
                default:
                    console.log('Unexpected selection');
                    break;
            }
        });
    }
}

export default Client;