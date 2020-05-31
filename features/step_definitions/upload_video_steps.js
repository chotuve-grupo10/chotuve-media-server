'use strict';

const { Then, When } = require('cucumber');
const got = require('got');
const chai = require('chai');
const expect = chai.expect;

When('I post the server whit a new video', async function() {
  let res = await got.post('http://localhost:3000/api/upload_video', {
    json: {
      file_name: 'test',
      file_size: '80KB',
      created_date: '31/5/2020',
      firebase_url: 'firebaseurl',
      user: 'test@test.com',
    },
    responseType: 'json',
  });
  this.setResponse(res);
});

Then('I get an OK response from the media server', async function() {
  expect(this.response.statusCode).to.be.eq(200);
});

Then('the result is that the video was uploaded', async function() {
  // eslint-disable-next-line max-len
  expect(JSON.parse(this.response.body)).to.be.deep.equal({Upload: 'video uploaded'});
});
