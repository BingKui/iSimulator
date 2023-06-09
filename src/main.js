import { app, BrowserWindow } from 'electron'; // eslint-disable-line
import { AddMenuList, AddDataBase, ClearAllListener } from './electron';
import { AddBrowerView } from './browerViewSupport';
const path = require('path');
import DB_NAME from './constants/db';
const { port, host } = require('../electron/config');

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}
const logo = path.resolve(__dirname, './assets/logo.png');

let mainWindow;
const isDev = process.env.ENV === 'dev';
const winURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;
function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'iSimulator',
        height: 727,
        width: 375,
        center: true, // 窗口默认居中
        resizable: false, // 不可修改窗口大小
        maximizable: false, // 不存在最大化
        skipTaskbar: true, // 任务栏显示
        useContentSize: true, // 不允许修改大小
        transparent: true, // 透明
        frame: false, // 不使用框架
        fullscreenable: false,
        titleBarStyle: 'default',
        backgroundColor: 'none',
        thickFrame: false,
        type: 'panel',
        webPreferences: {
            devTools: isDev ? true : false,
            scrollBounce: false,
            nodeIntegration: true,
            webviewTag: true,
        },
    });
    // if (isDev) {
    //     mainWindow.webContents.openDevTools();
    // }

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
        ClearAllListener();
    });
    AddBrowerView(mainWindow, app);
    AddMenuList();
    // 添加数据库
    for (let key in DB_NAME) {
        AddDataBase(DB_NAME[key]);
    }
}

app.on('ready', createWindow);
app.dock && app.dock.setIcon(logo);

app.on('before-quit', () => {
    mainWindow = null;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
