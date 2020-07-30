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

  describe('Post videos', function() {
    it('should uplload one video successfully',
      async function() {

        // eslint-disable-next-line max-len
        let videosList = await videos_functions.getVideos(dbHelper, null, firebase_test);
        expect(videosList).to.be.lengthOf(0);

        let body = {
          title: 'Test',
          url: 'string',
          user: 'test',
          description: 'string',
          fileName: 'string',
          latitude: 'string',
          longitude: 'string',
          isPrivate: true,
        };

        await videos_functions.postVideo(dbHelper, body).catch(e => {
          console.log('Error: ', e.message);
        });

        // eslint-disable-next-line max-len
        videosList = await videos_functions.getVideos(dbHelper, null, firebase_test);
        expect(videosList).to.be.lengthOf(1);
      });

    it('should uplload two videos successfully',
      async function() {

        // eslint-disable-next-line max-len
        let videosList = await videos_functions.getVideos(dbHelper, null, firebase_test);
        expect(videosList).to.be.lengthOf(0);

        let body = {
          title: 'Test',
          url: 'string',
          user: 'test',
          description: 'string',
          fileName: 'string',
          latitude: 'string',
          longitude: 'string',
          isPrivate: true,
        };

        await videos_functions.postVideo(dbHelper, body).catch(e => {
          console.log('Error: ', e.message);
        });

        let body2 = {
          title: 'Test2',
          url: 'string',
          user: 'test2',
          description: 'string',
          fileName: 'string',
          latitude: 'string',
          longitude: 'string',
          isPrivate: true,
        };

        await videos_functions.postVideo(dbHelper, body2).catch(e => {
          console.log('Error: ', e.message);
        });

        // eslint-disable-next-line max-len
        videosList = await videos_functions.getVideos(dbHelper, null, firebase_test);
        expect(videosList).to.be.lengthOf(2);
      });
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

    it('should return one video using query user',
      async function() {
        // eslint-disable-next-line max-len
        let videosList = await videos_functions.getVideos(dbHelper, 'test', firebase_test);
        expect(videosList).to.be.lengthOf(0);

        let body = {
          title: 'Test',
          url: 'string',
          user: 'test',
          description: 'string',
          fileName: 'string',
          latitude: 'string',
          longitude: 'string',
          isPrivate: true,
        };

        await videos_functions.postVideo(dbHelper, body).catch(e => {
          console.log('Error: ', e.message);
        });

        // eslint-disable-next-line max-len
        videosList = await videos_functions.getVideos(dbHelper, 'test', firebase_test);
        expect(videosList).to.be.lengthOf(1);
      });
  });
});
