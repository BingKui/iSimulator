const infoStyle = 'background: #2db7f5;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const warnStyle = 'background: #ff9900;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const errorStyle = 'background: #ed4014;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const successStyle = 'background: #19be6b;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const logger = {
    _log: (style, ...args) => {
        const tips = [];
        const vals = [];
        const tip = args[0];
        if (typeof tip === 'string') {
            tips.push(`%c${tip + ''}`);
            tips.push(style);
        }
        for (let i = 1; i < args.length; i++) {
            const item = args[i];
            vals.push(item);
        }
        console.log(...tips, ...vals);
    },
    info: (...args) => {
        logger._log(infoStyle, ...args);
    },
    warn: (...args) => {
        logger._log(warnStyle, ...args);
    },
    error: (...args) => {
        logger._log(errorStyle, ...args);
    },
    success: (...args) => {
        logger._log(successStyle, ...args);
    },
    img: () => {},
    table: () => {},
};

export default logger;
