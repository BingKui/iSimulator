// 菜单role枚举
export const MENU_ROLE = [
    'undo', // 撤销
    'redo', // 重做
    'cut', // 剪切
    'copy', // 复制
    'paste', // 粘贴
    'pasteAndMatchStyle', // 带格式粘贴
    'selectAll', // 全选
    'delete', // 删除
    'minimize', // 最小化当前窗口
    'close', // 关闭当前窗口
    'quit', // 退出程序
    'reload', // 重新加载当前窗口
    'forcereload', // 忽略缓存，重新加载当前窗口
    'toggledevtools', // 在当前窗口中隐藏/显示开发者工具
    'toggleFullScreen', // 切换全屏
    'resetzoom', // 将主页的缩放级别重置为初始大小
    'zoomin', // 主页面放大 10%
    'zoomout', // 主页面缩小 10%
    'editMenu', // 默认的 "编辑" 菜单 (包括撤消、复制等)
    'windowMenu', // 默认 "窗口" 菜单 (包括最小化、关闭等)
];

export const MENU_ROLE_MACOS = [
    'about', // 映射到 orderFrontStandardAboutPanel 操作
    'hide', // 映射到 hide 操作
    'hideOthers', // 映射到 hideOtherApplications 操作
    'unhide', // 映射到 unhideAllApplications 操作
    'startSpeaking', // 映射到 startSpeaking 操作
    'stopSpeaking', // 映射到 stopSpeaking 操作
    'front', // 映射到 arrangeInFront 操作
    'zoom', // 映射到 performZoom 操作
    'toggleTabBar', // 映射到 toggleTabBar 操作
    'selectNextTab', // 映射到 selectNextTab 操作
    'selectPreviousTab', // 映射到 selectPreviousTab 操作
    'mergeAllWindows', // 映射到 mergeAllWindows 操作
    'moveTabToNewWindow', // 映射到 moveTabToNewWindow 操作
    'window', // 这个子菜单是"Window" 菜单
    'help', // 这个子菜单是 "Help" 菜单
    'services', // 这个子菜单是 "Services" 菜单
    'recentDocuments', // 这个子菜单是 "Open Recent" 菜单
    'clearRecentDocuments', // 映射到 clearRecentDocuments 操作
];
