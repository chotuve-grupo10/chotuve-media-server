'use strict';

var TestDbHelper = require('../../TestDbHelper').TestDbHelper;
// eslint-disable-next-line max-len
var AppServersCollection = require('../../db/AppServersCollection').AppServersCollection;
var AppServer = require('../../model/AppServer').AppServer;
var chai = require('chai');
var expect = chai.expect;

const dbHelper = new TestDbHelper();

describe('App servers collection', function() {

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
    await dbHelper.cleanup(); ;
  });

  describe('Add app server', function() {
    it('should add one app server successfully',
      async function() {

        const app_server_to_add = new AppServer();

        // eslint-disable-next-line max-len
        db_test.addAppServer(app_server_to_add.toJSON(), async function(err, appServerInserted){
          if (err) console.log(err);

          // eslint-disable-next-line max-len
          expect(appServerInserted.insertedCount).to.be.equal(1);
        });
      });
  });

  describe('List app servers', function() {

    it('should return all app servers successfully',
      async function() {

        const app_server_to_add_1 = new AppServer();
        const app_server_to_add_2 = new AppServer();

        // eslint-disable-next-line max-len
        db_test.addAppServer(app_server_to_add_1.toJSON(), async function(err, app_server_inserted){
          if (err) console.log(err);

          // eslint-disable-next-line max-len
          await db_test.addAppServer(app_server_to_add_2.toJSON(), async function(err, app_server_inserted_2){
            if (err) console.log(err);

            await db_test.getAllAppServers(function(err, appServersList){
              if (err) {
                console.log(err);
              }

              expect(appServersList.length).to.be.eq(2);
            });
          });
        });
      });

    it('should return no app server for non existing token',
      async function() {

        const app_server_to_add = new AppServer();

        // eslint-disable-next-line max-len
        db_test.addAppServer(app_server_to_add.toJSON(), async function(err, app_server_inserted){
          if (err) console.log(err);

          // eslint-disable-next-line max-len
          await db_test.getAppServerWithToken('TEST', function(err, appServersList){
            if (err) {
              console.log(err);
            }

            expect(appServersList.length).to.be.eq(0);
          });
        });
      });

    it('should return app server for existing token',
      async function() {

        const app_server_to_add = new AppServer();

        // eslint-disable-next-line max-len
        db_test.addAppServer(app_server_to_add.toJSON(), async function(err, appServerInserted){
          if (err) console.log(err);

          // eslint-disable-next-line max-len
          await db_test.getAppServerWithToken(app_server_to_add.getToken(), function(err, appServersList){
            if (err) {
              console.log(err);
            }

            expect(appServersList.length).to.be.eq(1);
          });
        });
      });
  });

  describe('Delete app server', function() {
    it('should delete only app server so list is empty',
      async function() {

        const app_server_to_add = new AppServer();

        // eslint-disable-next-line max-len
        db_test.addAppServer(app_server_to_add.toJSON(), async function(err, appServerInserted){
          if (err) console.log(err);

          await db_test.getAllAppServers(async function(err, appServersList){
            if (err) {
              console.log(err);
            }

            expect(appServersList.length).to.be.eq(1);

            // eslint-disable-next-line max-len
            await db_test.deleteAppServerWithToken(app_server_to_add.getToken(), async function(err, appServer){
              if (err){
                console.log(err);
              }

              await db_test.getAllAppServers(function(err, appServers){
                if (err){
                  console.log(err);
                }

                expect(appServers.length).to.be.eq(0);
              });
            });
          });
        });
      });
  });
});