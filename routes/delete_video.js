'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;
const firebase = require('../firebase-storage');
// eslint-disable-next-line max-len
const AppServersCollection = require('../db/AppServersCollection').AppServersCollection;
const validation_functions = require('../utilities/validation_functions');

const MEDIA_SERVER_TOKEN_HEADER = 'MediaServerToken';


/**
 * @swagger
 * /delete_video/{id}:
 *   delete:
 *     tags:
 *       - name: All users
 *     description: Deletes the video with the given id
 *     parameters:
 *       - in: header
 *         name: MediaServerToken
 *         type: string
 *         required: true
 *       - in: path
 *         name: id
 *         description: Video id.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: your media server token is invalid.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */


router.delete('/:id', async(req, res) => {
  const db_service = new MongoDB();
  var db, app_servers_collection;
  await db_service.start();

  app_servers_collection = new AppServersCollection(db_service.db);

  // eslint-disable-next-line max-len
  await validation_functions.is_valid_media_server_token(req.get(MEDIA_SERVER_TOKEN_HEADER), app_servers_collection, async function(err, is_valid_token){
    if (err) {
      console.log(err);
      res.status(500).send({Error: err.message});
      db_service.stop();
    }

    if (!is_valid_token){
      console.log('Invalid media server token');
      res.status(403).send({Error: 'Invalid media server token'});
      db_service.stop();
    } else {
      console.log('Valid media server token');
      db = new Database(db_service.db);

      await db.getVideoById(req.params.id, async function(err, file){
        if (err) {
          console.log(err);
          res.status(500).send({Error: err.message});
        } else {
          console.log('Video to delete: ' + file.fileName);
          await firebase.deleteFile(file.fileName, function(err){
            if (err){
              // eslint-disable-next-line max-len
              console.log(err);
            }
          });

          await db.deleteVideoById(req.params.id, function(err, videosList){
            if (err){
              res.status(200).send(JSON.stringify({Delete: 'Video not found'}));
            } else {
              res.status(200).send(JSON.stringify({Delete: 'Video deleted'}));
            }
          }).catch(e => {
            res.status(500).send({Error: e.message});
            console.log('Error: ', e.message);
          });
        }
      });
    }
  });
});


module.exports = router;
