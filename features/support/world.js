'use strict';

const { setWorldConstructor } = require('cucumber');

class CustomWorld {
  constructor() {

  }

  setResponse(response) {
    this.response = response;
  }
}

setWorldConstructor(CustomWorld);
