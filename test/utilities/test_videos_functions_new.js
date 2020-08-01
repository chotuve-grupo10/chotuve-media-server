// 'use strict';
// const videos_functions = require('../../utilities/videos_functions');
// const Video = require('../../model/Video');
// const firebase_test = require('../../firebase-storage-test');
// const dbHandler = require('../db-helper');
// const proxyquire = require('proxyquire');
// const mockfirebase = require('../firebase-helper');
// const chai = require('chai');
// const expect = chai.expect;

// let test_video = {
//   description: 'fsaf',
//   fileName: '5b2bb692-46ab-4bc4-aefc-ac9cd9b97b0c',
//   isPrivate: false,
//   latitude: '-72.544969',
//   longitude: '-13.163175',
//   title: 'fgsdf',
//   url: 'test',
//   user: 'diegote@gmail.com',
//   upload_date: '6/7/2020',
// };

// describe('Videos functions', function() {

//   this.beforeAll(async() => {
//     await dbHandler.connect();
//   });

//   this.afterAll(async() => {
//     await dbHandler.closeDatabase();
//   });

//   afterEach(async function() {
//     await dbHandler.clearDatabase();
//   });

//   describe('getVideos', () => {
//     it('should retrieve the only video', async() => {
//       await Video.create(test_video);
//       // var firebase = proxyquire('../../firebase-storage');

//     });
//   });
// });
