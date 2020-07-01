'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;
const validation_functions = require('../utilities/validation_functions');

const APP_SERVER_TOKEN_HEADER = 'AppServerToken';

/**
 * @swagger
 * /upload_video:
 *   post:
 *     tags:
 *       - name: All users
 *     description: Uploads a video to the server
 *     parameters:
 *       - in: header
 *         name: AppServerToken
 *         type: string
 *         required: true
 *       - in: body
 *         name: video
 *         description: The video to upload.
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - url
 *             - user
 *           properties:
 *             title:
 *               type: string
 *             url:
 *               type: string
 *             user:
 *               type: string
 *             description:
 *               type: string
 *             fileName:
 *               type: string
 *             latitude:
 *               type: string
 *             longitude:
 *               type: string
 *             isPrivate:
 *               type: boolean
 *     responses:
 *       201:
 *         description: return _id of the inserted document.
 *       403:
 *         description: your AppServerToken is invalid.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.post('/', async(req, res) => {

  const db_service = new MongoDB();
  var db, app_servers_collection;
  await db_service.start();

  app_servers_collection = new AppServersCollection(db_service.db);

  // eslint-disable-next-line max-len
  await validation_functions.is_valid_media_server_token(req.get(APP_SERVER_TOKEN_HEADER), app_servers_collection, async function(err, is_valid_token){
    if (err) {
      console.log(err);
      res.status(500).send({Error: err.message});
      db_service.stop();
    }

    if (!is_valid_token){
      console.log('Invalid app server token');
      res.status(403).send({Error: 'Invalid app server token'});
      db_service.stop();
    } else {
      console.log('Valid app server token');
      db = new Database(db_service.db);

      await db.addVideo(req.body, function(err, insertedDocument){
        if (err){
          console.log(err);
          res.status(500).send({Error: err.message});
        } else {
          // eslint-disable-next-line max-len
          res.status(201).send(JSON.stringify({_id: insertedDocument.insertedId}));
        }
      }).catch(e => {
        res.status(500).send({Error: e.message});
        console.log('Error: ', e.message);
      });
    }
  });
});

module.exports = router;
