const path    = require('path');
const NeDB    = require('nedb');
const service = require('feathers-nedb');
const hooks   = require('./hooks/index');

module.exports = function messages() {
  const app = this;
  
  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'messages.db'),
    autoload: true,
  });
  
  const options = {
    Model   : db,
    paginate: {
      default: 5,
      max    : 25,
    },
  };
  
  // Initialize our service with any options it requires
  app.use('/messages', service(options));
  
  // Get our initialize service to that we can bind hooks
  const messagesService = app.service('/messages');
  
  // Set up our before hooks
  messagesService.before(hooks.before);
  
  // Set up our after hooks
  messagesService.after(hooks.after);
};
