const inquirer = require("inquirer")
const mysql = require("mysql2")
const table = require('console.table');


  const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password123',
        database: 'directory'
    },
    console.log(`Now connected to the directory database!`),
    startPrompt()
);

function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Emplyees By Deparments", 
              "Update Employee",
              "Add Employee?",
              "Add Role?",
              "Add Department?"
            ]
    }
]).then(function(data) {
        switch (data.choice) {
            case "View All Employees?":
              viewAllEmployees();
            break;
    
          case "View All Employee's By Roles?":
              viewAllRoles();
            break;
          case "View all Emplyees By Deparments":
              viewAllDepartments();
            break;
          
          case "Add Employee?":
                addEmployee();
              break;

          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role?":
                addRole();
              break;
      
            case "Add Department?":
                addDepartment();
              break;
    
            }
    })
}
// View all employees in DB
function viewAllEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, employees) {
      if (err){
        console.log(err);
      }
      console.table(employees)
      startPrompt()
  })
}
// View all roles
function viewAllRoles() {
  db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, roles) {
  if (err){
    console.log(err);
  }
  console.table(roles)
  startPrompt()
  })
}
// View all employees by department
function viewAllDepartments() {
  db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, employees) {
    if (err){
      console.log(err);
    }
    console.table(employees)
    startPrompt()
  })
}

// Choose role for new Employee
var roleArray = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, role) {
    if (err){
      console.log(err);
    }
    for (var i = 0; i < role.length; i++) {
      roleArray.push(role[i].title);
    }

  })
  return roleArray;
}
// Chooses manager role for new employee
var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, data) {
    if (err){
      console.log(err);
    }
    for (var i = 0; i < data.length; i++) {
      managersArray.push(data[i].first_name);
    }

  })
  return managersArr;
}
// Adds a new employee
function addEmployee() { 
     inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (employee) {
      var roleId = selectRole().indexOf(employee.role) + 1
      var managerId = selectManager().indexOf(employee.choice) + 1
      db.query("INSERT INTO employee SET ?", 
      {
          first_name: employee.firstName,
          last_name: employee.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err,){
          if (err){
            console.log(err);
          } 
          console.table(employee)
          startPrompt()
      })

  })
};

// Update existing employee
  function updateEmployee() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, employee) {
     if (err){
       console.log(err);       
    } 
     console.log(employee)
    inquirer.prompt([
          {
            type: "rawlist",
            name: "id",
            message: "What is the Employee's ID? ",
            choices: function(employee) {
              var id = [];
              for (var i = 0; i < employee.length; i++) {
                id.push(employee[i].id);
              }
              return id;
            },
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(employee) {
        var roleId = selectRole().indexOf(employee.role) + 1
        db.query("UPDATE employee SET WHERE ?", 
        {
          last_name: employee.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err){
              console.log(err);
            }
            console.table(employee)
            startPrompt()
        })
  
    });
  });

  }
// Add new role
function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, data) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(data) {
        db.query(
            "INSERT INTO role SET ?",
            {
              title: data.Title,
              salary: data.Salary,
            },
            function(err) {
                if (err){
                  console.log(err);
                }
                console.table(data);
                startPrompt();
            }
        )

    });
  });
  }
// Add new department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(data) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: data.name
            
            },
            function(err) {
                if (err){
                  console.log(err);
                }
                console.table(data);
                startPrompt();
            }
        )
    })
  }