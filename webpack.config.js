const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src/app/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
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
