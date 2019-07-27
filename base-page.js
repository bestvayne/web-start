#!/usr/bin/env node  
const program = require('commander')  
const inquirer = require('inquirer')  
const shell = require('shelljs')  
const initAction = () => {  
    inquirer.prompt([{  
        type: 'input',  
        message: '请输入项目名称:',  
        name: 'name'  
    }]).then(answers => {  
        console.log('项目名为：', answers.name)  
        console.log('正在创建项目，请稍等')        
        const remote = 'https://github.com/bestvayne/tem-page.git'  
        const curName = 'template-source'  
        const tarName = answers.name  
        shell.exec(`  
                git clone ${remote} --depth=1  
                mv ${curName} ${tarName}  
                rm -rf ./${tarName}/.git  
                cd ${tarName}  
                npm i  
              `, (error, stdout, stderr) => {  
            if (error) {  
                console.error(`exec error: ${error}`)  
                return  
            }  
            console.log(`${stdout}`)  
            console.log(`${stderr}`)  
        });  
    })  
}  
program.version(require('../package.json').version)  
program  
    .command('init')  
    .description('创建项目')  
    .action(initAction)  
program.parse(process.argv) 