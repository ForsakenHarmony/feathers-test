'use strict';

const assert = require('assert');
const app    = require('../../../src/server/app');

describe('messages service', () => {
  it('registered the messages service', () => {
    assert.ok(app.service('messages'));
  });
});
