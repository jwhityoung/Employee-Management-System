var inquirer = require("inquirer");
var mysql = require("mysql");


//create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Boxwood10!",
    database: "employeemgmt_DB"
});

//connect to the my sql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    //run the start function after the connection is made to proompt the user 
    start()
});

//function which prompts the user for what action they should take 
function start() {

    inquirer.prompt({
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'View departments',
                'View roles',
                'View employees',
                'Exit'
            ]
        })

        .then(function(answer) {
            //based on their answer, either call the bid or the post functions
            if (answer.action === "Add a department"){
                addDepartment();
            }
            else if (answer.action === "Add a role"){
                addRole();
            }
            else if (answer.action === "Add an employee"){
                addEmployee();
            }
            else if (answer.action === "View departments"){
                viewDepartments();
            }
            else if (answer.action === "View Roles"){
                viewRoles();
            }
            else if (answer.action === "View employees"){
                viewEmployees();
            }
            else {
                connection.end();
            }
        });
    }

        function addDepartment() {

            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the name of the department?",
                        name: "department-name"
                    }
        };

    function addRole() {

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the title of the role?",
                    name: "role-title"
                },
                {
                    type: "input",
                    message: "What is the salary?",
                    name: "role-salary"
                }

            ])
    };


    function addEmployee() {

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "employee-first-name"
                },
                {
                    type: "input",
                    message: "What the employees last name?",
                    name: "employee-last-name"
                },
                {//list of roles needs to show up in choices
                    type: "list",
                    message: "What is the employee's role?",
                    name: "employee-role",
                    choices: [

                    ]
                },
                {//list of managers needs to show up in choices
                    type: "list",
                    message: "Who is the employee's manager?",
                    name: "employee-manager",
                    choices: []
                }

            ])
    }

    //view department 
    function viewDepartments() {

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "view-departments",
                    choices: []
                }

            ])
    };

    //view roles
    function viewRoles() {

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "view-roles",
                    choices: []
                }

            ])
    };

    //view employees 
    function viewEmployees) {

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "view-employees",
                    choices: []
                }

            ])
    };

