const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const situations = ['controle', 'inventaire', 'tri'];

const aliasSituations = situations.reduce(function (alias, situation) {
  alias[situation] = path.resolve(__dirname, `src/situations/${situation}/`);
  return alias;
}, {});

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
      ...aliasSituations
    }
  },
  target: 'node',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        loader: 'null-loader'
      },
      {
        test: /\.(png|jpg|wav|svg)(\?.*$|$)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.ProvidePlugin({ expect: ['expect.js'] })
  ]
};

module.exports = config;
