'use strict';
const { admin } = require('./firebase-config');

async function deleteFile(file_name, callback){

  try {
    console.log('Firebase instance initialized');

    var bucket = admin.storage().bucket();
    // eslint-disable-next-line max-len
    await bucket.file(process.env.FIREBASE_FOLDER_NAME + '/' + file_name).delete();
    console.log('Deleted: ' + file_name);
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
}

module.exports.deleteFile = deleteFile;
