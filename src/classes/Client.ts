// importing classes from other files
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
        const sql = `SELECT * FROM role`;
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
        console.log("___________________________________________________________________________");
        console.log(`           ${this.menu.toUpperCase()}               `);
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
                    console.log('Add a department');
                    break;
                case 'Add a role': 
                    console.log('Add a role');
                    break;
                case 'Add an employee':
                    console.log('Add an employee');
                    break;
                case 'Update an employee role': 
                    console.log('Update an employee role');
                    break;
                case 'exit': 
                    this.exit = true;
                    break;
                default:
                    console.log('Unexpecte selection');
                    break;
            }
            if (!this.exit){
                this.startClient();
            }
           
        });
    }
}

export default Client;