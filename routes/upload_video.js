'use strict';

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /upload_video:
 *   post:
 *     description: Uploads a video to the server
 *     responses:
 *       200:
 *         description: video uploaded
 */
router.post('/', (req, res) => {
  res.send(JSON.stringify({Health: 'OK'}));
});

module.exports = router;
