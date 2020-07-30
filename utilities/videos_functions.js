'use strict';
const Database = require('../Database').Database;

async function getVideos(db_service, user_name, firebase){

  var db, videosList;
  db = new Database(db_service.db);
  if (user_name) {
    console.log(`Filtering resources for user_name ${user_name}`);
    videosList = await db.getVideos({ for_user: user_name });
  } else {
    videosList = await db.getVideos();
  }
  await Promise.all(videosList.map(async element => {
    var { size, thumbnail } = await firebase.getFileMetadata(element.fileName);
    console.log(`size: ${size}, thumbnail: ${thumbnail}`);
    element.size = size;
    element.thumbnail = thumbnail;
  }));
  console.log(videosList);
  return videosList;
}

async function postVideo(db_service, body){

  var db;
  console.log('POSTing new video');
  db = new Database(db_service.db);

  let insertedDocument = await db.addNewVideo(body).catch(e => {
    console.log('Error: ', e.message);
    throw e;
  });

  return JSON.stringify({_id: insertedDocument.insertedId});
}

async function deleteVideo(db_service, id, firebase){

  var db;
  db = new Database(db_service.db);

  let file = await db.getVideoById(id);

  if (!file) {
    console.log(`File not found: ${file}`);
    return 404;
  } else {
    console.log(`Video to delete: ${file.fileName}`);
    try {
      await firebase.deleteFile(file.fileName);
      try {
        await firebase.deleteFile(`thumb_${file.fileName}.jpg`);
      } catch (err) {
        console.log(`Couldn't delete thumbnail for file ${file.fileName}`);
      }
      await db.deleteVideoByObjectId(id);
      return 200;
    } catch (err) {
      console.log('Error deleting video');
      console.log(err);
      throw err;
    }
  }
}

module.exports = {
  getVideos: getVideos,
  postVideo: postVideo,
  deleteVideo: deleteVideo,
};
