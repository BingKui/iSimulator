// 渲染进程绑定的事件
import { ipcRenderer } from 'electron';
import { ACTION_KEY, ACTION_RESULT } from '@constants/action';

export const OpenBrowserView = (url) => {
    ipcRenderer.send(ACTION_KEY.open, url);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${ACTION_KEY.open}${ACTION_RESULT}`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};
export const OpenDevTools = () => {
    ipcRenderer.send(ACTION_KEY.openDevTools);
};

export const PageBack = () => {
    ipcRenderer.send(ACTION_KEY.back);
};

export const PageRefresh = () => {
    console.log('PageRefresh');
    ipcRenderer.send(ACTION_KEY.pageRefresh);
};

export const SetWinTop = (flag) => {
    ipcRenderer.send(ACTION_KEY.fixed, flag);
};

export const HideView = () => {
    ipcRenderer.send(ACTION_KEY.hide);
};
export const ShowView = () => {
    ipcRenderer.send(ACTION_KEY.show);
};

export const ExitApp = () => {
    ipcRenderer.send(ACTION_KEY.exit);
};

export const CloseView = () => {
    ipcRenderer.send(ACTION_KEY.close);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${ACTION_KEY.close}${ACTION_RESULT}`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 绑定当前页面名称改变事件
 * @param {Function} callback 回调函数
 */
export const BindTitleChange = (callback) => {
    ipcRenderer.on(ACTION_KEY.title, (event, title) => {
        if (title) {
            callback && callback(title);
        }
    });
};

/**
 * 绑定当前地址改变事件
 * @param {Function} callback 回调函数
 */
export const BindUrlChange = (callback) => {
    ipcRenderer.on(ACTION_KEY.url, (event, flag) => {
        callback && callback(flag);
    });

};

/**
 * 设置 UA
 * @param {String} ua UserAgent
 */
export const SetUserAgent = (ua) => {
    ipcRenderer.send(ACTION_KEY.ua, ua);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${ACTION_KEY.ua}${ACTION_RESULT}`, (event, result) => {
            reslove(result);
        });
    });
};

/**
 * 设置设备信息
 * @param {Object} info 设备信息
 */
export const SetDevice = (info) => {
    ipcRenderer.send(ACTION_KEY.device, info);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${ACTION_KEY.device}${ACTION_RESULT}`, (event, flag) => {
            reslove(flag);
        });
    });
};

/**
 * 获取当前页面的url
 */
export const GetWebviewUrl = () => {
    ipcRenderer.send(ACTION_KEY.getUrl);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${ACTION_KEY.getUrl}${ACTION_RESULT}`, (event, url) => {
            if (url) {
                reslove(url);
            } else {
                reslove('');
            }
        });
    });
};

export const getPageCapture = () => {
    ipcRenderer.send('get-capture-page');
    // return new Promise((reslove, reject) => {
    //     ipcRenderer.once('get-capture-page-result', (event, result) => {
    //         if (result) {
    //             reslove(result);
    //         } else {
    //             reject();
    //         }
    //     });
    // });
};

export const getAllContents = (id) => {
    ipcRenderer.send('get-webcontents', id);
    return new Promise((reslove, reject) => {
        ipcRenderer.once('get-webcontents-result', (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};
