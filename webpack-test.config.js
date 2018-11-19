const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');


var config = {
  entry: './all-tests.js',
  output: {
    path: path.resolve(__dirname, 'test_build'),
    filename: 'testBundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  },

  watchOptions: {
    ignored: /node_modules/
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        loader: 'null-loader'
      }
    ]
  },

  plugins: [
    new WebpackShellPlugin({
      onBuildExit: "mocha --colors test_build/testBundle.js"
    })
  ]
};


module.exports = config;
