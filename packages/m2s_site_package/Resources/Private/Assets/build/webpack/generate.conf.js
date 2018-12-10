'use strict';

const CONFIG = require('./base.conf');

/** Utilities */
const webpack = require('webpack');

/** Plugins */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Analysis
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

/* @todo: implement CSS optimizations */
// const MediaQueryPlugin = require('media-query-plugin');

CONFIG.plugins = (CONFIG.plugins || []).concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new ImageMinPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    optipng: { optimizationLevel: 3 },
    jpegtran: { progressive: true },
    gifsicle: { optimizationLevel: 1 },
    svgo: {}
  }),
  new MiniCSSExtractPlugin({
    filename: 'Css/[name].css',
    chunkFilename: 'Css/[name].[id].css'
  }),
  new OptimizeCssAssetsPlugin()
]);

if (process.env.ANALYZE_BUNDLES === 'on') {
  CONFIG.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        ANALYZE_BUNDLES: JSON.stringify('on')
      }
    })
  );
  CONFIG.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = CONFIG;
