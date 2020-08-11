import QR from 'qrcode';
/**
 * 判断是否是 url 链接
 * @param {String} str 字符串
 */
export const isUrl = (str) => {
    return /^((https|http)?:\/\/)/.test(str);
};

export const createQrCode = (canvas, value) => {
    if (canvas) {
        QR.toCanvas(canvas, value, {
            errorCorrectionLevel: 'L',
            margin: 1,
            width: 280,
        }, function(err) {
            if (err) console.log(err);
            console.log('二维码生成成功');
        });
    }
};
