// 支持打开窗口
import { ipcMain, BrowserView, nativeImage, BrowserWindow } from 'electron';
import { ACTION_KEY, ACTION_RESULT } from './constants/action';


const calcWindowPosition = (winBounds, _width, _height) => {
    const { x, y, width, height } = winBounds;
    const widthVal = (_width - width) / 2;
    const heightVal = (_height - height) / 2;
    let _x = x;
    let _y = y;
    if (widthVal < 0) {
        _x += Math.abs(widthVal);
    } else {
        _x -= Math.abs(widthVal);
    }
    if (heightVal < 0) {
        _y += Math.abs(heightVal);
    } else {
        _y -= Math.abs(heightVal);
    }
    return {
        x: parseInt(_x),
        y: parseInt(_y),
        width: _width,
        height: _height,
    };
};

const setWindowInfo = (win, info) => {
    const winBounds = win.getBounds();
    const newBounds = calcWindowPosition(winBounds, info.width, info.height + 60);
    win.setBounds(newBounds, true);
};

const setViewInfo = (view, info) => {
    view.setBounds({ x: 0, y: 60, width: info.width, height: info.height });
    view.webContents.enableDeviceEmulation({
        screenPosition: 'mobile',
        screenSize: {
            width: info.width,
            height: info.height,
        },
        viewSize: {
            width: info.width,
            height: info.height,
        },
        viewPosition: {
            x: 0,
            y: 0,
        },
        deviceScaleFactor: 100,
        scale: 1,
    });
};

const setMouseActive = (contents) => {
    if (!contents.debugger.isAttached()) {
        contents.debugger.attach('1.3');
    }
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
};

export const AddBrowerView = (win, app) => {
    let view;
    // 监听打开新的 browerview
    ipcMain.on(ACTION_KEY.open, (event_top, url) => {
        view = new BrowserView();
        const contents = view.webContents;
        win.setBrowserView(view);
        contents.loadURL(url);
        setWindowInfo(win, { width: 375, height: 667 });
        setViewInfo(view, { width: 375, height: 667 });
        contents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');
        setMouseActive(contents);
        contents.on('page-title-updated', (e, title, explicitSet) => {
            event_top.sender.send(ACTION_KEY.title, title);
        });
        contents.on('did-navigate', (e, url) => {
            event_top.sender.send(ACTION_KEY.url, contents.canGoBack());
        });
        contents.on('did-finish-load', () => {
            event_top.sender.send(`${ACTION_KEY.open}${ACTION_RESULT}`, true);
        });
    });
    // 监听关闭事件
    ipcMain.on(ACTION_KEY.close, (event, url, condition) => {
        if (view && view.webContents.isDevToolsOpened()) {
            view.webContents.closeDevTools();
        }
        win.removeBrowserView(view);
        setWindowInfo(win, { width: 375, height: 667 });
        event.sender.send(`${ACTION_KEY.close}${ACTION_RESULT}`, true);
    });
    // 监听打开开发工具事件
    ipcMain.on(ACTION_KEY.openDevTools, (event, url, condition) => {
        if (view.webContents.isDevToolsOpened()) {
            view.webContents.toggleDevTools();
            return;
        }
        view.webContents.openDevTools({
            mode: 'undocked',
            activate: true,
        });
        view.webContents.executeJavaScript('console.clear();');
    });
    let hideBounds = {};
    // 绑定隐藏事件
    ipcMain.on(ACTION_KEY.hide, (event) => {
        hideBounds = view.getBounds();
        view.setBounds({ x: 0, y: 60, width: 0, height: 0 });
    });
    // 绑定显示事件
    ipcMain.on(ACTION_KEY.show, (event) => {
        view.setBounds({ x: 0, y: 60, width: hideBounds.width || 375, height: hideBounds.height || 667 });
    });
    // 监听返回事件
    ipcMain.on(ACTION_KEY.back, (event, url, condition) => {
        view.webContents.goBack();
    });
    // 监听置顶事件
    ipcMain.on(ACTION_KEY.fixed, (event, flag=false, condition) => {
        // 置顶
        win.setAlwaysOnTop(flag);
    });
    // 监听退出事件
    ipcMain.on(ACTION_KEY.exit, (event) => {
        app.exit();
    });
    // 监听设置ua事件
    ipcMain.on(ACTION_KEY.ua, (event, userAgent) => {
        view.webContents.setUserAgent(userAgent);
        event.sender.send(`${ACTION_KEY.ua}${ACTION_RESULT}`, true);
    });
    // 监听获取url事件
    ipcMain.on(ACTION_KEY.getUrl, (event) => {
        const url = view.webContents.getURL();
        event.sender.send(`${ACTION_KEY.getUrl}${ACTION_RESULT}`, url);
    });
    // 监听刷新事件
    ipcMain.on(ACTION_KEY.pageRefresh, (event) => {
        view.webContents.reload();
        event.sender.send(`${ACTION_KEY.pageRefresh}${ACTION_RESULT}`, true);
    });
    // 监听修改设备
    ipcMain.on(ACTION_KEY.device, (event, info) => {
        try {
            const param = {
                width: parseInt(info.width),
                height: parseInt(info.height),
            };
            setWindowInfo(win, param);
            setViewInfo(view, param);
            view.webContents.setUserAgent(info.ua);
            event.sender.send(`${ACTION_KEY.device}${ACTION_RESULT}`, true);
        } catch (error) {
            event.sender.send(`${ACTION_KEY.device}${ACTION_RESULT}`, false);
        }
    });
};
