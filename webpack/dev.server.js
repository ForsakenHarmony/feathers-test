const webpack = require('webpack');
const config  = require('./webpack.config.dev');

const app = require('../src/server/app');

let compiler = webpack(config);

const dev_middleware = require('webpack-dev-middleware')(compiler, {
  noInfo    : true,
  publicPath: '/'
});

const hot_middleware = require('webpack-hot-middleware')(compiler);

app.use(dev_middleware)
   .use(hot_middleware)
   .finish(app);

const port   = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);

module.exports = { app, server };
