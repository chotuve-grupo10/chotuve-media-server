'use strict';

const express = require('express');
const app = express();

const DEFAULT_PORT = 3000;

app.get('/api/ping', (req, res) => {
  res.send(JSON.stringify({}));
});

const port = process.env.PORT || DEFAULT_PORT;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// Para poder usar la app Express en las pruebas de integracion / aceptacion
module.exports = server;
