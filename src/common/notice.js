import { Notice } from 'view-design';
import { shell } from 'electron';

const baseConfig = {
    top: 20,
    duration: 3,
};
Notice.config(baseConfig);
export const NoticeLocal = {
    open: (title, desc) => {
        Notice.open({
            title,
            desc,
        });
    },
    info: (title, desc) => {
        Notice.info({
            title,
            desc,
        });
    },
    success: (title, desc) => {
        Notice.success({
            title,
            desc,
        });

    },
    error: (title, desc) => {
        Notice.error({
            title,
            desc,
        });
    },
    warn: (title, desc) => {
        Notice.warning({
            title,
            desc,
        });
    },
};

/**
 * 渲染进程调用系统通知
 * @param {String} title 通知标题
 * @param {String} body 通知内容
 * @param {String} href 点击跳转的链接地址
 */
export const NoticeSystem = (title, body, href='') => {
    if (!body) {
        return;
    }
    const _content = Object.assign({
        title: 'VET System Notification',
        body: '',
        icon: '../assets/icon/success.svg',
        href: '',
    }, {
        title,
        body: body.length > 50 ? `${body.substring(0, 50)}......` : body,
        href,
    });
    const _n = new window.Notification(_content.title, _content);
    _n.onclick= function(){
        _content.href && shell.openExternal(_content.href);
    };
};
