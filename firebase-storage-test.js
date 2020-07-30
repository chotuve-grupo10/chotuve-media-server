'use strict';

async function getFileMetadata(file_name) {
  return {
    size: 'unknown',
    // eslint-disable-next-line max-len
    thumbnail: 'https://www.mtzion.lib.il.us/kids-teens/question-mark.jpg/@@images/image.jpeg',
  };
}

module.exports.getFileMetadata = getFileMetadata;
