'use strict';
var AppServer = require('../../model/AppServer').AppServer;
var chai = require('chai');
var expect = chai.expect;

describe('AppServer', function() {

  describe('AppServer class', function() {
    it('should create AppServer successfully',
      function() {

        const app_server = new AppServer();
        expect(app_server).instanceOf(AppServer);
      });

    it('should return token successfully',
      function() {

        const app_server = new AppServer();
        expect(app_server.getToken()).to.be.not.equal(0);
      });

    it('should return transform to JSON successfully',
      function() {

        const app_server = new AppServer();
        const app_server_to_JSON = app_server.toJSON();
        const date = new Date(app_server_to_JSON['registered_at']);
        const date_now = new Date();

        expect(app_server_to_JSON['token']).to.be.equal(app_server.getToken());
        expect(date.getMonth()).to.be.equal(date_now.getMonth());
      });
  });
});
