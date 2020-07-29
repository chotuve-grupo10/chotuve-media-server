'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;
const firebase = require('../firebase-storage');

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
  var db, videosList;
  await db_service.start();
  db = new Database(db_service.db);
  if (req.query.user_name) {
    console.log(`Filtering resources for user_name ${req.query.user_name}`);
    videosList = await db.getVideos({ for_user: req.query.user_name });
  } else {
    videosList = await db.getVideos();
  }
  await Promise.all(videosList.map(async element => {
    var { size, thumbnail } = await firebase.getFileMetadata(element.fileName);
    console.log(`size: ${size}, thumbnail: ${thumbnail}`);
    element.size = size;
    element.thumbnail = thumbnail;
  }));
  console.log(videosList);
  res.send(videosList);
  db_service.stop();
});

/**
 * @swagger
 * /videos:
 *   post:
 *     tags:
 *       - name: All users
 *     description: Uploads a video to the server
 *     security:
 *      - Bearer: []
 *      - AppServerToken: []
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
  var db;
  await db_service.start();
  console.log('POSTing new video');
  db = new Database(db_service.db);

  await db.addVideo(req.body).catch(e => {
    res.status(500).send({Error: e.message});
    console.log('Error: ', e.message);
  });
});

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     tags:
 *       - name: All users
 *     description: Deletes the video with the given id
 *     security:
 *      - Bearer: []
 *      - AppServerToken: []
 *     parameters:
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
 *         description: your AppServerToken is invalid.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: there is an internal problem with the media server.
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.delete('/:id', async(req, res) => {
  const db_service = new MongoDB();
  var db;
  await db_service.start();

  db = new Database(db_service.db);

  await db.getVideoById(req.params.id, async function(err, file){
    if (err) {
      console.log(err);
      res.status(500).send({Error: err.message});
    } else if (!file) {
      console.log(`File not found: ${file}`);
      res.status(404).send({Error: 'Resource not found'});
    } else {
      console.log(`Video to delete: ${file.fileName}`);
      try {
        await firebase.deleteFile(file.fileName);
        try {
          await firebase.deleteFile(`thumb_${file.fileName}.jpg`);
        } catch (err) {
          console.log(`Couldn't delete thumbnail for file ${file.fileName}`);
        }
        await db.deleteVideoByObjectId(req.params.id);
        res.status(200).send(JSON.stringify({Delete: 'Video deleted'}));
      } catch (err) {
        console.log('Error deleting video');
        console.log(err);
        res.status(500).send({Error: err.message});
      }
    }
  });
});

module.exports = router;
