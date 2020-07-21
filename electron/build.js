'use strict';

process.env.ENV = 'prod';

const { say } = require('cfonts');
const chalk = require('chalk');
const del = require('del');
// webpack
const webpack = require('webpack');
// loading
const Multispinner = require('multispinner');


const mainConfig = require('../webpack/main');
const rendererConfig = require('../webpack/render');
// const webConfig = require('./webpack.web.config');

const doneLog = chalk.bgGreen.white(' DONE ') + ' ';
const errorLog = chalk.bgRed.white(' ERROR ') + ' ';
const okayLog = chalk.bgBlue.white(' OK ') + ' ';

// 根据不同的编译方式，执行不同的打包方法
switch (process.env.BUILD_TARGET) {
case 'clean':
    clean();
    break;
default:
    build();
    break;
}

// 清理所有的资源，除了图标
function clean () {
    del.sync(['build/*', '!build/icons', '!build/icons/icon.*']);
    console.log(`\n${doneLog}\n`);
    process.exit();
}

// 打包
function build () {
    greeting();

    del.sync(['dist/electron/*', '!.gitkeep']);

    const tasks = ['main', 'render'];
    const m = new Multispinner(tasks, {
        preText: 'building',
        postText: 'process'
    });

    let results = '';

    m.on('success', () => {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log(`\n\n${results}`);
        console.log(`${okayLog} 资源打包完成，可以执行 ${chalk.yellow('`electron-builder`')} 进行客户端打包\n`);
        process.exit();
    });

    pack(mainConfig).then(result => {
        results += result + '\n\n';
        m.success('main');
    }).catch(err => {
        m.error('main');
        console.log(`\n  ${errorLog} 主进程打包失败`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });

    pack(rendererConfig).then(result => {
        results += result + '\n\n';
        m.success('render');
    }).catch(err => {
        m.error('render');
        console.log(`\n  ${errorLog} 渲染进程打包失败`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });
}

function pack (config) {
    return new Promise((resolve, reject) => {
        config.mode = 'production';
        webpack(config, (err, stats) => {
            if (err) reject(err.stack || err);
            else if (stats.hasErrors()) {
                let err = '';

                stats.toString({
                    chunks: false,
                    colors: true
                })
                    .split(/\r?\n/)
                    .forEach(line => {
                        err += `    ${line}\n`;
                    });

                reject(err);
            } else {
                resolve(stats.toString({
                    chunks: false,
                    colors: true
                }));
            }
        });
    });
}

function greeting () {
    say('VET Build', {
        colors: ['#0F0'],
        font: 'simple',
        space: true,
    });
}
