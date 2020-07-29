'use strict';
const { admin } = require('./firebase-config');

async function deleteFile(file_name){
  console.log('Firebase instance initialized');
  var bucket = admin.storage().bucket();
  // eslint-disable-next-line max-len
  await bucket.file(process.env.FIREBASE_FOLDER_NAME + '/' + file_name).delete();
  console.log('Deleted: ' + file_name);
}

async function getFileMetadata(file_name) {
  console.log('Firebase instance initialized');
  try {
    var bucket = admin.storage().bucket();
    var metadata = await bucket
      .file(process.env.FIREBASE_FOLDER_NAME + '/' + file_name).getMetadata();
    var size = metadata[0].size;
    var dbMetadata = await admin
      .database().ref('images').child(file_name).once('value');
    return { size: size, thumbnail: dbMetadata.val().thumbnail };
  } catch (e) {
    console.log(e);
    return {
      size: 'unknown',
      // eslint-disable-next-line max-len
      thumbnail: 'https://www.mtzion.lib.il.us/kids-teens/question-mark.jpg/@@images/image.jpeg',
    };
  }
}

module.exports.deleteFile = deleteFile;
module.exports.getFileMetadata = getFileMetadata;
