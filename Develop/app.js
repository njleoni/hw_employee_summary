const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let team = [];

function managerRole() {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Manager\'s name?',
            },    
            {
                type: 'input',
                name: 'idInfo',
                message: 'Manager\'s employee ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Manager\'s email address?',
            },
            {
                type: 'input',
                name: 'office',
                message: 'What is your office number?',
            },
            {
                type: 'list',
                name: 'morePeople',
                message: 'Are there more team members?',
                choices: ['Yes', 'No'],
            },                        
        ])
    
        .then((data) => {
            let managerName = data.name;
            let managerID = data.idInfo;
            let managerEmail = data.email;
            let managerOffice = data.office;
            let manager = new Manager(
                managerName,
                managerID,
                managerEmail,
                managerOffice
            );

            team.push(manager);    

            if (data.morePeople === "Yes") {
                employeeRole();
            } else {
                writeInfo(data);
            }
        })  
}

function employeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What is your role?',
                choices: ['Engineer', 'Intern'],
            },            
        ])
        .then(data => {
            if (data.role === "Engineer") {
                engineerRole(data);
            } else {
                internRole(data);;
            }
        })  
}

function engineerRole(data) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Engineer name?',
            },    
            {
                type: 'input',
                name: 'idInfo',
                message: 'Engineer\'s employee ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Engineer\'s email address?',
            },
            {
                type: 'input',
                name: 'gitUser',
                message: 'What is your GitHub user name?',
            },            
            {
                type: 'list',
                name: 'morePeople',
                message: 'Are there more team members?',
                choices: ['Yes', 'No'],
            },
        ])
        .then((data) => {
            let engineerName = data.name;
            let engineerID = data.idInfo;
            let engineerEmail = data.email;
            let engineerGithub = data.gitUser;
            let engineer = new Engineer(
                engineerName,
                engineerID,
                engineerEmail,
                engineerGithub
            );

            team.push(engineer);

            if (data.morePeople === "Yes") {
                employeeRole();
            } else {
                writeInfo(data);
            }
        })  
}

function internRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Intern\'s name?',
            },    
            {
                type: 'input',
                name: 'idInfo',
                message: 'Intern\'s employee ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Intern\'s email address?',
            },            
            {
                type: 'input',
                name: 'school',
                message: 'What school do you go to?',
            },            
            {
                type: 'list',
                name: 'morePeople',
                message: 'Are there more team members?',
                choices: ['Yes', 'No'],
            },
        ])
        .then((data) => {
            let internName = data.name;
            let internID = data.idInfo;
            let internEmail = data.email;
            let internSchool = data.school;
            let intern = new Intern(
                internName,
                internID,
                internEmail,
                internSchool
            );

            team.push(intern);
                        
            if (data.morePeople === "Yes") {
                employeeRole();
            } else {
                writeInfo(data);
            }
        })  
}


function writeInfo(data) {
    console.log(team);
    const redmeFile = `
    # Test
    
    `;
    
    fs.writeFile('./output/Team.js', redmeFile, (err) =>
    err ? console.log(err) : console.log("success!")
    )
}


managerRole();