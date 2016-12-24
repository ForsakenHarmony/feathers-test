const auth        = require('feathers-authentication');
const local       = require('feathers-authentication-local');
const permissions = require('feathers-permissions');
const hooks       = require('feathers-hooks');
const debug       = require('debug')('server:services:user:hooks');

const gravatar    = require('./gravatar');
const globalHooks = require('../../../hooks');

const basicPermissions = (hook) => {
  hook.data = Object.assign({}, hook.data, {
    permissions: 'users,messages',
  });
};

exports.before = {
  all   : [],
  find  : [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  get   : [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  create: [
    gravatar(),
    basicPermissions,
    (hook) => { debug(hook); },
    local.hooks.hashPassword(),
  ],
  update: [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword(),
  ],
  patch : [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword(),
  ],
  remove: [
    auth.hooks.authenticate(['jwt', 'local']),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
};

exports.after = {
  all   : [hooks.remove('password')],
  find  : [],
  get   : [],
  create: [],
  update: [],
  patch : [],
  remove: [],
};
