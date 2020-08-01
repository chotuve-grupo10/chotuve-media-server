'use strict';

var request = require('supertest');

describe('Routes', function() {
  var app;
  beforeEach(async function() {
    app = await require('../../app');
  });
  afterEach(function() {
    app.close();
  });
  describe('Ping', function() {
    it('should return HTTP 200 - OK and "Health: OK" within the response body',
      async function() {
        await request(app)
          .get('/api/ping')
          .expect(200, '{"Health":"OK"}');
      });
  });
});
