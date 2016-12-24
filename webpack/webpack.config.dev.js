const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelrc = {
  presets       : [
    ['latest', {
      es2015: {
        modules: false,
      },
    }],
    'react',
    'stage-0',
  ],
  plugins       : [
    // ['external-helpers'],
    ['transform-react-jsx', { pragma: 'preact.h' }],
    'transform-decorators-legacy',
    // 'react-hot-loader/babel',
  ],
  babelrc       : false,
  cacheDirectory: true,
};

// var a = {
//   presets: [
//     'react',
//     ['latest', { modules: false }],
//     'stage-0',
//   ],
//   plugins: [
//     // ['transform-jsx', {'module': 'preact', 'function': 'h'}],
//     // ['transform-react-jsx', { 'pragma': 'h' }],
//     ['transform-jsx', {
//       module: path.join(__dirname, '../src/jsx'), function: 'jsx'
//     }], ['transform-runtime'], ['transform-es2015-modules-commonjs'], //
//     ['react-hot-loader/babel']],
// };

module.exports = {
  devtool: 'eval',
  entry  : [
    // 'webpack-hot-middleware/client',
    // 'react-hot-loader/patch',
    './src/client/',
  ],
  output : {
    path      : path.join(__dirname, '../public'),
    filename  : 'bundle.js',
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
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
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
        // }, {
        //   test   : /\.css$/,
        //   loaders: [
        //     /* 'style-loader/url', 'css-loader'*/
        //     'file-loader?name=[name].[ext]',
        //   ],
        //   // query: {
        //   //   name: '[name].[ext]',
        //   // },
      }, {
        test  : /\.css$/,
        loader: 'file-loader',
        query : {
          name: '[name].[ext]',
        },
      }, {
        test  : /\.ico|\.png|\.jpg$/,
        loader: 'file-loader',
        query : {
          name: '[name].[ext]',
        },
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
