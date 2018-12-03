const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

var config = {
  entry: './all-tests.js',
  output: {
    path: path.resolve(__dirname, 'tests_build'),
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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.ProvidePlugin({ expect: ['expect.js'] })
  ]
};

module.exports = config;
