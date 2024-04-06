const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
});