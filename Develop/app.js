const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
                validate: function (email) {
  
                    valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  
                        if (valid) {
                            return true;
                        } else {
                            console.log('Please enter a valid email')
                            return false;
                        }

                }
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
                writeInfo();
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
                validate: function (email) {
  
                    valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  
                        if (valid) {
                            return true;
                        } else {
                            console.log('Please enter a valid email')
                            return false;
                        }

                }
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
                writeInfo();
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
                validate: function (email) {
  
                    valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  
                        if (valid) {
                            return true;
                        } else {
                            console.log('Please enter a valid email')
                            return false;
                        }

                }
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
                writeInfo();
            }
        })  
}


function writeInfo() {
    // render = employeeList;
    console.log(team);
    	const HTML = render(team);
	        try {
		fs.writeFileSync(outputPath, HTML);
	        } catch (error) {
		console.log(error.message);
	    }
}


managerRole();





