'use strict';

async function getFileMetadata(file_name) {
  return {
    size: 'unknown',
    // eslint-disable-next-line max-len
    thumbnail: 'https://www.mtzion.lib.il.us/kids-teens/question-mark.jpg/@@images/image.jpeg',
  };
}

async function deleteFile(file_name){
  console.log('Deleted: ' + file_name);
}

module.exports.getFileMetadata = getFileMetadata;
module.exports.deleteFile = deleteFile;
