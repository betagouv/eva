const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const situations = ['controle', 'inventaire', 'tri', 'questions', 'securite', 'prevention', 'maintenance', 'livraison', 'objets_trouves', 'bienvenue'];

const entriesSituations = situations.reduce(function (entries, situation) {
  entries[`situation_${situation}`] = path.resolve(__dirname, `src/app/situation_${situation}.js`);
  return entries;
}, {});

const aliasSituations = situations.reduce(function (alias, situation) {
  alias[situation] = path.resolve(__dirname, `src/situations/${situation}/`);
  return alias;
}, {});

const templatesSituations = situations.map(function (situation) {
  return new HtmlWebpackPlugin({
    filename: `${situation}.html`,
    template: path.resolve(__dirname, 'src/public/template_index.html'),
    chunks: [`situation_${situation}`],
    inject: 'head'
  });
});

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/app/index.js'),
    ...entriesSituations
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name]_[contenthash].js',
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  devtool: devMode ? 'eval-cheap-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      accueil: path.resolve(__dirname, 'src/situations/accueil/'),
      commun: path.resolve(__dirname, 'src/situations/commun/'),
      src: path.resolve(__dirname, 'src/'),
      ...aliasSituations
    }
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
        test: /\.js$/,
        loader: 'babel-loader',

        options: {
          plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-object-rest-spread'],

          presets: [
            [
              '@babel/env',
              {
                modules: false,
                useBuiltIns: 'entry'
              }
            ]
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|wav|svg|woff|woff2|ttf|eot)(\?.*$|$)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[sha512:hash:base64:7].[ext]',
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/public/template_index.html'),
      chunks: ['index'],
      inject: 'head'
    }),
    ...templatesSituations,
    new webpack.EnvironmentPlugin([
      'URL_API',
      'JETON_CLIENT_ROLLBAR',
      'SOURCE_VERSION',
      'ANNONCE_GENERALE',
      'HOTJAR_ID',
      'MATOMO_ID'
    ]),
    new FaviconsWebpackPlugin('./src/public/logo.svg'),
    new VueLoaderPlugin(),
    new WorkboxPlugin.GenerateSW({
       // these options encourage the ServiceWorkers to get in there fast
       // and not allow any straggling "old" SWs to hang around
       clientsClaim: true,
       skipWaiting: true,
       maximumFileSizeToCacheInBytes: 50000000,
     })
  ],
  devServer: {
    contentBase: './src/public',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 7700
  }
};
