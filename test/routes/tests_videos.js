'use strict';

var request = require('supertest');

describe('Videos routes', function() {
  var app;
  beforeEach(function() {
    app = require('../../app');
  });
  afterEach(function() {
    app.close();
  });
  describe('Get videos', function() {
    it('should return HTTP 403 - FORBIDEN because no token provided',
      function() {
        request(app)
          .get('/api/videos')
          .expect('Content-Type', /json/)
          .expect(403);
      });
  });

  describe('Post videos', function() {
    it('should return HTTP 403 - FORBIDEN because no token provided',
      function() {
        request(app)
          .post('/api/videos')
          .expect('Content-Type', /json/)
          .expect(403);
      });
  });
});
