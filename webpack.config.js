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
      {
        include: [path.resolve(__dirname, "src/app")],
        loader: "babel-loader",

        options: {
          plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"],

          presets: [
            [
              "@babel/env",
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      }
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
