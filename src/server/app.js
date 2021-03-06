const path          = require('path');
const serveStatic   = require('feathers').static;
const favicon       = require('serve-favicon');
const compress      = require('compression');
const cors          = require('cors');
const feathers      = require('feathers');
const configuration = require('feathers-configuration');
const hooks         = require('feathers-hooks');
const rest          = require('feathers-rest');
const bodyParser    = require('body-parser');
const socketio      = require('feathers-socketio');
const middleware    = require('./middleware/index');
const services      = require('./services/index');

const app = feathers();

console.log(path.join(__dirname, '..'));
app.configure(configuration(path.join(__dirname, '..')));

module.exports = app;
app.use(compress())
   .options('*', cors())
   .use(cors())
   .use(favicon(path.join(app.get('public'), 'favicon.ico')))
   .use(['/signup', '/login', '/chat', '/'], serveStatic(app.get('public')))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .configure(hooks())
   .configure(rest())
   .configure(socketio())
   .configure(services)
   .configure(middleware);
