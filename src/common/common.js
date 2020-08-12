// 与系统层相关的操作方法集合
// 方便在渲染进程调用时与其他工具类方法区分，本文件中的犯法全部采用首字母大写的驼峰命名
import { clipboard, ipcRenderer } from 'electron';

/**
 * 复制内容到粘贴板
 * @param {String} text 需要复制的内容
 */
export const Copy = (text) => {
    clipboard.writeText(text, 'c-t');
};

export const PasteValue = () => {
    return clipboard.readText('c-t');
};

export const getClipboardValue = () => {
    return clipboard.readText();
};

export const OpenBrowserView = (url) => {
    ipcRenderer.send('add-browerview', url);
    return new Promise((reslove, reject) => {
        ipcRenderer.once('add-browerview-result', (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};
export const OpenDevTools = () => {
    ipcRenderer.send('open-devtools');
};
export const PageBack = () => {
    ipcRenderer.send('back');
};

export const SetWinTop = (flag) => {
    ipcRenderer.send('set-window-fixed', flag);
};

export const HideView = (flag) => {
    ipcRenderer.send('hide-view');
};
export const ShowView = (flag) => {
    ipcRenderer.send('show-view');
};

export const ExitApp = () => {
    ipcRenderer.send('exit-app');
};

export const CloseView = () => {
    ipcRenderer.send('close');
    return new Promise((reslove, reject) => {
        ipcRenderer.once('close-result', (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

export const BindTitleChange = (callback) => {
    ipcRenderer.on('title-change', (event, title) => {
        if (title) {
            callback && callback(title);
        }
    });
};

export const BindUrlChange = (callback) => {
    ipcRenderer.on('url-change', (event, flag) => {
        callback && callback(flag);
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

export const setUserAgent = (ua) => {
    ipcRenderer.send('menu-set-ua', ua);
    return new Promise((reslove, reject) => {
        ipcRenderer.once('menu-set-ua-result', (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

export const getWebviewUrl = () => {
    ipcRenderer.send('get-url');
    return new Promise((reslove, reject) => {
        ipcRenderer.once('get-url-result', (event, url) => {
            if (url) {
                reslove(url);
            } else {
                reject();
            }
        });
    });
};
