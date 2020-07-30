'use strict';

const express = require('express');
const router = express.Router();
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;
const MongoDB = require('../MongoDB').MongoDB;
// const AppServer = require('../model/AppServer').AppServer;
const token_functions = require('../utilities/token_functions');
const app_servers_functions = require('../utilities/app_servers_functions');

const AUTHORIZATION_HEADER = 'authorization';

/**
 * @swagger
 * /app_servers:
 *   post:
 *     tags:
 *       - name: Admin users only
 *     description: Register app server
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Admin user token
 *         type: string
 *         required: true
 *     responses:
 *       201:
 *         description: returns media server token.
 *         schema:
 *           $ref: '#/definitions/RegisterAppServerSuccessfullyResponse'
 *       403:
 *         description: you are not an admin user.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *   get:
 *     tags:
 *       - name: Admin users only
 *     description: Returns registered app servers
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Admin user token
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: returns app servers array.
 *         schema:
 *           $ref: '#/definitions/AppServer'
 *       403:
 *         description: you are not an admin user.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * definitions:
 *   RegisterAppServerSuccessfullyResponse:
 *     type: object
 *     properties:
 *       Media server token:
 *         type: string
 *         format: uuid
 *   AppServer:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: 5da454f4307b0a8b3083883b
 *       token:
 *         type: string
 *         format: uuid
 *       registered_at:
 *         type: string
 *         format: date-time
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       Error:
 *         type: string
 *         example: Error message
 */
router.post('/', async(req, res) => {
  // eslint-disable-next-line max-len
  app_servers_functions.register_app_server(req.get(AUTHORIZATION_HEADER), new MongoDB(),
    function(err, status) {
      if (err) {
        console.log(err);
        res.status(500).send({Error: err.message});
      }
      switch (status) {
        case 403:
          // eslint-disable-next-line max-len
          res.status(403).send({Error: 'Request doesnt come from an admin user'});
          break;
        default:
          // eslint-disable-next-line max-len
          res.status(201).send(JSON.stringify({'Media server token': status.getToken()}));
          break;
      }
    });
});

router.get('/', async(req, res) => {
  // eslint-disable-next-line max-len
  app_servers_functions.get_app_servers(req.get(AUTHORIZATION_HEADER), new MongoDB(),
    function(err, appServersList) {
      if (err) {
        console.log(err);
        res.status(500).send({Error: err.message});
      }
      switch (appServersList) {
        case 403:
          // eslint-disable-next-line max-len
          res.status(403).send({Error: 'Request doesnt come from an admin user'});
          break;
        default:
          res.send(appServersList);
          break;
      }
    });
});

/**
 * @swagger
 * /app_servers/{media_server_token}:
 *   get:
 *     tags:
 *       - name: Admin users only
 *     description: Returns registered app servers
 *     parameters:
 *       - in: path
 *         name: media_server_token
 *         description: look for specific server
 *         type: string
 *         required: true
 *       - in: header
 *         name: authorization
 *         description: Admin user token
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: returns app servers array.
 *         schema:
 *           $ref: '#/definitions/AppServer'
 *       403:
 *         description: you are not an admin user.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *   delete:
 *     tags:
 *       - name: Admin users only
 *     description: Deletes registered app server
 *     parameters:
 *       - in: path
 *         name: media_server_token
 *         description: server to delete
 *         type: string
 *         required: true
 *       - in: header
 *         name: authorization
 *         description: Admin user token
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: deleted app server successfully.
 *         schema:
 *           $ref: '#/definitions/DeleteAppServerSuccessfully'
 *       403:
 *         description: you are not an admin user.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 * definitions:
 *   DeleteAppServerSuccessfully:
 *     type: object
 *     properties:
 *       Result:
 *         type: string
 *         example: deleted app server
 *   AppServer:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: 5da454f4307b0a8b3083883b
 *       token:
 *         type: string
 *         format: uuid
 *       registered_at:
 *         type: string
 *         format: date-time
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       Error:
 *         type: string
 *         example: Error message
 */

router.get('/:media_server_token', async(req, res) => {
  // eslint-disable-next-line max-len
  if (!token_functions.is_valid_token_from_admin_user(req.get(AUTHORIZATION_HEADER))){
    console.log('Token is NOT from admin user');
    res.status(403).send({Error: 'Request doesnt come from an admin user'});
  } else {
    const db_service = new MongoDB();
    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);

    // eslint-disable-next-line max-len
    await db.getAppServerWithToken(req.params.media_server_token, function(err, appServersList){
      if (err) {
        console.log(err);
        res.status(500).send({Error: err.message});
        db_service.stop();
      }
      res.send(appServersList);
      db_service.stop();
    });
  }
});

router.delete('/:media_server_token', async(req, res) => {
  // eslint-disable-next-line max-len
  if (!token_functions.is_valid_token_from_admin_user(req.get(AUTHORIZATION_HEADER))){
    console.log('Token is NOT from admin user');
    res.status(403).send({Error: 'Request doesnt come from an admin user'});
  } else {
    const db_service = new MongoDB();
    var db;
    await db_service.start();

    db = new AppServersCollection(db_service.db);

    // eslint-disable-next-line max-len
    await db.deleteAppServerWithToken(req.params.media_server_token, function(err, appServersList){
      if (err){
        res.status(500).send(JSON.stringify({Error: 'Video not found'}));
      } else {
        res.status(200).send(JSON.stringify({Result: 'deleted app server'}));
      }
    }).catch(e => {
      res.status(500).send({Error: e.message});
      console.log('Error: ', e.message);
    });
  }
});

module.exports = router;
