'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const ping = require('./routes/ping');
const upload_video = require('./routes/upload_video');
const list_videos = require('./routes/list_videos');
const delete_video = require('./routes/delete_video');
const app_servers = require('./routes/app_servers');
const videos = require('./routes/videos');
const check_permissions = require('./utilities/middleware/check_permisions');
var bodyParser = require('body-parser');

const app = express();
const DEFAULT_PORT = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Chotuve Media Server', // Title (required)
      version: '1.0.0', // Version (required)
    },
    basePath: '/api',
  },
  apis: ['./routes/*', './swagger_common.yaml'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(bodyParser.json());
app.use('/api/videos', check_permissions);

app.use('/api/ping', ping);
app.use('/api/upload_video', upload_video);
app.use('/api/list_videos', list_videos);
app.use('/api/delete_video', delete_video);
app.use('/api/app_servers', app_servers);
app.use('/api/videos', videos);

// Middleware de swagger-ui-express para servir la documentacion OpenAPI
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.PORT || DEFAULT_PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));


// Para poder usar la app Express en las pruebas de integracion / aceptacion
module.exports = server;
