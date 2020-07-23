/**
 * 判断是否是 url 链接
 * @param {String} str 字符串
 */
export const isUrl = (str) => {
    return /^((https|http)?:\/\/)/.test(str);
};
