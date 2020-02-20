const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// need array data for team members added; member specific array easier to send to HTML
// this keeps track of all employees created
let employeeArray = [];
let managerArray = [];
let engineerArray = [];
let internArray = [];

// added question sets as const
const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "What is the name of your Manager?"
  },
  {
    type: "input",
    name: "managerId",
    message: "What is the Manager's id?"
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the Manager's email?"
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the Manager's office number?"
  }
];

const employeeQuestion = [
  {
    // list type gives options for user to select type of employee to add
    type: "list",
    name: "addEmployee",
    message: "What type of employee do you want to add?",
    choices: ["Engineer", "Intern", "I am done adding employees"]
  }
];

const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "What is the name of your Engineer?"
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is the Engineer's id?"
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is the Engineer's email?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the Engineer's github?"
  }
];

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "What is the name of your Intern?"
  },
  {
    type: "input",
    name: "internId",
    message: "What is the Intern's id?"
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is the Intern's email?"
  },
  {
    type: "input",
    name: "school",
    message: "What is the Intern's school?"
  }
];

// inquirer functions created to solicit question response.
// push new Class object responses to arrays

// AddManager initiates (part of init function at bottom of code)
function addManager() {
  return inquirer.prompt(managerQuestions).then(function(answers) {
    let newManager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.officeNumber
    );
    managerArray.push(newManager);
    // these two functions are condensed to the registerEmployee function to avoid redundant code
    // employeeArray.push(newManager);
    // finalizeEmployees();
    registerEmployee(newManager);
  });
}

function finalizeEmployees() {
  return inquirer.prompt(employeeQuestion).then(function(answers) {
    console.log(answers);
    // addEmployee is from the employeeQuestion array 'name: "addEmployee",'
    // if/else determines the questions to prompt after user selects employe type to add
    if (answers.addEmployee == "Intern") {
      addIntern();
    } else if (answers.addEmployee == "Engineer") {
      addEngineer();
    } else {
      // member data gathering complete: "I am done adding employees"
      console.log("Ready to generate HTML!");
      // call generateHTML function here to prompt write to team.html file
      generateHTML();
    }
  });
}

// function that console logs data for just entered employee and pushes each entry to array (employee is parameter)
function registerEmployee(employee) {
  console.log("Just added employee details:");
  console.log(employee);
  employeeArray.push(employee);
// call this function again to prompt adding more members   
  finalizeEmployees();
}

// inquirer for Engineer profiles, push data from Class to array
function addEngineer() {
  return inquirer.prompt(engineerQuestions).then(function(answers) {
    let newEngineer = new Engineer(
      answers.engineerName,
      answers.engineerId,
      answers.engineerEmail,
      answers.github
    );
    engineerArray.push(newEngineer);
    registerEmployee(newEngineer);
  });
}

// inquirer for Intern profiles, push data from Class to array
function addIntern() {
  return inquirer.prompt(internQuestions).then(function(answers) {
    let newIntern = new Intern(
      answers.internName,
      answers.internId,
      answers.internEmail,
      answers.school
    );
    internArray.push(newIntern);
    registerEmployee(newIntern);
  });
}

// function to compile the HTML
function generateHTML() {
  // create card for every type of employee added. It is easier to create separate arrays for each type of employee rather than setting conditions for different card HTML for each type of employee added in one array
  console.log("Complete Employee Array ready for HTML generation:");
  console.log(employeeArray);
  console.log("Manager Array for HTML:");
  console.log(managerArray);
  console.log("Engineer Array for HTML:");
  console.log(engineerArray);
  console.log("Intern Array for HTML:");
  console.log(internArray);

  // only one manager, index 0 and no need to use for loop
  let managerName = managerArray[0].name;
  let managerId = managerArray[0].id;
  let managerEmail = managerArray[0].email;
  let managerOffice = managerArray[0].officeNumber;
  let managerHTML = `
    <div class="card col-3 shadow">
        <div class="card-header">
            <h2 class="card-title text-center">${managerName}</h2>
            <h3 class="card-title text-center"><i class="fas fa-users"></i> Manager</h3>
        </div>

        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${managerId}</li>
                <li class="list-group-item">Email: <a href="mailto:${managerEmail}">${managerEmail}</a></li>
                <li class="list-group-item">Office number: ${managerOffice}</li>
            </ul>
        </div>
    </div>
    `;

  // for multiple engineers, add to engineer template array before adding to main HTML
  let engineerTemplate = [];

  engineerArray.forEach(engineer => {
    let engineerName = engineer.name;
    let engineerId = engineer.id;
    let engineerEmail = engineer.email;
    let engineerGithub = engineer.github;
    let engineerHTML = `
    <div class="card col-3 shadow">
        <div class="card-header">
            <h2 class="card-title text-center">${engineerName}</h2>
            <h3 class="card-title text-center"><i class="fas fa-user-cog"></i> Engineer</h3>
        </div>

        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineerId}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineerEmail}">${engineerEmail}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${engineerGithub}" target="_blank">${engineerGithub}</a></li>
            </ul>
        </div>
    </div>
    `;
    // push each engineer entry into the Template array that will go into the main HTML
    engineerTemplate.push(engineerHTML);
  });

  // for multiple interns, add to intern template array before adding to main HTML
  let internTemplate = [];

  internArray.forEach(intern => {
    let internName = intern.name;
    let internId = intern.id;
    let internEmail = intern.email;
    let internSchool = intern.school;
    let internHTML = `
    <div class="card col-3 shadow">
        <div class="card-header">
            <h2 class="card-title text-center">${internName}</h2>
            <h3 class="card-title text-center"><i class="fas fa-user-graduate"></i> Intern</h3>
        </div>

        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${internId}</li>
                <li class="list-group-item">Email: <a href="mailto:${internEmail}">${internEmail}</a></li>
                <li class="list-group-item">School: ${internSchool}</li>
            </ul>
        </div>
    </div>
    `;
    // push each intern entry into the Template array that will go into the main HTML
    internTemplate.push(internHTML);
  });

  // main HTML page template with CSS included
  var htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Profiles</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"/>
    <style>
        body {
            background-image: url(../Assets/so-white.png);
        }

        .jumbotron {
            background-color: teal;
            color: whitesmoke;
        }
        .card {
            margin: 20px;
            padding: 0;
        }

        .card-header {
            background-color:rebeccapurple;
            color: whitesmoke;
        }

        .container-fluid {
            padding-left: 100px;
            padding-right: 100px;
        }

        .shadow {
            box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
            transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
</head>
<body>
    <div class="jumbotron jumbotron-fluid shadow">
        <div class="container">
            <h1 class="display-4 text-center font-weight-bold">Team Profile</h1>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row d-flex justify-content-center">
            
            ${managerHTML}
            ${engineerTemplate.join("")}
            ${internTemplate.join("")}

        </div>
    </div>
</body>
</html>`;

  // the above "join" have empty strings to remove commas between employee types users can add multiples of

  // write to file
  fs.writeFile("./output/team.html", htmlTemplate, err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file is saved in the ouput folder
    console.log("team.html generated!");
  });
}

// define function to initiate call
function init() {
  addManager();
}

// initiates app
init();
