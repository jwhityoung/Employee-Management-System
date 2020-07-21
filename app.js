var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

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
connection.connect(function (err) {
    if (err) throw err;
    //run the start function after the connection is made to proompt the user 
    start();
});


//function which prompts the user for what action they should take 
function start() {

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee',
            'View departments',
            'View roles',
            'View employees',
            'Update employee',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.choice) {
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee":
                updateEmployeeRole();
                break;
            default:
                console.log("Thanks, goodbye!")
                connection.end();
        };
    })
};
//Add a new department 
function addDepartment() {

    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the department?"
            }

        ]).then(answer => {
            connection.query(
                "INSERT INTO department SET  ?",
                {
                    department_name: answer.departmentName

                },
                (err) => {
                    if (err) throw err;
                    console.log("\n" + "The department " + answer.departmentName + " has been added!")
                }
            );
            start();
        })
};

//Add a new role
function addRole() {
    connection.query("SELECT department_name FROM department", function (err, res) {
        if (err) throw err;
        console.log(res);

        inquirer
            .prompt([
                {
                    name: "roleTitle",
                    type: "input",
                    message: "What is the title of the role?"

                },
                {
                    name: "roleSalary",
                    type: "input",
                    message: "What is the salary?",
                },
                {
                    name: "roleDepartment",
                    type: "rawlist",
                    message: "What department is the role in?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].department_name);
                        }
                        return choiceArray;
                    }

                }
            ]).then(answer => {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                    },
                    (err) => {
                        if (err) throw err;

                        console.log("\n" + "The role " + answer.roleTitle + "has been added!")

                    }
                );
                start();
            })
    });


    function addEmployee() {
        connection.query("SELECT title FROM role", function (err, res) {
            if (err) throw err;
            console.log(res);

            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the employee's first name?",
                        name: "firstName"
                    },
                    {
                        type: "input",
                        message: "What the employee's last name?",
                        name: "lastName"
                    },
                    {
                        type: "input",
                        message: "What is the employee's unique five digit ID number?",
                        name: "id"
                    },
                    {
                        type: "rawlist",
                        message: "What is the employee's role?",
                        name: "employeerole",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].title);
                            }
                            return choiceArray;
                        }

                    }

                ]).then(answer => {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: answer.firstName,
                            Last_name: answer.lastName,
                            employee_id: answer.id

                        },
                        (err) => {
                            if (err) throw err;

                            console.log("\n" + answer.firstName + " has been added as an employee!")

                        }
                    );
                    start();
                })
        });


        function viewDepartments() {
            connection.query("SELECT department_name FROM department", function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        }

        function viewRoles() {
            connection.query("SELECT title, salary FROM role", function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        }

        function viewEmployees() {
            connection.query("SELECT employee_id, first_name, last_name FROM employee", function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        }

        function updateEmployeeRole() {
            connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
                console.log(res);
                connection.query("SELECT title, role_id FROM role", function (err, resRole) {
                    inquirer.
                        prompt([
                            {
                                type: "rawlist",
                                name: "employeeList",
                                message: "Which employee would you like to update?",
                                choices: function () {
                                    var choiceArray = [];
                                    for (var i = 0; i < res.length; i++) {
                                        choiceArray.push(res[i].first_name);
                                    }
                                    return choiceArray;
                                }

                            },
                            {
                                type: "rawlist",
                                name: "employeeUpdateRole",
                                message: "What is the employee's new role?",
                                choices: function () {
                                    var choiceArray = [];
                                    console.log(resRole);
                                    for (var i = 0; i < resRole.length; i++) {
                                        var role = {
                                            name: resRole[i].title,
                                            value: resRole[i].role_id
                                        }
                                        console.log(role);
                                        choiceArray.push(role);

                                    }
                                    return choiceArray;
                                }
                            }
                        ]).then(answer => {
                            console.log(answer);
                            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.employeeUpdateRole, answer.employeeList], function (err, res) {
                                if (err) throw err;
                                console.table(res);
                                start();
                            })

                        }
                        )
                })
            });

