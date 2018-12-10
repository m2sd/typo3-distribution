'use strict';

/** Utilities */
const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');

/** Plugins */
const CleanPlugin = require('clean-webpack-plugin');
const TypoScriptPlugin = require('typoscript-webpack-plugin');

/** Variables */
const ENV = process.env.NODE_ENV;
const BUILD_ROOT = path.resolve(__dirname, '../..');
const PACKAGE_ROOT = path.resolve(__dirname, '../../../../..');

const CONFIG = {
  mode: ENV,
  entry: {
    main: path.join(BUILD_ROOT, 'src/index.js'),
    home: path.join(BUILD_ROOT, 'src/home.js'),
    list: path.join(BUILD_ROOT, 'src/list.js')
  },
  output: {
    path: path.join(PACKAGE_ROOT, 'Resources/Public/Generated'),
    filename: 'Js/[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new CleanPlugin(['Generated'], {
      root: path.join(PACKAGE_ROOT, 'Resources/Public/')
    }),
    new TypoScriptPlugin({
      filename: 'Assets.t3s',
      outputPath: path.join(
        PACKAGE_ROOT,
        'Configuration/TypoScript/Config/Page'
      ),
      typoScriptPublicPath: 'EXT:m2s_site_package/Resources/Public/Generated/',
      loading: {
        customSource: path.join(BUILD_ROOT, 'src/loading'),
        background: '#3f3f3f'
      },
      typoScriptAdditionalDefaults: {
        all: [
          'if.equals.data = levelfield:-2,backend_layout_next_level,slide',
          'if.equals.override.field = backend_layout'
        ]
      },
      chunks: [
        {
          name: 'main',
          includeTypes: { js: 'includeJSFooterlibs' },
          additionalTypoScript: 'if >'
        },
        {
          name: 'home',
          additionalTypoScript: 'if.value = pagets__m2s_root'
        },
        {
          name: 'list',
          additionalTypoScript: 'if.value = pagets__m2s_list'
        }
      ]
    })
  ],
  module: {
    rules: [loaders.EsLint, loaders.Style, loaders.Script, loaders.File]
  },
  resolve: {
    alias: {
      '@': path.join(BUILD_ROOT, 'src')
    },
    extensions: ['*', '.js', '.json', '.scss', '.css']
  },
  devtool: ENV === 'production' ? '#source-map' : '#eval-source-map',
  performance: {
    hints: false
  }
  // watch: process.env.WATCH_MODE === 'on'
};

module.exports = CONFIG;
