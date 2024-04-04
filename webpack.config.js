const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

      },
      {

        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',

      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html',
}), new ESLintPlugin()],
};