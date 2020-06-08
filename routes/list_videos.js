'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;

/**
 * @swagger
 * /list_videos:
 *   get:
 *     description: Returns all the videos in the database
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/', async(req, res) => {
  const db_service = new MongoDB();
  var db;
  await db_service.start();

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
});

// router.get('/:user_name', async(req, res) => {
// eslint-disable-next-line max-len
//   await db.getAllVideosForUser(req.params.user_name, function(err, videosList){
//     if (err) {
//       console.log(err);
//       res.status(401).send('Error!');
//     }
//     res.send(videosList);
//   });
// });

module.exports = router;
