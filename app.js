'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const ping = require('./routes/ping');
const upload_video = require('./routes/upload_video');
const list_videos = require('./routes/list_videos');
const delete_video = require('./routes/delete_video');
const app_servers = require('./routes/app_servers');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const DEFAULT_PORT = 3000;
app.use(bodyParser.json());

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

app.use('/api/list_videos', list_videos);
app.use('/api/delete_video', delete_video);
app.use('/api/app_servers', app_servers);

// Middleware de swagger-ui-express para servir la documentacion OpenAPI
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.PORT || DEFAULT_PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));


// Para poder usar la app Express en las pruebas de integracion / aceptacion
module.exports = server;
