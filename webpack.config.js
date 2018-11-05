const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      titre1: "Competences pro",
      hash: true,
      template: path.resolve(__dirname, 'src/public/index.html'),
      inject: 'head'
    })
  ],
  devServer: {
    contentBase: './src/public',
    port: 7700,
  }
};
