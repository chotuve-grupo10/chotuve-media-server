'use strict';

var proxyquire = require('proxyquire');
const chai = require('chai');
const expect = chai.expect;
var firebaseMock = require('../firebase-helper');
var firebaseConfig = proxyquire('../../firebase-config', {
  'firebase-admin': firebaseMock,
});
var firebaseStorage = proxyquire('../../firebase-storage', {
  './firebase-config': firebaseConfig,
});

var file = {
  getMetadata: () => [{size: 500}],
  delete: () => {},
};

describe('Firebase', function() {
  it('should work', function(done) {
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
    firebaseStorage.getFileMetadata('sarasa').then(function(result) {
      expect(result.size).to.equal(500);
      expect(result.thumbnail).to.equal('http://localhost/thumb.jpg');
    }).then(done);
  });
});
