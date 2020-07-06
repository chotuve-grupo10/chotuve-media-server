'use strict';

var TestDbHelper = require('../../TestDbHelper').TestDbHelper;
var Database = require('../../Database').Database;
var chai = require('chai');
var expect = chai.expect;

const dbHelper = new TestDbHelper();

describe('Database', function() {

  this.beforeAll(async() => {
    await dbHelper.start();
  });

  this.afterAll(async() => {
    await dbHelper.stop();
  });

  var db_test;
  beforeEach(function() {

    db_test = new Database(dbHelper.db);
  });

  afterEach(async function() {
    await dbHelper.cleanup(); ;
  });

  describe('Add video', function() {
    it('should return one video', function(done) {

      let video_to_add = {
        description: 'fsaf',
        fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
        isPrivate: false,
        latitude: '-72.544969',
        longitude: '-13.163175',
        title: 'fgsdf',
        url: 'test',
        user: 'diegote@gmail.com',
        upload_date: '6/7/2020',
      };

      db_test.addVideo(video_to_add, function(err, videoInserted){
        if (err) done(err);

        db_test.getAllVideos(function(err, videosList){
          if (err) {
            console.log(err);
            done(err);
          }

          expect(videosList.length).to.be.eq(1);
          done();
        });
      });
    });
  });

  describe('List videos', function() {
    it('should return no videos for non existing user', function(done) {

      let video_to_add = {
        description: 'fsaf',
        fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
        isPrivate: false,
        latitude: '-72.544969',
        longitude: '-13.163175',
        title: 'fgsdf',
        url: 'test',
        user: 'diegote@gmail.com',
        upload_date: '6/7/2020',
      };

      db_test.addVideo(video_to_add, function(err, videoInserted){
        if (err) {
          console.log(err);
          done(err);
        }

        db_test.getAllVideosForUser('test', function(err, videosList){
          if (err) {
            console.log(err);
            done(err);
          }

          expect(videosList.length).to.be.eq(0);
          done();
        });
      });
    });

    it('should return one video for existing user', function(done) {

      let video_to_add = {
        description: 'fsaf',
        fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
        isPrivate: false,
        latitude: '-72.544969',
        longitude: '-13.163175',
        title: 'fgsdf',
        url: 'test',
        user: 'diegote@gmail.com',
        upload_date: '6/7/2020',
      };

      db_test.addVideo(video_to_add, function(err, videoInserted){
        if (err) {
          console.log(err);
          done(err);
        }

        // eslint-disable-next-line max-len
        db_test.getAllVideosForUser('diegote@gmail.com', function(err, videosList){
          if (err) {
            console.log(err);
            done(err);
          }

          expect(videosList.length).to.be.eq(1);
          expect(videosList[0].user).to.be.eq('diegote@gmail.com');
          done();
        });
      });
    });

    it('should return one video for id', function(done) {

      let video_to_add = {
        description: 'fsaf',
        fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
        isPrivate: false,
        latitude: '-72.544969',
        longitude: '-13.163175',
        title: 'fgsdf',
        url: 'test',
        user: 'diegote@gmail.com',
        upload_date: '6/7/2020',
      };

      db_test.addVideo(video_to_add, function(err, videoInserted){
        if (err) {
          console.log(err);
          done(err);
        }

        // eslint-disable-next-line max-len
        db_test.getAllVideos(function(err, videosList){
          if (err) {
            console.log(err);
            done(err);
          }

          let id = videosList[0]._id;

          db_test.getVideoById(id, function(err, video){
            if (err){
              console.log(err);
              done(err);
            }

            // eslint-disable-next-line max-len
            expect(video.fileName).to.be.eq('5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c');
            expect(video.description).to.be.eq('fsaf');
            expect(video.url).to.be.eq('test');
            done();
          });
        });
      });
    });
  });

  describe('Delete video', function() {
    it('should delete only video so list is empty', function(done) {

      let video_to_add = {
        description: 'fsaf',
        fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
        isPrivate: false,
        latitude: '-72.544969',
        longitude: '-13.163175',
        title: 'fgsdf',
        url: 'test',
        user: 'diegote@gmail.com',
        upload_date: '6/7/2020',
      };

      db_test.addVideo(video_to_add, function(err, videoInserted){
        if (err) {
          console.log(err);
          done(err);
        }

        db_test.getAllVideos(function(err, videosList){
          if (err) {
            console.log(err);
            done(err);
          }

          expect(videosList.length).to.be.eq(1);
          let id = videosList[0]._id;

          db_test.deleteVideoById(id, async function(err, video){
            if (err){
              console.log(err);
              done(err);
            }

            db_test.getAllVideos(function(err, videos){
              if (err){
                console.log(err);
                done(err);
              }

              expect(videos.length).to.be.eq(0);
              done();
            });
          });
        });
      });
    });
  });
});
