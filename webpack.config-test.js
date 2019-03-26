const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

var config = {
  entry: './all-tests.js',
  output: {
    path: path.resolve(__dirname, 'tests_build'),
    filename: 'testBundle.js'
  },
  resolve: {
    alias: {
      accueil: path.resolve(__dirname, 'src/situations/accueil/'),
      commun: path.resolve(__dirname, 'src/situations/commun/'),
      controle: path.resolve(__dirname, 'src/situations/controle/'),
      inventaire: path.resolve(__dirname, 'src/situations/inventaire/')
    }
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
        test: /\.(png|jpg|gif|mp3|svg)(\?.*$|$)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
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
