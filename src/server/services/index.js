const messages       = require('./messages/index');
const authentication = require('./authentication/index');
const user           = require('./user/index');

module.exports = function services() {
  const app = this;
  
  app.configure(authentication);
  app.configure(user);
  app.configure(messages);
};
