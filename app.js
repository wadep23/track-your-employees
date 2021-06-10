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
              "View Employees by Manager",
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
              
              case "View Employees by Manager":
                viewByManager();
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

// function viewByManager() {
//   db.query("SELECT * FROM employee WHERE role_id )
// }

// Choose role for new Employee
const roleArray = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, role) {
    if (err){
      console.log(err);
    }
    for ( i = 0; i < role.length; i++) {
      roleArray.push(role[i].title);
    }
    
  })
  return roleArray;
}
// Chooses manager role for new employee
const managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, data) {
    if (err){
      console.log(err);
    }
    for ( i = 0; i < data.length; i++) {
      managersArray.push(data[i].first_name);
    }
    
  })
  return managersArr;
}

// Update existing employee
  function updateEmployee(employee) {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, employee) {
     if (err){
       console.log(err);       
    } 
    //  console.log(employee);
    //  console.log('employee returned!')

    //  let employeeArr = new Array();
    //  for (employee.id in employee){
    //    employeeArr.push(employee[employee.id])
    //  }
     console.log(employee);
     const ids = employee.map(employee => employee.id);
     console.log(ids);
    inquirer.prompt([
          {
            type: "list",
            name: "id",
            message: "What is the Employee's ID? ",
            choices: ids
            },
          
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(employee) {
        let roleId = selectRole().indexOf(employee.role) + 1
        console.log(roleId);
        db.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?", 
        [
          roleId,
          employee.id
        ], 
        function(err, data){            
            console.table(data);
            startPrompt()
        })
  
    }).catch(err => {
      console.log(err);
    })
  });
  }

// Adds a new employee
function addEmployee(employee) { 
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter their first name "
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter their last name "
    },
    {
      name: "role",
      type: "rawlist",
      message: "What is their role? ",
      choices: selectRole(employee)
    },
    {
      name: "manager",
      type: "rawlist",
      message: "Whats their managers name?",
      choices: selectManager(employee)
    }
  ]).then(function (employee) {
    console.log('above variables')
    let roleId = selectRole().indexOf(employee.role) + 1
    let managerId = selectManager().indexOf(employee.choice) + 1
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
    [
      firstName,
      lastName,
      role,
      manager      
    ], 
    function(err, data){
      if (err){
        console.log(err);
      } 
      console.table(data);
      startPrompt()
    })
    
  }).catch(err => {
    console.log(err);
  })
};


// Add new role
function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, data) {
    inquirer.prompt([
      {
        name: "Department",
        type: "list",
        message: "Please select the appropriate department for this role",
        choices: ["Marketing", "Development", "QA", "Help Desk"]          
      },
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
      if(data.Department === 'Marketing'){
        data.Department = 1
      }else if(data.Department === 'Development'){
        data.Department = 2
      }else if (data.Department === 'QA'){
        data.Department = 3
      }else{
        data.Department = 4
      }
        db.query(
            "INSERT INTO role SET ?",
            {
              title: data.Title,
              salary: data.Salary,
              department_id: data.Department
            },
            function(err) {
                if (err){
                  throw err;
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
        let query = db.query(
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