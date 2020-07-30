'use strict';
const app_servers_functions = require('../../utilities/app_servers_functions');
const TestDbHelper = require('../../TestDbHelper').TestDbHelper;
const AppServer = require('../../model/AppServer').AppServer;
const jwt = require('jsonwebtoken');
const chai = require('chai');
const expect = chai.expect;

const dbHelper = new TestDbHelper();

describe('App Servers functions', function() {

  this.beforeAll(async() => {
    await dbHelper.start();
  });

  this.afterAll(async() => {
    await dbHelper.stop();
  });

  this.afterEach(async function() {
    await dbHelper.cleanup(); ;
  });

  describe('Register app server', function() {
    it('should be invalid token',
      function(done) {

        // This token is an AppServer Token, not an admin Token
        // eslint-disable-next-line max-len
        var payload = {user_id: 'test@test.test', admin_user: false, exp: 0};
        const token_to_decode = jwt.sign(payload, 'secret');
        // eslint-disable-next-line max-len
        app_servers_functions.register_app_server(token_to_decode, dbHelper, function(err, result){
          if (err) {
            console.log(err);
            done(err);
          }

          expect(result).to.be.equal(403);
          done();
        });
      });

    it('should register an app server', (done) => {
      // eslint-disable-next-line max-len
      var payload = {user_id: 'test@test.test', admin_user: true};
      const token = jwt.sign(payload, 'secret');

      // eslint-disable-next-line max-len
      app_servers_functions.register_app_server(token, dbHelper, function(err, appServerInserted){
        if (err) {
          console.log(err);
          done(err);
        }

        expect(appServerInserted).to.be.instanceOf(AppServer);
        done();
      });

    });
  });

  describe('Get app servers', function() {
    it('should get zero app servers',
      function(done) {
        // eslint-disable-next-line max-len
        var payload = {user_id: 'test@test.test', admin_user: true};
        const token = jwt.sign(payload, 'secret');

        // eslint-disable-next-line max-len
        app_servers_functions.get_app_servers(token, dbHelper, function(err, emptyList){
          if (err) {
            console.log(err);
            done(err);
          }
          expect(emptyList).to.be.lengthOf(0);
          done();
        });
      });
    it('should get two app servers',
      function(done) {
        var payload = {user_id: 'test@test.test', admin_user: true};
        const token = jwt.sign(payload, 'secret');
        app_servers_functions.register_app_server(token, dbHelper,
          function(err, res1) {
            if (err) {
              console.log(err);
              done(err);
            }
            app_servers_functions.register_app_server(token, dbHelper,
              function(err, res2) {
                if (err) {
                  console.log(err);
                  done(err);
                }
                // eslint-disable-next-line max-len
                app_servers_functions.get_app_servers(token, dbHelper, function(err, list){
                  if (err) {
                    console.log(err);
                    done(err);
                  }
                  expect(list).to.be.lengthOf(2);
                  done();
                });
              });
          });
      });

    it('should get app server with specific token',
      function(done) {
        var payload = {user_id: 'test@test.test', admin_user: true};
        const token = jwt.sign(payload, 'secret');
        app_servers_functions.register_app_server(token, dbHelper,
          function(err, res1) {
            if (err) {
              console.log(err);
              done(err);
            }
            app_servers_functions.register_app_server(token, dbHelper,
              function(err, res2) {
                if (err) {
                  console.log(err);
                  done(err);
                }
                // eslint-disable-next-line max-len
                app_servers_functions.get_app_server_with_token(res2.getToken(), token, dbHelper, function(err, appServersList){
                  if (err) {
                    console.log(err);
                    done(err);
                  }
                  expect(appServersList.length).to.be.eq(1);
                  done();
                });
              });
          });
      });
  });
});
