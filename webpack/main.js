const path = require('path');
const webpack = require('webpack');

const mainConfig = {
    target: 'electron-main',
    entry: {
        main: path.join(__dirname, '../src/main.js'),
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/electron'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: '../',
                        name: 'img/[name]-[folder].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@styles': path.resolve(__dirname, '../src/styles'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@router': path.resolve(__dirname, '../src/router'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@common': path.resolve(__dirname, '../src/common'),
            '@views': path.resolve(__dirname, '../src/views'),
            '@mock': path.resolve(__dirname, '../src/mock'),
            '@constants': path.resolve(__dirname, '../src/constants'),
            '@node': path.resolve(__dirname, '../src/node.js'),
            '@electron': path.resolve(__dirname, '../src/electron.js'),
        },
        extensions: ['.js', '.json', '.node'],
    },
    node: {
        __dirname: process.env.ENV !== 'prod',
        __filename: process.env.ENV !== 'prod'
    },
};

module.exports = mainConfig;
