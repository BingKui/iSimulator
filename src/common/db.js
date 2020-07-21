import { ipcRenderer } from 'electron';

/**
 * 向数据库中保存一条记录
 * @param {String} name 数据库名称
 * @param {Object} object 需要保存的对象
 */
export const addItem = (name, object) => {
    ipcRenderer.send(`${name}-add`, object);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-add-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 获取数据库中所有的数据
 * @param {String} name 数据库名称
 */
export const getAllItems = (name) => {
    ipcRenderer.send(`${name}-find-all`);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-all-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 按条件查询
 * @param {String} name 数据库名称
 * @param {Object} item 查询对像
 * @param {Object} condition 查询条件
 */
export const getItemsByCondition = (name, item, condition) => {
    ipcRenderer.send(`${name}-find`, item, condition);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 通过 _id 删除一条数据
 * @param {String} name 数据库名称
 * @param {String} id 数据 ‘_id’
 */
export const delItem = (name, id) => {
    ipcRenderer.send(`${name}-del`, id);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-del-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 根据条件更新一条或者多条数据
 * @param {String} name 数据库名称
 * @param {Object} condition 更新条件
 * @param {Object} value 更新结果
 */
export const updateItem = (name, condition, value) => {
    ipcRenderer.send(`${name}-update`, condition, value);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-update-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};
