const fs = require('fs');
const inquirer = require('inquirer');

function start() {

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your repo title?',
                name: 'title',
            },    
            {
                type: 'input',
                message: 'Give me a short description of your project?',
                name: 'info',
            },
            {
                type: 'input',
                message: 'What are the installation instructions?',
                name: 'install',
            },
            {
                type: 'input',
                message: 'How is it used?',
                name: 'usage',
            },
            {
                type: 'input',
                message: 'Who contributed to this project?',
                name: 'contribute',
            },
            {
                type: 'input',
                message: 'What testing was performed?',
                name: 'test',
            },
            {
                type: 'checkbox',
                message: 'What licenses were used?',
                name: 'license',
                choices: ['Apache License 2.0', 'GNU GPLv3', 'ISC License', 'MIT License'],
            },            
            {
                type: 'input',
                message: 'What is your GitHub user name?',
                name: 'gitUser',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'Can you provide screen shot links?',
                name: 'screenCapture',
            },
        ])
    
        .then((data) => {
            writeInfo(data);

                })  
}


function writeInfo(data) {
    const urlIMG = data.license;
    if (urlIMG === "Apache License 2.0") {
        licenseImg = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (urlIMG === "GNU GPLv3") {
        licenseImg = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (urlIMG === "ISC License") {
        licenseImg = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    } else { 
        licenseImg = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    }

    const redmeFile = `
# ${data.title}
${licenseImg}
## Desription
    ${data.info}

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [Questions](#questions)

## Installation
    ${data.install}    
## Usage
    ${data.usage}
## License
    ${data.license}
## Contributing
    ${data.contribute}
## Tests
    ${data.test}
## Questions
[GitHub Repo Link](https://github.com/${data.gitUser}/${data.title})\
[Screencastify Link](https://drive.google.com/file/d/1OGCGkxQykXynQv58nLxzmi8psXL6SL2q/view)
#### If you have any additional questions, please contact me at ${data.email}

## Screenshot
![Screenshot](./Assets/my_team.PNG)

`;

    fs.writeFile('../README.md', redmeFile, (err) =>
        err ? console.log(err) : console.log("success!")
    )
}

start();

