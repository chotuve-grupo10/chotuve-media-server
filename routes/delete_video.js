'use strict';

const express = require('express');
const router = express.Router();
const Database = require('../Database').Database;
const MongoDB = require('../MongoDB').MongoDB;
const firebase = require('../firebase-storage');


/**
 * @swagger
 * /delete_video/{id}:
 *   delete:
 *     description: Deletes the video with the given id
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
    }

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
  });
});


module.exports = router;
