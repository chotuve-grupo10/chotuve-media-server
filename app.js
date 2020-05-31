'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const ping = require('./routes/ping');
const upload_video = require('./routes/upload_video');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
const DEFAULT_PORT = 3000;
require('./database');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Chotuve Media Server', // Title (required)
      version: '1.0.0', // Version (required)
    },
    basePath: '/api',
  },
  apis: ['./routes/*'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api/ping', ping);
app.use('/api/upload_video', upload_video);
// Middleware de swagger-ui-express para servir la documentacion OpenAPI
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || DEFAULT_PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// Para poder usar la app Express en las pruebas de integracion / aceptacion
module.exports = server;
