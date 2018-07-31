const assert = require('assert');
const app = require('../../src/app');

describe('\'trail-db\' service', () => {
  it('registered the service', () => {
    const service = app.service('trail-db');

    assert.ok(service, 'Registered the service');
  });
});
