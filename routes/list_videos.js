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
 * /list_videos:
 *   get:
 *     tags:
 *       - name: All users
 *     description: Returns all the videos in the databaseservers
 *     parameters:
 *       - in: header
 *         name: AppServerToken
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: your AppServerToken is invalid.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */

router.get('/', async(req, res) => {
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

      await db.getAllVideos(function(err, videosList){
        if (err) {
          console.log(err);
          res.status(401).send('Error!');
          db_service.stop();
        }
        res.send(videosList);
        db_service.stop();
      });
    }
  });
});

/**
 * @swagger
 * /list_videos/{user_name}:
 *   get:
 *     tags:
 *       - name: All users
 *     description: Returns all the videos in the database
 *     parameters:
 *       - in: header
 *         name: AppServerToken
 *         type: string
 *         required: true
 *       - in: path
 *         name: user_name
 *         description: The user you want the videos from.
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: your AppServerToken is invalid.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */

router.get('/:user_name', async(req, res) => {
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
      res.status(403).send({Error: 'Invalid ap server token'});
      db_service.stop();
    } else {
      console.log('Valid app server token');
      db = new Database(db_service.db);

      // eslint-disable-next-line max-len
      await db.getAllVideosForUser(req.params.user_name, function(err, videosList){
        if (err) {
          console.log(err);
          res.status(401).send('Error!');
          db_service.stop();
        }
        res.send(videosList);
        db_service.stop();
      });
    }
  });
});

module.exports = router;
