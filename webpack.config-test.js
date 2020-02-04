const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const situations = ['controle', 'inventaire', 'tri', 'questions', 'securite', 'prevention', 'maintenance', 'livraison'];

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
    extensions: ['.js', '.vue'],
    alias: {
      accueil: path.resolve(__dirname, 'src/situations/accueil/'),
      commun: path.resolve(__dirname, 'src/situations/commun/'),
      ...aliasSituations
    }
  },
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({ expect: ['expect.js'] }),
    new VueLoaderPlugin()
  ]
};

module.exports = config;
