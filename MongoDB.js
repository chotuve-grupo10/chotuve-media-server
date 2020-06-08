'use strict';

const mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI;
var db_name = process.env.DATABASE_NAME;

class MongoDB {
  constructor() {
    this.db = null;
    this.connection = null;
  }

  async start() {
    this.connection = new MongoClient(url);

    try {
      // Connect to the MongoDB cluster
      await this.connection.connect();
      console.log('Conexion established to ' + url);
      this.db = this.connection.db(db_name);
    } catch (e) {
      console.error(e);
    }
  }

  stop() {
    this.connection.close();
    console.log('Conexion to db closed');
  }
}

module.exports.MongoDB = MongoDB;
