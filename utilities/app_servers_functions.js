'use strict';

const token_functions = require('./token_functions');
const AppServer = require('../model/AppServer').AppServer;
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;

async function register_app_server(authorization_header, db_service, callback) {

  if (!token_functions.is_valid_token_from_admin_user(authorization_header)) {
    console.log('Token is NOT from admin user');
    callback(null, 403);
  } else {
    console.log('Token is from admin user');

    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);
    const app_server_to_add = new AppServer();
    // eslint-disable-next-line max-len
    db.addAppServer(app_server_to_add.toJSON(), function(err, insertedDocument){
      if (err){
        console.log(err);
        throw err;
      } else {
        callback(null, app_server_to_add);
      }
    }).catch(e => {
      console.log('Error: ', e.message);
      throw e;
    });
  }
}

async function get_app_servers(authorization_header, db_service, callback) {
  if (!token_functions.is_valid_token_from_admin_user(authorization_header)) {
    console.log('Token is NOT from admin user');
    callback(null, 403);
  } else {
    console.log('Token is from admin user');

    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);
    // eslint-disable-next-line max-len
    db.getAllAppServers(function(err, appServersList){
      if (err){
        console.log(err);
        throw err;
      } else {
        callback(null, appServersList);
      }
    }).catch(e => {
      console.log('Error: ', e.message);
      throw e;
    });
  }
}

// eslint-disable-next-line max-len
async function get_app_server_with_token(token, authorization_header, db_service, callback) {
  if (!token_functions.is_valid_token_from_admin_user(authorization_header)) {
    console.log('Token is NOT from admin user');
    callback(null, 403);
  } else {
    console.log('Token is from admin user');

    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);
    // eslint-disable-next-line max-len
    db.getAppServerWithToken(token, function(err, appServersList){
      if (err){
        console.log(err);
        throw err;
      } else {
        callback(null, appServersList);
      }
    }).catch(e => {
      console.log('Error: ', e.message);
      throw e;
    });
  }
}

module.exports = {
  register_app_server: register_app_server,
  get_app_servers: get_app_servers,
  get_app_server_with_token: get_app_server_with_token,
};
