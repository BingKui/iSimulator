export const ACTION_KEY = {
    open: 'open-browerview', // 打开 BrowserView
    close: 'close-browerview', // 关闭 BrowserView
    show: 'view-show', // 显示 BrowserView
    hide: 'view-hide', // 隐藏 BrowserView
    exit: 'app-exit',
    title: 'title-change', // 标题改变
    url: 'url-change', // 地址改变
    getUrl: 'get-url', // 获取url
    openDevTools: 'open-devtools', // 打开 开发工具
    back: 'page-back', // 执行页面返回
    pageRefresh: 'page-refresh', // 刷新页面
    fixed: 'window-fixed', // 置顶窗口
    ua: 'set-ua', // 修改 UserAgent
    device: 'set-device', // 修改模拟设备
};

export const ACTION_RESULT = '-result';
