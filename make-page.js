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
        console.log('飞快的下载相关资源中，请稍等')        
        const remote = 'https://github.com/bestvayne/tem-page.git'  
        const curName = 'tem-page'  
        const tarName = answers.name  
        shell.exec(`  
                git clone ${remote}   
                mv ${curName} ${tarName} 
                cd ${tarName} 
                rm -rf ./${tarName}/.git
                rm -rf ./${tarName}/.gitignore
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
program.version(require('./package.json').version)  
program  
    .command('page')  
    .description('快速生成个人介绍页面-示例页面')  
    .action(initAction)  
program.parse(process.argv) 