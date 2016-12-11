const path = require('path');
const webpack = require('webpack');

const babelrc = {
  'presets': [
    'react',
    ['latest', { 'modules': false }],
    'stage-0'
  ],
  'plugins': [
    ['transform-react-jsx', { 'pragma': 'h' }],
    ['transform-runtime'],
    ['transform-es2015-modules-commonjs']
  ]
};

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        minimize: true
      }
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
