const { readMarkdownFile } = require('@node');

/**
 * 加载markdown内容
 * @param {String} filename 文件名
 */
export const loadMarkdownFile = (filename) => {
    return readMarkdownFile(filename);
};
