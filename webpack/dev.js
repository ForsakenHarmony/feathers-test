const webpack       = require('webpack');
const config_server = require('./webpack.config.server_dev');
const config_client = require('./webpack.config.dev');

config_server.watch = false;

(() => {
  webpack(config_server, (e, s) => {
    if (e) {
      console.error(e);
      return
    }
    
    log('Build in ' + (s.endTime - s.startTime) + 'ms ' + s.hash);
    log('Restarting Server ...');
  });
  
  function log(string) {
    console.log('[webpack] ' + string);
  }
})();

(() => {
  webpack(config_client, (e, s) => {
    if (e) {
      console.error(e);
      return
    }
    
    log('Build in ' + (s.endTime - s.startTime) + 'ms ' + s.hash);
  });
  
  function log(string) {
    console.log('[webpack-client] ' + string);
  }
})();
