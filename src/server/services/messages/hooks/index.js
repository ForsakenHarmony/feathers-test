const auth        = require('feathers-authentication');
const local       = require('feathers-authentication-local');
const permissions = require('feathers-permissions');
const hooks       = require('feathers-hooks');

const process        = require('./process');
const globalHooks    = require('../../../hooks');
const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field  : 'userId',
});

exports.before = {
  all   : [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'messages' }),
    permissions.hooks.isPermitted(),
  ],
  find  : [],
  get   : [],
  create: [process()],
  update: [hooks.remove('sentBy')],
  patch : [hooks.remove('sentBy')],
  remove: [],
};

exports.after = {
  all   : [],
  find  : [populateSender],
  get   : [populateSender],
  create: [populateSender],
  update: [],
  patch : [],
  remove: [],
};
