'use strict';

const path = require('path');
const webpack = require('webpack');
const { HashedFolderCopyPlugin } = require('@rushstack/hashed-folder-copy-plugin');
const { ModuleMinifierPlugin, WorkerPoolMinifier } = require('@rushstack/webpack4-module-minifier-plugin');
const { SetPublicPathPlugin } = require('@rushstack/set-webpack-public-path-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateConfiguration(mode, outputFolderName) {
  return {
    mode: mode,
    entry: {
      test: path.join(__dirname, 'lib', 'index.js')
    },
    output: {
      path: path.join(__dirname, outputFolderName),
      filename: '[name]_[hash].js',
      chunkFilename: '[id].[name]_[hash].js',
      hashSalt: '2'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader']
        }
      ]
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new ModuleMinifierPlugin({
          minifier: new WorkerPoolMinifier({
            // Cap the number of worker processes to avoid CPU saturation.
            maxThreads: 1,

            terserOptions: {
              compress: {
                passes: 3
              },
              mangle: true,
              sourceMap: true,
              output: {
                comments: false,
                wrap_func_args: false
              }
            }
          })
        })
      ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HashedFolderCopyPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'temp', 'stats.html'),
        generateStatsFile: true,
        statsFilename: path.resolve(__dirname, 'temp', 'stats.json'),
        logLevel: 'error'
      }),
      new SetPublicPathPlugin({
        scriptName: {
          useAssetName: true
        }
      }),
      new HtmlWebpackPlugin()
    ]
  };
}

module.exports = [
  generateConfiguration('development', 'dist-dev'),
  generateConfiguration('production', 'dist-prod')
];
