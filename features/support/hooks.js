'use strict';

const {AfterAll, BeforeAll} = require('cucumber');
const server = require('../../app');

BeforeAll(() => {

});

AfterAll(() => {
  server.close();
});
