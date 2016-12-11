const webpack = require('webpack');
const path    = require('path');
const fs      = require('fs');

// let nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function (x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function (mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

module.exports = {
  entry: [
    // './webpack/dev.server.js'
    './tst'
  ],
  // target   : 'node',
  output: {
    path: path.join(__dirname, './dist'),
    // filename: 'server.js'
    filename: 'bla.js'
  },
  // node: {
  //   __dirname: false
  // },
  module   : {
    rules: [{
      test   : /\.jsx?$/,
      exclude: /node_modules/,
      loader : 'babel-loader',
      options: {
        babelrc: false
      }
    }]
  },
  // externals: nodeModules
};
