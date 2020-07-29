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

  afterEach(async function() {
    await dbHelper.cleanup(); ;
  });

  describe('Register app server', function() {
    it('should be invalid token',
      async function() {

        // This token is an AppServer Token, not an admin Token
        // eslint-disable-next-line max-len
        const token_to_decode = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTM1NTc2ODEsImV4cCI6MTYyNTA5NDc0OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJfaWQiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiYWRtaW5fdXNlciI6InRydWUifQ.OTJsKvFUSYvfEDiwdA8Y9QWMYavD0-MGLOOPv1sbctk';
        // eslint-disable-next-line max-len
        var result = await app_servers_functions.register_app_server(token_to_decode, dbHelper);
        expect(result).to.be.equal(403);
      });

    it('should register an app server', async(done) => {
      // eslint-disable-next-line max-len
      var payload = {user_id: 'test@test.test', admin_user: true, exp: 0};
      const token = jwt.sign(payload, 'secret');

      // eslint-disable-next-line max-len
      var appServerToken = await app_servers_functions.register_app_server(token, dbHelper);
      expect(appServerToken).to.be.instanceOf(AppServer);
      done();
    });
  });
});
