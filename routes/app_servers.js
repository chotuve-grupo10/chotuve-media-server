'use strict';

const express = require('express');
const router = express.Router();
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;
const MongoDB = require('../MongoDB').MongoDB;
const AppServer = require('../model/AppServer').AppServer;

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
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       Error:
 *         type: string
 *         example: Error message
 */
router.post('/', async(req, res) => {

  const db_service = new MongoDB();
  var db;
  await db_service.start();

  db = new AppServersCollection(db_service.db);
  const app_server_to_add = new AppServer();
  // eslint-disable-next-line max-len
  await db.addAppServer(app_server_to_add.toJSON(), function(err, insertedDocument){
    if (err){
      console.log(err);
      res.status(500).send({Error: err.message});
    } else {
      // eslint-disable-next-line max-len
      res.status(201).send(JSON.stringify({'Media server token': app_server_to_add.getToken()}));
    }
  }).catch(e => {
    res.status(500).send({Error: e.message});
    console.log('Error: ', e.message);
  });
});

module.exports = router;
