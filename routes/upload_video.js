'use strict';

const express = require('express');
const router = express.Router();
const db = require('../Database');

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
 *       200:
 *         description: video uploaded
 */
router.post('/', async(req, res) => {

  await db.addVideo(req.body).catch(e => {
    res.status(500).send({Error: e.message});
    console.log('Error: ', e.message);
  });

  res.status(200).send(JSON.stringify({Upload: 'video uploaded'}));
});

module.exports = router;
