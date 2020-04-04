import assert from 'assert';
import app from '../../src/app';

describe('\'campaigns\' service', () => {
  it('registered the service', () => {
    const service = app.service('campaigns');

    assert.ok(service, 'Registered the service');
  });
});
