// eslint-disable-next-line strict
const mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI;
var db_name = process.env.DATABASE_NAME;

async function addVideo(video_to_upload){
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      throw err;
    } else {
      console.log('Connection established to', url);

      var db = client.db(db_name);

      console.log('Document to insert: ' + JSON.stringify(video_to_upload));

      db.collection('videos').insertOne(video_to_upload, function(err, res) {
        if (err) {
          // eslint-disable-next-line max-len
          console.log('Unable to insert document to the mongoDB server. Error:', err);
          throw err;
        }
        console.log('1 document inserted');
        client.close();
      });

      // Close connection
      client.close();
    }
  });
}

module.exports.addVideo = addVideo;
