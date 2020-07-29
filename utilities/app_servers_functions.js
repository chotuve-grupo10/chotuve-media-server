'use strict';

const token_functions = require('./token_functions');
const AppServer = require('../model/AppServer').AppServer;
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;

async function register_app_server(authorization_header, db_service) {

  if (!token_functions.is_valid_token_from_admin_user(authorization_header)) {
    console.log('Token is NOT from admin user');
    return 403;
  } else {
    console.log('Token is from admin user');

    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);
    const app_server_to_add = new AppServer();
    // eslint-disable-next-line max-len
    await db.addAppServer(app_server_to_add.toJSON(), function(err, insertedDocument){
      if (err){
        console.log(err);
        return 500;
      } else {
        return app_server_to_add;
      }
    }).catch(e => {
      console.log('Error: ', e.message);
      return 500;
    });
  }
}

module.exports.register_app_server = register_app_server;
