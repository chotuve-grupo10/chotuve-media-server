'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;

/**
 * @swagger
 * /videos:
 *   get:
 *     tags:
 *       - name: All users
 *     description: Returns all the videos in the databaseservers
 *     security:
 *      - Bearer: []
 *      - AppServerToken: []
  *     parameters:
 *       - in: query
 *         name: user_name
 *         type: string
 *         required: false
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
  var db;
  await db_service.start();
  db = new Database(db_service.db);
  if (req.query.user_name) {
    console.log(`Filtering resources for user_name ${req.query.user_name}`);
    await db.getAllVideosForUser(req.query.user_name, function(err, videosList){
      if (err) {
        console.log(err);
        res.status(401).send('Error!');
        db_service.stop();
      }
      res.send(videosList);
      db_service.stop();
    });
  } else {
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

module.exports = router;
