'use strict';

const express = require('express');
const router = express.Router();
const db = require('../database');

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
 *     responses:
 *       200:
 *         description: video uploaded
 */
router.post('/', (req, res) => {
  db.addVideo({});
  res.send(JSON.stringify({Health: 'OK'}));
});

module.exports = router;
