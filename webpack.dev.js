const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devServer: {
    // static: {
    //   directory: './src',
    // },

    static: './public',
    port: 9000,
    open: true
  },
  plugins: [new ESLintPlugin()],
});