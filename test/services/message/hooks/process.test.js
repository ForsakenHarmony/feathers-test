'use strict';

const assert  = require('assert');
const process = require('../../../../src/server/services/messages/hooks/process.js');

describe('message process hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type  : 'before',
      app   : {},
      params: {
        user: {
          _id: 0,
        },
      },
      result: {},
      data  : {
        text: 'test',
      },
    };
    
    process()(mockHook);
    
    assert.ok(mockHook.data.createdAt);
  });
});
