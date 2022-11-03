const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the employees_db database!");
  showConnection();
});

function showConnection() {
    console.log("====Employee Tracker====");

    pickEmployees();
    console.log(allEmployees);
    initPrompt();
}

function initPrompt() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "initPrompt",
          choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "get me out of here",
          ],
        },
      ])
      .then((answers) => {
        if (answers.initPrompt === "view all departments") {
          viewDepts();
        }
        if (answers.initPrompt === "view all roles") {
          viewRoles();
        }
        if (answers.initPrompt === "view all employees") {
          viewEmployees();
        }
        if (answers.initPrompt === "add a department") {
          addDept();
        }
        if (answers.initPrompt === "add a role") {
          addRole();
        }
        if (answers.initPrompt === "add an employee") {
          addEmployee();
        }
        if (answers.initPrompt === "update an employee role") {
          updateEmployee();
        }
        if (answers.initPrompt === "get me out of here") {
          return;
        }
    });
}

let allDepts = [];
function pickDepts() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      allDepts.push(res[i].deptName);
    }
  })
  return allDepts;
}

let allroles = [];
function pickRoles() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allroles.push(res[i].title)
    }
  })
  return allroles;
}

let managerlist = ['NULL'];
function pickManager() {
  db.query(
    'SELECT * FROM employees WHERE manager_id IS NULL;',
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managerlist.push(res[i].first_name);
      }
    }
  );
  return managerlist;
}

let allEmployees = [];
function pickEmployees() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      allEmployees.push(res[i].first_name);
    }
  });
  return allEmployees;
}


// functions that add department, role, and employees
function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department?",
          name: "deptAdded",
        },
      ])
      .then((answers) => {
        db.query(`INSERT INTO departments (deptName)
          VALUES ('${answers.deptAdded}')`),
          function (err) {
            if (err) throw err;
            initPrompt();
          };
        console.log("department added succesfully!");
        initPrompt();
    });
}

function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "what is the name of the role?",
          name: "roleAdded",
        },
        {
          type: "input",
          message: "what is the salary of this role?",
          name: "salaryAdded",
        },
        {
          type: "list",
          message: "what department does this role belong to?",
          name: "deptRole",
          choices: pickDepts(),
        },
      ])
      .then((answers) => {
        db.query(`INSERT INTO roles (title, salary, department_id)
          VALUES  ('${answers.roleAdded}',
                  '${answers.salaryAdded}',
                  '${alldepts.indexOf(answers.deptRole) + 1}');`),
          function (err) {
            if (err) throw err;
            initPrompt();
          };
        console.log("role added succesfully!");
        initPrompt();
    });
}

function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: `what is the employee's first name?`,
          name: "firstName",
        },
        {
          type: "input",
          message: `what is the employee's last name?`,
          name: "lastName",
        },
        {
          type: "list",
          message: `what is this employee's role?`,
          name: "roles",
          choices: pickRoles(),
        },
        {
          type: "list",
          message: `who is the employee's manager?`,
          name: "empManager",
          choices: pickManager() 
        }
      ])
      .then((answers) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('${answers.firstName}','${answers.lastName}','${allroles.indexOf(answers.roles) + 1}','${managerlist.indexOf(answers.empManager)}');`),
          function (err) {
            if (err) throw err
            initPrompt()
          };
        console.log("employee added succesfully!")
        initPrompt()
    });
}


// functions that view all departments, roles, and employees
function viewDepts() {
    db.query(`SELECT * FROM departments`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM roles`, function (err, res) {
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
}

function viewEmployees() {
    db.query(
      `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.department_id, roles.salary FROM employees JOIN roles ON employees.role_id = roles.id`,
      function (err, res) {
        if (err) throw err;
        console.table(res);
        initPrompt();
      }
    );
}

//function to update employee info
function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee you would like to update?",
          name: "emp_name",
          choices: pickEmployees(),
        },
        {
          type: "list",
          message: "What role would you like to give them?",
          name: "emp_role",
          choices: pickRoles(),
        },
      ])
      .then((answers) => {
        db.query(
          `UPDATE employees SET role_id = ${
            allroles.indexOf(answers.emp_role) + 1
          } WHERE employees.id = ${allemps.indexOf(answers.emp_name) + 1}`
        ),
          function (err) {
            if (err) throw err;
            console.log(err);
            initPrompt();
          };
        console.log("Employee Role Changed Successfully");
        initPrompt();
      });
  }