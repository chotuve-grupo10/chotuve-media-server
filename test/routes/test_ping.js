'use strict';

var request = require('supertest');

describe('Routes', function() {
  var app;
  beforeEach(function() {
    app = require('../../app');
  });
  afterEach(function() {
    app.close();
  });
  describe('Ping', function() {
    it('should return HTTP 200 - OK and "Health: OK" within the response body',
      function() {
        request(app)
          .get('/api/ping')
          .expect('Content-Type', /json/)
          .expect(200, 'ok');
      });
  });
});
