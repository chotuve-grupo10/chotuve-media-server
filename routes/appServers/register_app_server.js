'use strict';

const express = require('express');
const router = express.Router();
const AppServersCollection = require('../../db/AppServersCollection').AppServersCollection;
const MongoDB = require('../../MongoDB').MongoDB;

/**
 * @swagger
 * /app_servers:
 *   post:
 *     description: Register app server
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
 *     Error:
 *       type: string
 *       example: Error message
 */
router.post('/', async(req, res) => {

  const db_service = new MongoDB();
  var db;
  await db_service.start();

  db = new AppServersCollection(db_service.db);
});

module.exports = router;
