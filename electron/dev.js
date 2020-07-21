// 命令行格式化工具
const chalk = require('chalk');
// electron
const electron = require('electron');
// 地址操作库
const path = require('path');
const { say } = require('cfonts');
const spawn = require('cross-spawn');
// webpack
const webpack = require('webpack');
// webpack-dev-server
const WebpackDevServer = require('webpack-dev-server');
// 热更新
const webpackHotMiddleware = require('webpack-hot-middleware');

// electron 主线程配置文件
const mainConfig = require('../webpack/main');
// 页面配置文件
const rendererConfig = require('../webpack/render');

const { port } = require('./config');

let electronProcess = null;
let manualRestart = false;
let hotMiddleware;

function logStats(proc, data) {
    let log = '';

    log += chalk.green.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`);
    log += '\n\n';

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n';
        });
    } else {
        log += `  ${data}\n`;
    }

    log += '\n' + chalk.green.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n';

    console.log(log);
}

function startRenderer() {
    return new Promise((resolve, reject) => {
        const compiler = webpack(rendererConfig);
        hotMiddleware = webpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500
        });

        compiler.hooks.compilation.tap('compilation', compilation => {
            compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
                'html-webpack-plugin-after-emit', (data, cb) => {
                    hotMiddleware.publish({
                        action: 'reload'
                    });
                    cb();
                });
        });

        compiler.hooks.done.tap('done', stats => {
            logStats('Renderer', stats);
        });
        const server = new WebpackDevServer(compiler, {
            quiet: true,
            before(app, ctx) {
                app.use(hotMiddleware);
                ctx.middleware.waitUntilValid(() => {
                    resolve();
                });
            },
            contentBase: path.resolve(__dirname, '../dist'),
            open: false,
            hot: true,
        });
        server.listen(port);
    });
}

function startMain() {
    return new Promise((resolve, reject) => {
        mainConfig.mode = 'development';
        const compiler = webpack(mainConfig);

        compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
            logStats('Main', chalk.white.bold('主线程打包中...'));
            hotMiddleware.publish({
                action: 'compiling'
            });
            done();
        });

        compiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }

            logStats('Main', stats);

            if (electronProcess && electronProcess.kill) {
                manualRestart = true;
                process.kill(electronProcess.pid);
                electronProcess = null;
                startElectron();

                setTimeout(() => {
                    manualRestart = false;
                }, 5000);
            }

            resolve();
        });
    });
}

function startElectron() {
    var args = [
        'ENV=dev',
        electron,
        '--inspect=5858',
        path.join(__dirname, '../dist/electron/main.js'),
    ];

    // detect yarn or npm and process commandline args accordingly
    if (process.env.npm_execpath.endsWith('yarn.js')) {
        args = args.concat(process.argv.slice(3));
    } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
        args = args.concat(process.argv.slice(2));
    }

    electronProcess = spawn('cross-env', args);

    electronProcess.stdout.on('data', data => {
        electronLog(data, 'green');
    });
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red');
    });

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit();
    });
}

function electronLog(data, color) {
    let log = '';
    data = data.toString().split(/\r?\n/);
    data.forEach(line => {
        log += `  ${line}\n`;
    });
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        );
    }
}

function greeting () {
    say('VET Dev', {
        colors: ['#0F0'],
        font: 'simple',
        space: true,
    });
}

function init() {
    greeting();
    Promise.all([startRenderer(), startMain()])
        .then(() => {
            startElectron();
        })
        .catch(err => {
            console.error(err);
        });
}

init();
