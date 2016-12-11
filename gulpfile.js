const gulp    = require('gulp');
const webpack = require('webpack');
const fs      = require('fs');

const server_config = require('./webpack/webpack.config.server_dev');
const client_config = require('./webpack/webpack.config.dev');

if (process.env.NODE_ENV !== 'production') {
  server_config.devtool = client_config.devtool = 'source-map';
}

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    
    if (done) {
      done();
    }
  }
}

gulp.task('frontend-build', function (done) {
  webpack(client_config).run(onBuild(done));
});

gulp.task('frontend-watch', function () {
  webpack(client_config).watch(500, onBuild());
});

gulp.task('backend-build', function (done) {
  webpack(server_config).run(onBuild(done));
});

gulp.task('backend-watch', function (done) {
  webpack(server_config).watch(500, onBuild(done));
});
//
// gulp.task('copy-required', function (done) {
//
// });

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);
