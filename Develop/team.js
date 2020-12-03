const fs = require('fs');
const inquirer = require('inquirer');

const manager = ["Manager"];
const engineer = ["Engineer"]
const intern = ["Intern"]
let employeeList = [];

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
            // manager.push(data.name);
            // manager.push(data.idInfo);
            // manager.push(data.email);
            // manager.push(data.office);

            let managerName = data.name;
            let managerID = data.idInfo;
            let managerEmail = data.emaill;
            let managerOffice = data.office;
            let manager = new Manager(
                managerName,
                managerID,
                managerEmail,
                managerOffice
            );

            employeeList.push(manager);    

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
            engineer.push(data.name);
            engineer.push(data.idInfo);
            engineer.push(data.email);
            engineer.push(data.github);

            let engineerName = data.name;
            let engineerID = data.idInfo;
            let engineerEmail = data.emaill;
            let engineerOffice = data.office;
            let engineer = new Engineer(
                engineerName,
                engineerID,
                engineerEmail,
                engineerOffice
            );

            employeeList.push(engineer);

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
            intern.push(data.name);
            intern.push(data.idInfo);
            intern.push(data.email);
            intern.push(data.school);

            let internName = data.name;
            let internID = data.idInfo;
            let internEmail = data.emaill;
            let internOffice = data.office;
            let intern = new Intern(
                internName,
                internID,
                internEmail,
                internOffice
            );

            employeeList.push(intern);
                        
            if (data.morePeople === "Yes") {
                employeeRole();
            } else {
                writeInfo(data);
            }
        })  
}


function writeInfo(data) {
    console.log(manager);
    console.log(engineer);
    console.log(intern);
    console.log(employeeList);
    const redmeFile = `
    # Test
    
    `;
    
    fs.writeFile('./output/Team.js', redmeFile, (err) =>
    err ? console.log(err) : console.log("success!")
    )
}


managerRole();

