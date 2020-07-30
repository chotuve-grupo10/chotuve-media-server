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

module.exports = {
  getVideos: getVideos,
};
