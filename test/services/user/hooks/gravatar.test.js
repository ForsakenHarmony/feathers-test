'use strict';

const assert   = require('assert');
const gravatar = require('../../../../src/server/services/user/hooks/gravatar.js');

describe('user gravatar hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type  : 'before',
      app   : {},
      params: {},
      result: {},
      data  : {
        email: 'test@example.com',
      },
    };
    
    gravatar()(mockHook);
    
    assert.ok(mockHook.data.avatar);
  });
});
