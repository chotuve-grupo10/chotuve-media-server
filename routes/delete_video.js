'use strict';

const express = require('express');
const router = express.Router();
const db = require('../database');
const firebase = require('../firebase-storage');


/**
 * @swagger
 * /delete_video:
 *   delete:
 *     description: Deletes the video with the given id
 *     responses:
 *       200:
 *         description: OK
 */


router.delete('/:id', async(req, res) => {

  await db.getVideoById(req.params.id, async function(err, file){
    if (err) {
      console.log(err);
      res.status(500).send({Error: err.message});
    }
    // Nos quedamos el primero porque devuelve un vector.
    // La realidad es que el id es unico, nunca va a venir mas de uno.
    let file_name = file[0].fileName;
    console.log('Video to delete: ' + file_name);
    await firebase.deleteFile(file_name);
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


module.exports = router;
