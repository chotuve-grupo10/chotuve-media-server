'use strict';
const videos_functions = require('../../utilities/videos_functions');
const firebase_test = require('../../firebase-storage-test');
const TestDbHelper = require('../../TestDbHelper').TestDbHelper;
const chai = require('chai');
const expect = chai.expect;

const dbHelper = new TestDbHelper();

describe('Videos functions', function() {

  this.beforeAll(async() => {
    await dbHelper.start();
  });

  this.afterAll(async() => {
    await dbHelper.stop();
  });

  this.afterEach(async function() {
    await dbHelper.cleanup(); ;
  });

  describe('Get videos', function() {
    it('should return zero videos',
      async function() {
        // eslint-disable-next-line max-len
        let videosList = await videos_functions.getVideos(dbHelper, null, firebase_test);
        expect(videosList).to.be.lengthOf(0);
      });

    it('should return zero videos using query user',
      async function() {
        // eslint-disable-next-line max-len
        let videosList = await videos_functions.getVideos(dbHelper, {user_name: 'test'}, firebase_test);
        expect(videosList).to.be.lengthOf(0);
      });
  });
});
