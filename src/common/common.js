// 与系统层相关的操作方法集合
// 方便在渲染进程调用时与其他工具类方法区分，本文件中的犯法全部采用首字母大写的驼峰命名
import { clipboard } from 'electron';
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

