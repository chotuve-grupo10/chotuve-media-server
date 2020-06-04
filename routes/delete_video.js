'use strict';

const express = require('express');
const router = express.Router();
const db = require('../database');


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
