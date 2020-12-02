const fs = require('fs');
const inquirer = require('inquirer');

function start() {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
            },    
            {
                type: 'input',
                name: 'idInfo',
                message: 'What is your employee ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is your role?',
                choices: ['Manager', 'Engineer', 'Intern'],
            },                        
        ])
    
        .then((data) => {
            role(data);
            writeInfo(data);

        })  
}

function role(data) {

  const path = `${data.role}`;

  switch (path) {
    case 'Manager':
      return managerRole();

    case 'Engineer':
      return engineerRole();

    case 'Intern':
      return internRole();
};
}

function managerRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'phone',
                message: 'What is your office number?',
            },            
        ])
        .then((data) => {
            writeInfo(data);
        })  
}

function engineerRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'gitUser',
                message: 'What is your GitHub user name?',
            },            
        ])
        .then((data) => {
            writeInfo(data);
        })  
}

function internRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'school',
                message: 'What school do you go to?',
            },            
        ])
        .then((data) => {
            writeInfo(data);
        })  
}

function writeInfo(data) {
    const redmeFile = `
# ${data.name}
# ${data.idInfo}
# ${data.email}
# ${data.role}
# ${data.phone}
# ${data.gitUser}
# ${data.school}
`;

    fs.writeFile('README.md', redmeFile, (err) =>
        err ? console.log(err) : console.log("success!")
    )
}

start();

