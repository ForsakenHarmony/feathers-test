const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelrc = {
  presets: [
    ['latest', {
      es2015: {
        modules: false,
      },
    }],
    'react',
    'stage-0',
  ],
  plugins: [
    ['transform-react-jsx', { pragma: 'preact.h' }],
    'transform-decorators-legacy',
  ],
  babelrc: false,
};

module.exports = {
  devtool: 'source-map',
  entry  : [
    './src/client/',
  ],
  output : {
    path      : path.join(__dirname, '../dist'),
    filename  : 'bundle.min.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias     : {
      react      : 'preact-compat',
      'react-dom': 'preact-compat',
    },
    modules   : [
      path.join(__dirname, './app/client'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
      minify  : {
        removeComments: true
      },
    }),
  ],
  module : {
    rules: [
      {
        enforce: 'pre',
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'eslint-loader',
      }, {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query  : babelrc,
      }, {
        test  : /\.html$/,
        loader: 'html-loader',
        query : {
          interpolate: true,
        },
      }, {
        test  : /\.css$/,
        loader: 'file-loader',
      }, {
        test  : /\.jsx$/,
        loader: 'imports-loader',
        query : {
          preact: 'preact',
        },
      },
    ],
  },
};
