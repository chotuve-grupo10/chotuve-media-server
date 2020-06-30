'use strict';
var token_functions = require('../../utilities/token_functions');
var chai = require('chai');
var expect = chai.expect;

describe('Token functions', function() {
  describe('Token validation', function() {
    it('should be token from admin user',
      function() {

        // eslint-disable-next-line max-len
        const token_to_decode = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTM1NTc2ODEsImV4cCI6MTYyNTA5NDc0OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJfaWQiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiYWRtaW5fdXNlciI6InRydWUifQ.OTJsKvFUSYvfEDiwdA8Y9QWMYavD0-MGLOOPv1sbctk';
        // eslint-disable-next-line max-len
        expect(token_functions.is_valid_token_from_admin_user(token_to_decode));
      });

    it('should be token from NOT admin user',
      function() {

        // eslint-disable-next-line max-len
        const token_to_decode = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTM1NTc2ODEsImV4cCI6MTYyNTA5NDc0OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJfaWQiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiYWRtaW5fdXNlciI6ImZhbHNlIn0.PLhOnhfJGg3Jmc3zkvmvUtru_GoxVjIa-0v69RH0sSI';
        // eslint-disable-next-line max-len
        expect(!token_functions.is_valid_token_from_admin_user(token_to_decode));
      });

    it('should be invalid token',
      function() {

        // eslint-disable-next-line max-len
        const token_to_decode = 'FAKETOKEN';
        // eslint-disable-next-line max-len
        expect(!token_functions.is_valid_token_from_admin_user(token_to_decode));
      });
  });
});
