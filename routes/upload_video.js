'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;

/**
 * @swagger
 * /upload_video:
 *   post:
 *     description: Uploads a video to the server
 *     parameters:
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
 *       500:
 *         description: there is an internal problem with the media server.
 */
router.post('/', async(req, res) => {

  const db_service = new MongoDB();
  var db;
  await db_service.start();

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
});

module.exports = router;
