// 应用更新日志
// add - 添加内容
// update - 更新内容
// del - 删除内容
// fixed - 问题修复

export default [{
    version: '1.0.0',
    date: '2020-7-22',
    logs: [{
        type: 'add',
        content: '完成基本框架，支持打开网站',
    }, {
        type: 'add',
        content: '增加窗口置顶功能',
    }, {
        type: 'add',
        content: '增加历史记录',
    }],
}, {
    version: '1.0.1',
    date: '2020-7-22',
    logs: [{
        type: 'update',
        content: '优化菜单开启界面',
    }, {
        type: 'update',
        content: '更新图标库',
    }],
}, {
    version: '1.0.2',
    date: '2020-8-3',
    logs: [{
        type: 'add',
        content: '增加粘贴板读取提示打开url',
    }, {
        type: 'add',
        content: '增加打开DevTools',
    }, {
        type: 'update',
        content: '替换UI库 element-ui => view-design',
    }, {
        type: 'update',
        content: '优化打开网站',
    }, {
        type: 'update',
        content: '更新图标库',
    }],
}, {
    version: '1.1.0',
    date: '2020-8-4',
    logs: [{
        type: 'add',
        content: '增加设置UA',
    }, {
        type: 'fixed',
        content: '修复部分展示问题&代码逻辑',
    }],
}, {
    version: '1.1.1',
    date: '2020-8-5',
    logs: [{
        type: 'update',
        content: '优化关闭',
    }, {
        type: 'update',
        content: '优化代码逻辑',
    }],
}, {
    version: '1.2.0',
    date: '2020-8-11',
    logs: [{
        type: 'add',
        content: '增加二维码',
    }],
}, {
    version: '1.2.1',
    date: '2020-8-11',
    logs: [{
        type: 'add',
        content: '增加关于',
    }, {
        type: 'update',
        content: '更新图标库',
    }],
}, {
    version: '1.2.2',
    date: '2020-8-12',
    logs: [{
        type: 'fixed',
        content: '修复二维码展示错误问题',
    }],
}, {
    version: '1.2.3',
    date: '2020-8-12',
    logs: [{
        type: 'update',
        content: '更新Electron版本',
    }],
}, {
    version: '1.2.4',
    date: '2020-8-25',
    logs: [{
        type: 'fixed',
        content: '修复获取url错误的bug',
    }, {
        type: 'update',
        content: '优化置顶模式',
    }, {
        type: 'add',
        content: '增加地址&参数查看',
    }],
}, {
    version: '1.2.5',
    date: '2020-8-25',
    logs: [{
        type: 'fixed',
        content: '修复DevTools没有同时关闭的bug',
    }],
}, {
    version: '1.2.6',
    date: '2020-8-29',
    logs: [{
        type: 'update',
        content: '逻辑优化',
    }, {
        type: 'add',
        content: '增加修改模拟器',
    }, {
        type: 'del',
        content: '删除修改UA，和修改模拟器合并',
    }],
}, {
    version: '1.3.0',
    date: '2021-09-18',
    logs: [{
        type: 'update',
        content: '更新 Electron 到 v11 支持 M1 芯片',
    }, {
        type: 'update',
        content: '完善代码注释',
    }, {
        type: 'add',
        content: '增加更新日志',
    }, {
        type: 'update',
        content: '更新图标库',
    }, {
        type: 'add',
        content: '增加应用菜单，应用菜单与页面菜单隔离',
    }, {
        type: 'add',
        content: '增加功能计划PLAN.md',
    }],
}];
