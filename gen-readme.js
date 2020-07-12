const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter project name: "
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description of the project:"
    },
    {
      type: "input",
      name: "installation",
      message: "Enter installation instructions (if any):"
    },
    {
      type: "input",
      name: "usage",
      message: "Enter usage of the project:"
    },
    {
      type: "input",
      name: "tests",
      message: "Enter steps to test the project:"
    },
    {
        type: "input",
        name: "contributors",
        message: "List contributors to this project:"
    },  
    {
      type: "input",
      name: "questions",
      message: "Enter questions to the author of this project:"
    }, 
    {
        type: "checkbox",
        choices: [
            "Apache",
            "Github"
        ],
        name:"license"
    }
  ]);
}

//Both Angular and React use this "back-tick" way of doing javascrip/text macros
function generateReadme(answers) {
  return `
  
  # ${answers.title}


 # TABLE OF CONTENTS

 - [Title](#title)
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributors](#contributors)
 - [Tests](#tests)
 - [Questions](#questions)

 
  ## Description
  
    ${answers.description}

  ## Installation:
    ${answers.installation}
  
  ## Usage:

    ${answers.usage}

  ## Contributors:

    ${answers.contributors}

  ## Tests:

    ${answers.tests}

  ## License:

    ${answers.license}

  `;
}


function getBadge(licenseEntered){
  return `![GitHub license](https://img.shields.io/badge/license-${licenseEntered}-blue.svg)`;
}


async function init() {
  console.log("init called")
  try {
    const answers = await promptUser();

    const badge = getBadge(answers.license);
    console.log("badge " + badge);

    const md = generateReadme(answers);

    await writeFileAsync("readme.md", badge + "\n" + md);

    console.log("MD Await:\n", md);

    console.log("Successfully wrote to readme.md");
  } catch(err) {
    console.log(err);
  }
}

init();



