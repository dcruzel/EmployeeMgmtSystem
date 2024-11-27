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
            role.salary 
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
                    'Update an employee role',
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
                case 'Update an employee role': 
                    this.updateEmployeeRole();
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