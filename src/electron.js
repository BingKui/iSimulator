// electron 相关的原生方法封装
import { app, Notification, globalShortcut, Menu, ipcMain, BrowserView } from 'electron';
import path from 'path';
import Datastore from 'nedb';

// 主进程中的通知，只能在主进程中使用
const Notic = (title, body) => {
    const _n = new Notification({
        title, // 标题
        subtitle: '', // 副标题
        body, // 内容
        silent: true, // 是否发出提示音
        hasReply: false, // 是否存在回复框
        replyPlaceholder: '', // 回复框中的提示信息
        closeButtonText: '关闭', // 关闭按钮文案
    });
    _n.show();
};

/**
 * 添加系统快捷键，建议使用 constants 中的枚举值
 * @param {String} key 快捷键组合
 * @param {Function} action 快捷键的操作函数
 */
const AddShortcuts = (key, action) => {
    globalShortcut.register(key, action);
};

/**
 * 添加菜单
 * @param {Array} menuList 菜单数组对象
 */
const AddMenuList = (menuList=[]) => {
    const template = [{
        label: app.getName(),
        submenu: [
            { label: `关于${app.getName()}`, role: 'about', accelerator: 'Command+I', },
            { label: '隐藏', role: 'hide' },
            { type: 'separator' },
            { label: '退出', role: 'quit', accelerator: 'Command+Q' }
        ]
    }];
    const _t = template.concat(menuList);
    const menu = Menu.buildFromTemplate(_t);
    Menu.setApplicationMenu(menu);
};

/**
 * 添加本地数据库
 * @param {String} name 数据库名称
 */
const AddDataBase = (name) => {
    const db = new Datastore({
        filename: path.join(app.getPath('userData'), `${name}.db`), // 数据文件
        autoload: true, // 自动加载
    });
    // 添加数据库的增删改查基本方法监听，监听方式 ‘name-type’
    ipcMain.on(`${name}-add`, (event, item) => {
        db.insert(item, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-add-result`, false);
            }
            event.sender.send(`${name}-add-result`, newDoc);
        });
    });
    ipcMain.on(`${name}-del`, (event, id) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            if (err) {
                event.sender.send(`${name}-del-result`, false);
            }
            event.sender.send(`${name}-del-result`, true);
        });
    });
    ipcMain.on(`${name}-update`, (event, condition, value) => {
        db.update(condition, { $set: value }, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-update-result`, false);
            }
            event.sender.send(`${name}-update-result`, true);
        });
    });
    ipcMain.on(`${name}-find-all`, (event) => {
        db.find({}, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-all-result`, false);
            }
            event.sender.send(`${name}-find-all-result`, docs);
        });
    });
    ipcMain.on(`${name}-find`, (event, item, condition) => {
        db.find(item, condition, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-all-result`, false);
            }
            event.sender.send(`${name}-find-all-result`, docs);
        });
    });
};

const AddBrowerView = (win) => {
    let view;
    ipcMain.on('add-browerview', (event, url, condition) => {
        console.log('执行到这里');
        view = new BrowserView();
        win.setBrowserView(view);
        view.setBounds({ x: 0, y: 60, width: 375, height: 667 });
        view.webContents.loadURL(url);
        view.webContents.enableDeviceEmulation({
            screenPosition: 'mobile',
            screenSize: {
                width: 375,
                height: 667,
            },
            viewSize: {
                width: 375,
                height: 667,
            },
            viewPosition: {
                x: 0,
                y: 0,
            },
            deviceScaleFactor: 100,
            scale: 1,
        });
        const contents = view.webContents;
        if (!contents.debugger.isAttached()) {
            contents.debugger.attach('1.3');
        }
        // console.log(contents, id);
        if (!contents) {
            console.log('null contents');
            return;
        }
        contents.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', { enabled: true }, (error, result) => {
            console.log('setEmitTouchEventsForMouse', error, result);
        });
        contents.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
            enabled: true,
            configuration: 'mobile',
        }, (error, result) => {
            console.log('setTouchEmulationEnabled', error, result);
        });
        contents.on('page-title-updated', (e, title, explicitSet) => {
            event.sender.send('title-change', title);
        });
        contents.on('did-navigate', (e, url) => {
            event.sender.send('url-change', contents.canGoBack());
        });

        view.webContents.on('did-finish-load', () => {
            event.sender.send('add-browerview-result', true);
        });
    });
    ipcMain.on('open-devtools', (event, url, condition) => {
        view.webContents.openDevTools();
        view.webContents.executeJavaScript('console.clear();');

    });
    ipcMain.on('close', (event, url, condition) => {
        win.removeBrowserView(view);
        event.sender.send('close-result', true);
    });
    ipcMain.on('back', (event, url, condition) => {
        view.webContents.goBack();
    });
    ipcMain.on('set-mobile', (event, url, condition) => {
        view.webContents.enableDeviceEmulation({
            screenPosition: 'mobile',
        });
    });
    ipcMain.on('set-window-fixed', (event, flag=false, condition) => {
        // 置顶
        win.setAlwaysOnTop(flag);
    });

};

module.exports = {
    Notic,
    AddShortcuts,
    AddMenuList,
    AddDataBase,
    AddBrowerView,
};
