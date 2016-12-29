const auth  = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt   = require('feathers-authentication-jwt');
const oauth1 = require('feathers-authentication-oauth1');
const oauth2 = require('feathers-authentication-oauth2');

module.exports = function authentication() {
  const app = this;
  
  const config = app.get('auth');
  
  app.configure(auth(config))
     .configure(jwt())
     .configure(local());
};
