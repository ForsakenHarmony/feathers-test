const gulp    = require('gulp');
const webpack = require('webpack');
// const debug   = require('debug');

// const log     = debug('gulp');

const serverConfig = require('./webpack/webpack.config.server_dev');
const clientConfig = require('./webpack/webpack.config.dev');

if (process.env.NODE_ENV !== 'production') {
  serverConfig.devtool = clientConfig.devtool = 'source-map';
}

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    
    if (done) {
      done();
    }
  };
}

gulp.task('frontend-build', (done) => {
  webpack(clientConfig).run(onBuild(done));
});

gulp.task('frontend-watch', () => {
  webpack(clientConfig).watch(500, onBuild());
});

gulp.task('backend-build', (done) => {
  webpack(serverConfig).run(onBuild(done));
});

gulp.task('backend-watch', (done) => {
  webpack(serverConfig).watch(500, onBuild(done));
});
//
// gulp.task('copy-required', function (done) {
//
// });

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);
