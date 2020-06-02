'use strict';

const express = require('express');
const router = express.Router();
const db = require('../database');


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
  await db.getAllVideos(function(err, videosList){
    if (err) {
      console.log(err);
      res.status(401).send('Error!');
    }
    res.send(videosList);
  });
});

router.get('/:user_name', async(req, res) => {
  await db.getAllVideosForUser(req.params.user_name, function(err, videosList){
    if (err) {
      console.log(err);
      res.status(401).send('Error!');
    }
    res.send(videosList);
  });
});

module.exports = router;
