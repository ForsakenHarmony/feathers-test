const debug = require('debug');

debug.enable('*');
const log = debug('server:index');

const app = require('./app');

const port   = app.get('port');
const server = app.listen(port);

server.on('listening', () => {
  log(`Feathers application started on ${app.get('host')}:${port}`);
});
