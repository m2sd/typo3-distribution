'use strict';

const path = require('path');
const CONFIG_ROOT = path.resolve(__dirname, '../plugins');

module.exports = {
  EsLint: {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'eslint-loader',
    options: {
      formatter: require('eslint-friendly-formatter'),
      configFile: path.join(CONFIG_ROOT, 'eslint.js')
    },
    exclude: /node_modules/
  },
  Style: {
    test: /\.s?css$/,
    use: [
      process.env.NODE_ENV === 'production'
        ? require('mini-css-extract-plugin').loader
        : 'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: CONFIG_ROOT
          }
        }
      },
      'sass-loader'
    ]
  },
  Script: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: path.join(CONFIG_ROOT, 'babel.js')
    }
  },
  File: {
    test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)$/,
    loader: 'file-loader',
    options: {
      regExp: /src\/(.+)\/[^/]+$/,
      name: '[1]/[name].[ext]',
      publicPath: '/typo3conf/ext/m2s_site_package/Resources/Public/Generated/'
    }
  }
};
