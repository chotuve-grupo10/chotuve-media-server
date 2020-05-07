'use strict';

const { Then, When } = require('cucumber');
const got = require('got');
const chai = require('chai');
const expect = chai.expect;

When('I Ping the server', async function() {
  let res = await got.get('http://localhost:3000/api/ping');
  this.setResponse(res);
});

Then('I get an OK response', async function() {
  expect(this.response.statusCode).to.be.eq(200);
});

Then('the result is empty', async function() {
  expect(JSON.parse(this.response.body)).to.be.eq('OK');
});
