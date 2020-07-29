'use strict';

var TestDbHelper = require('../../TestDbHelper').TestDbHelper;
var Database = require('../../Database').Database;
var chai = require('chai');
var expect = chai.expect;

const dbHelper = new TestDbHelper();

let test_video = {
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

let test_video2 = {
  description: 'fafafa',
  fileName: '5b2bb691-46ab-4bc4-aefc-ac9cd9b97b0c',
  isPrivate: true,
  latitude: '-72.544969',
  longitude: '-13.163175',
  title: 'fgsdf',
  url: 'test',
  user: 'guillote@gmail.com',
  upload_date: '6/7/2020',
};

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

  describe('Add videos using promises', function() {
    it('should add a video to an empty collection', async function() {
      var videos = await db_test.getVideos();
      expect(videos).to.be.empty;
      await db_test.addNewVideo(test_video);
      videos = await db_test.getVideos();
      expect(videos.length).to.equal(1);
      await db_test.addNewVideo(test_video2);
      videos = await db_test.getVideos();
      expect(videos.length).to.equal(2);
      var videos_desc = videos.map((v) => v.description);
      expect(videos_desc).to.have.members(['fsaf', 'fafafa']);
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

  describe('Get videos using promises', function() {
    it('should return an empty list when no videos available',
      async function() {
        var videos = await db_test.getVideos();
        expect(videos).to.be.empty;
      },
    );

    it('should retrieve the only loaded video', async function() {
      var res = await dbHelper.db.collection('videos').insertOne(test_video);
      var insertedId = res.insertedId;
      var objectInDatabase = await dbHelper.db.collection('videos').findOne();
      expect(objectInDatabase).not.to.be.null;
      var videos = await db_test.getVideos();
      expect(videos).not.to.be.empty;
      expect(videos[0]._id).to.eql(insertedId);
    });

    it('should retrieve the list of loaded videos', async function() {
      var res = await dbHelper.db.collection('videos').insertOne(test_video);
      var insertedId1 = res.insertedId;
      res = await dbHelper.db.collection('videos').insertOne(test_video2);
      var insertedId2 = res.insertedId;
      var videos = await db_test.getVideos();
      expect(videos).not.to.be.empty;
      var retrieved_ids = videos.map((doc) => doc._id);
      expect(retrieved_ids).to.have.deep.members([insertedId1, insertedId2]);
    });

    it('should retrieve only the videos for the specified user',
      async function() {
        var res = await dbHelper.db.collection('videos').insertOne(test_video);
        var insertedIdDiegote = res.insertedId;
        res = await dbHelper.db.collection('videos').insertOne(test_video2);
        var insertedIdGuillote = res.insertedId;
        var videos = await db_test.getVideos({for_user: 'diegote@gmail.com'});
        expect(videos).not.to.be.empty;
        var retrieved_ids = videos.map((doc) => doc._id);
        expect(retrieved_ids).to.include.deep.members([insertedIdDiegote]);
        expect(retrieved_ids).not.to.include.deep.members([insertedIdGuillote]);
      },
    );
  });

  describe('Delete videos using promises', function() {
    it('should delete video', async function() {
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

      var res = await dbHelper.db.collection('videos').insertOne(video_to_add);
      var insertedId = res.insertedId;
      var objectInDatabase = await dbHelper.db.collection('videos').findOne();
      expect(objectInDatabase).not.to.be.null;
      var deleted = await db_test.deleteVideoByObjectId(insertedId);
      expect(objectInDatabase._id).to.eql(deleted._id);
      objectInDatabase = await dbHelper.db.collection('videos').findOne();
      expect(objectInDatabase).to.be.null;
    });

    it('should throw an error with an invalid objectId', async function() {
      db_test.deleteVideoByObjectId('sarasa')
        .catch((err) => {
          expect(err).to.be.equal('Invalid ID received to delete');
        });
    });

    it('should return null with an inexistent objectId', async function() {
      var deleted =
        await db_test.deleteVideoByObjectId('5f1fa6cc27db6d00100e9e31');
      expect(deleted).to.be.null;
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
