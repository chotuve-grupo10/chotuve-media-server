'use strict';

const dbHandler = require('../db-helper');
const Video = require('../../model/Video');
var chai = require('chai');
var expect = chai.expect;

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

// eslint-disable-next-line no-unused-vars
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

describe('Video', function() {

  this.beforeAll(async() => {
    await dbHandler.connect();
  });

  this.afterAll(async() => {
    await dbHandler.closeDatabase();
  });

  afterEach(async function() {
    await dbHandler.clearDatabase();
  });

  describe('Add video', function() {
    it('can be created correctly', async() => {
      expect(async() => await Video.create(test_video))
        .not.to.throw();
    });
  });

});
