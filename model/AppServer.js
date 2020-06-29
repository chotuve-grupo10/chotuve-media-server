'use strict';
const { v4: uuidv4 } = require('uuid');

class AppServer{
  constructor(){
    this.token = uuidv4();
    this.registered_at = new Date();
  }

  getToken(){
    return this.token;
  }

  toJSON() {
    return {
      token: this.token,
      registered_at: this.registered_at.toUTCString(),
    };
  }
}

module.exports.AppServer = AppServer;
