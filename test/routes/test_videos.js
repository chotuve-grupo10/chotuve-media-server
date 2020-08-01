'use strict';

var request = require('supertest');
var proxyquire = require('proxyquire');
var firebaseMock = require('../firebase-helper');
var firebaseConfig = proxyquire('../../firebase-config', {
  'firebase-admin': firebaseMock,
});
var firebaseStorage = proxyquire('../../firebase-storage', {
  './firebase-config': firebaseConfig,
});
var videosRouter = proxyquire('../../routes/videos', {
  '../firebase-storage': firebaseStorage,
});

var file = {
  getMetadata: () => [{size: 500}],
  delete: () => {},
};

describe('Routes', function() {
  var app;
  this.beforeAll(async function() {
    firebaseMock.storage().bucket().files['upload_test/sarasa'] = file;
    firebaseMock.database().ref('images')
      .child('sarasa').once = function(eventType) {
        return new Promise((resolve, reject) => {
          resolve(
            { val: () => {
              return { thumbnail: 'http://localhost/thumb.jpg'};
            },
            },
          );
        });
      };
  });
  beforeEach(async function() {
    app = await proxyquire('../../app', {
      './routes/videos': videosRouter,
    });
  });
  afterEach(function() {
    app.close();
  });
  describe('Videos', function() {
    it('should return HTTP 200 - OK and "Health: OK" within the response body',
      async function() {
        await request(app)
          .get('/api/videos')
          // eslint-disable-next-line max-len
          .set({ Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZ3VpbGxvdGVAZ21haWwuY29tIiwiYWRtaW5fdXNlciI6dHJ1ZSwiZXhwIjoxNTk2MjYzNzg5fQ.YdxX1-sKjfwSTngNjsg8KxybqfhY4C9aAEmIod2N99s' })
          .expect(200, '{"Health":"OK"}');
      });
  });
});
