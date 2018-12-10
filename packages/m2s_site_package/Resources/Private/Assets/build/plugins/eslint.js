'use strict';

const OFF = 0, WARN = 1, ERROR = 2;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: [
        'plugin:prettier/recommended'
    ],
    plugins: [
        'prettier'
    ],
    rules: {
        'prettier/prettier': [ERROR, {
            'tabWidth': 4,
            'singleQuote': true
        }],
        'no-console': isProduction ? ERROR : WARN,
        'no-debugger': isProduction ? ERROR : WARN,
        'no-new': OFF,
        'no-undef': OFF,
        'semi': OFF,
        'no-extra-semi': OFF,
        'no-mixed-spaces-and-tabs': OFF,
        'no-unexpected-multiline': OFF
    }
};