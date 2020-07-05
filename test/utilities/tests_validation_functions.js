'use strict';

var TestDbHelper = require('../../TestDbHelper').TestDbHelper;
// eslint-disable-next-line max-len
var AppServersCollection = require('../../db/AppServersCollection').AppServersCollection;
var AppServer = require('../../model/AppServer').AppServer;
var validation_functions = require('../../utilities/validation_functions');
var chai = require('chai');
var expect = chai.expect;

const dbHelper = new TestDbHelper();

describe('Validation functions', function() {

  this.beforeAll(async() => {
    await dbHelper.start();
  });

  this.afterAll(async() => {
    await dbHelper.stop();
  });

  var db_test;
  beforeEach(function() {
    db_test = new AppServersCollection(dbHelper.db);
  });

  afterEach(async function() {
    await dbHelper.cleanup();
  });

  describe('Media server token validations', function() {
    it('should be valid media server token', function(done) {
      const app_server_to_add = new AppServer();

      // eslint-disable-next-line max-len
      db_test.addAppServer(app_server_to_add.toJSON(), function(err, appServerInserted){
        if (err) done(err);
        // eslint-disable-next-line max-len
        expect(appServerInserted.insertedCount).to.be.equal(1);

        // eslint-disable-next-line max-len
        validation_functions.is_valid_media_server_token(app_server_to_add.getToken(), db_test, function(err, is_valid){
          if (err) done(err);
          expect(is_valid).true;
          done();
        });
      });
    });

    it('should be invalid media server token', function(done) {
      const app_server_to_add = new AppServer();

      // eslint-disable-next-line max-len
      db_test.addAppServer(app_server_to_add.toJSON(), function(err, appServerInserted){
        if (err) done(err);
        // eslint-disable-next-line max-len
        expect(appServerInserted.insertedCount).to.be.equal(1);

        // eslint-disable-next-line max-len
        validation_functions.is_valid_media_server_token('TEST', db_test, function(err, is_valid){
          if (err) done(err);
          expect(is_valid).false;
          done();
        });
      });
    });
  });
});
