'use strict';

var admin = require('firebase-admin');
// eslint-disable-next-line max-len
var serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_BUCKET_NAME,
});

module.exports.admin = admin;
