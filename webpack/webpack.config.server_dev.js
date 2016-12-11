const webpack = require('webpack');
const path    = require('path');
const fs      = require('fs');

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

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry    : './webpack/dev.server.js',
  target   : 'node',
  output   : {
    path    : path.join(__dirname, '../build'),
    filename: 'backend.js'
  },
  module   : {
    rules: [{
      test   : /\.jsx?$/,
      exclude: /node_modules/,
      loader : 'babel-loader',
      query  : babelrc
    }]
  },
  node     : {
    __dirname: false
  },
  externals: nodeModules,
  plugins  : [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner   : 'require(\'source-map-support\').install();',
      raw      : true,
      entryOnly: false
    })
  ],
  devtool  : 'sourcemap'
};
