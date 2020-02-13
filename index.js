const fs = require('fs')
const axios = require('axios')
const prompt = require('inquirer').createPromptModule()
// const inquirer = require('inquirer')
// const prompt = inquirer.createPromptModule()

prompt([
  {
    type: 'input',
    name: 'userName',
    message: 'Please enter your GIT Hub name: '
  },
  {
    type: 'input',
    name: 'repoName',
    message: 'Please enter a repo name: '
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please enter installation instructions: '
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please enter what is is used for: '
  },
  {
    type: 'input',
    name: 'contributors',
    message: 'Please enter any contributors: '
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please enter tests performed: '
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Please enter any questions: '
  }
])

  .then(({userName, repoName, installation, usage, contributors, tests, questions}) => {
    axios.get(`https://api.github.com/search/repositories?q=${repoName}+user:${userName}`)
  .then(({data}) => {
    
    fs.writeFile('README.md', ` 
    ![${userName}](${data.items[0].owner.avatar_url})
    GIT hub user name: ${userName}
    
    Repo name: ${repoName}
    Description: ${data.items[0].description}
    Installation: ${installation}
    Usage: ${usage}
    License: ${data.items[0].license}
    Contributing: ${contributors}
    Tests: ${tests}
    Questions: ${questions}
    
    `, e => e ? console.log(e) : null)

  })
  .catch(e => console.error(e))
    
  })
  .catch(e => console.error(e))



