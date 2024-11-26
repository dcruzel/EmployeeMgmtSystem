// importing classes from other files
import inquirer from "inquirer"; 
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

//define a client
class Client {
    menu: string;
    exit: boolean = false;

    constructor(menu:string){
        this.menu = menu;
    }

    

    startClient(): void {
        console.log("---------------------------------------");
        console.log(`--------------${this.menu.toUpperCase}---------------------`);
        console.log("---------------------------------------");
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
            console.log(answers.Task);
            switch(answers.Task){
                case 'View all departments':
                    console.log("View depts");
                    break;
                case 'View all roles':
                    console.log("View roles");
                    break;
                case 'View all employees':
                    console.log("View employees");
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