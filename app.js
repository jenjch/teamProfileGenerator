const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const jest = require("jest");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// const path = require("path");

// need to clarify how this path works
// const outputFolder = path.resolve(__dirname, "output", "team.html")

// const writeFileAsync = util.promisify(fs.writeFile);

// this keeps track of all employees created
let employeeArray = []

// need array data for team members and member data to send to HTML
// how to add the member HTML templates to the main template before writing file?

// added question sets as const
const managerQuestions = [
{
    type:"input",
    name: "managerName",
    message: "What is the name of your Manager?"
},
{
    type:"input",
    name: "managerId",
    message: "What is the Manager's id?"
},
{
    type:"input",
    name: "managerEmail",
    message: "What is the Manager's email?"
},
{
    type:"input",
    name: "officeNumber",
    message: "What is the Manager's office number?"
}];

const employeeQuestion = [
{ 
    // list type gives options for user to select
    type: "list",
    name: "addEmployee",
    message: "What type of employee do you want to add?",
    choices: ["Engineer", "Intern", "I am done adding employees"]
} 
];

const engineerQuestions = [
{
    type:"input",
    name: "engineerName",
    message: "What is the name of your Engineer?"
},
{
    type:"input",
    name: "engineerId",
    message: "What is the Engineer's id?"
},
{
    type:"input",
    name: "engineerEmail",
    message: "What is the Engineer's email?"
},
{
    type:"input",
    name: "github",
    message: "What is the Engineer's github?"
}];

const internQuestions = [{
    type:"input",
    name: "internName",
    message: "What is the name of your Intern?"
},
{
    type:"input",
    name: "internId",
    message: "What is the Intern's id?"
},
{
    type:"input",
    name: "internEmail",
    message: "What is the Intern's email?"
},
{
    type:"input",
    name: "school",
    message: "What is the Intern's school?"
}];



// get question response
// create html file

function addManager() {
    return inquirer.prompt(managerQuestions)
    .then(function(answers) {
        let newManager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber)
        // condensed below to registerEmployee function to avoid redundant code
        // employeeArray.push(newManager);
        // finalizeEmployees();
        registerEmployee (newManager);
    })
}

function finalizeEmployees() {
    return inquirer.prompt(employeeQuestion)
    .then(function(answers) {
        console.log(answers);
        if (answers.addEmployee == "Intern") {
            addIntern();
        } else if (answers.addEmployee == "Engineer") {
            addEngineer();
        } else {
            // some function to run the html
            console.log ("ready to generate HTML");
            console.log(employeeArray);
            // pull generateHTML function here
            generateHTML ();
        }
        
        // where to write and log the response data for addIntern and AddEnginer

    })
}

// function that console logs data for just entered employee and pushes each entry to array (employee is parameter)
function registerEmployee (employee) {
    console.log(employee);
    employeeArray.push(employee);
        finalizeEmployees();
}

function addEngineer() {
    return inquirer.prompt(engineerQuestions)
    .then(function(answers) {
    let newEngineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github)
        registerEmployee (newEngineer);
    })    
}

function addIntern() {
    return inquirer.prompt(internQuestions)
    .then(function(answers) {
    let newIntern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.school)
        registerEmployee (newIntern);
    })
}


function generateHTML () {

// generated html for every employee card we make (html text for each card). Add to empty string?
var teamProfile = "";

// for loop to generate card for each employee in array and add to HTML template
employeeArray.forEach (employee => {    
    teamProfile+= employee 
    // template literal for cards, also $ for adding divs, classes, etc.
})

// concatenate in a string is simplist for generating HTML
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
            background-image: url(../assets/so-white.png);
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

            ${teamProfile}

        </div>
    </div>
</body>
</html>`

// write to file
fs.writeFile('team.html', htmlTemplate, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('team.html generated!');
});
}

function init (){
addManager();

    // const htmlData = {
    //     managerName:answers.managerName,
    //     managerId:answers.mangaerId,
    //     managerEmail:answers.managerEmail
    // }

    // const html = generateHTML(htmlData);

    // return writeFileAsync("index.html", html);
  
    // do I need this? what is this doing?
//   .then(function() {
//     console.log("Successfully wrote to index.html");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

}

// need to make sure tests pass

// async function init() {
//     console.log("async init function works")
//     try {
//         // from questions
//       const answers = await promptUser();
//       console.log(answers);

//     // need to complete question answers object
//     const htmlData = {
//         name:answers.name,
//         id:answers.id,
//         email:answers.email
//     }

//     console.log(htmlData);
  
    // Need some sort of function to use data and generate the HTML
    // const html = generateHTML(htmlData);

    // how to use the classes, constructors, and placeholders in html?

    // how to write to file and combine templates?
    // new, map, push

//     await writeFileAsync("team.html", html);
  
//     console.log("Successfully wrote to team.html");

// }   catch(err) {
//     console.log(err);
//     }
// }

// initiates all calls
init ();

