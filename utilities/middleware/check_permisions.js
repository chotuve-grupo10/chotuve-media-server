'use strict';
const MongoDB = require('../../MongoDB').MongoDB;
const token_functions = require('../token_functions');
const validation_functions = require('../validation_functions');
const AppServersCollection =
  require('../../db/AppServersCollection').AppServersCollection;

const AUTH_HEADER = 'Authorization';
const APP_SERVER_TOKEN_HEADER = 'AppServerToken';

async function check_permissions(req, res, next) {
  console.log('Checkng authorization');
  console.log(`Authorization bearer token: ${req.get(AUTH_HEADER)}`);
  console.log(`App Server token: ${req.get(APP_SERVER_TOKEN_HEADER)}`);
  if (token_functions.is_valid_token_from_admin_user(req.get(AUTH_HEADER))) {
    console.log('Access granted because of admin privileges');
    next();
  } else {
    const db_service = new MongoDB();
    await db_service.start();
    var app_servers_collection = new AppServersCollection(db_service.db);
    await validation_functions.is_valid_media_server_token(
      req.get(APP_SERVER_TOKEN_HEADER),
      app_servers_collection,
      async function(err, is_valid_token){
        if (err) {
          console.log(err);
          res.status(500).send({Error: err.message});
        }

        if (is_valid_token){
          console.log('Access granted because of valid app server token');
          next();
        } else {
          console.log('Forbidden');
          res.status(403).send({Error: 'Invalid app server token'});
        }
        db_service.stop();
      },
    );
  }
}

module.exports = check_permissions;
