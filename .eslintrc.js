module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 8,
        "sourceType": "module",
    },
    "plugins": [
        "vue",
    ],
    "rules": {
        // "comma-dangle": ["warn", "always-multiline"],
        "indent": ["warn", 4],
        "linebreak-style": ["warn", "unix"],
        "quotes": ["warn", "single"],
        "semi": ["warn", "always"],
        "no-unused-vars": 0,
        "no-console": 0,
        "vue/no-parsing-error": [2, {
            "x-invalid-end-tag": false
        }],
        "vue/no-unused-components": 0, // 注册无用模块
    },
};
