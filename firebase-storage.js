'use strict';

var admin = require('firebase-admin');
// eslint-disable-next-line max-len
var serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

async function deleteFile(file_name){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_BUCKET_NAME,
  });

  console.log('Firebase instance initialized');

  var bucket = admin.storage().bucket();
  // eslint-disable-next-line max-len
  await bucket.file(process.env.FIREBASE_FOLDER_NAME + '/' + file_name).delete();
  console.log('Deleted: ' + file_name);
}

module.exports.deleteFile = deleteFile;
