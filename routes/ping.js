'use strict';

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /ping:
 *   get:
 *     description: Returns the server status
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', (req, res) => {
  res.send(JSON.stringify({Health:'OK'}));
});

module.exports = router;
