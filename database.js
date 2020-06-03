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

      var datetime = new Date();
      video_to_upload['upload_date'] = datetime.toLocaleDateString();

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

var getAllVideos = async function(callback){
  return MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var db = client.db(db_name);

      // Busca todos los videos
      db.collection('videos').find({}).toArray(function(err, result) {
        if (err) throw err;
        callback(null, result);
        client.close();
      });

      // Close connection
      client.close();
    }
  });
};

var getAllVideosForUser = async function(user_p, callback){
  return MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var db = client.db(db_name);
      // Crea la query con el user
      var query = { user: user_p };
      // Busca los videos asociados al user
      db.collection('videos').find(query).toArray(function(err, result) {
        if (err) throw err;
        callback(null, result);
        client.close();
      });

      // Close connection
      client.close();
    }
  });
};

var deleteVideoById = async function(id, callback){
  return MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var db = client.db(db_name);
      // Crea la query con el user
      var query = { _id: mongodb.ObjectID(id) };
      // Busca los videos asociados al user
      db.collection('videos').findOneAndDelete(query, function(err, res){
        if (err){
          // eslint-disable-next-line max-len
          console.log('Unable to delete document to the mongoDB server. Error:', err);
          throw err;
        }
        console.log(res);
        console.log('Number of records deleted: ' + res.affectedRows);
        client.close();

      });

      // Close connection
      client.close();
    }
  });
};


module.exports.getAllVideos = getAllVideos;
module.exports.getAllVideosForUser = getAllVideosForUser;
module.exports.deleteVideoById = deleteVideoById;
module.exports.addVideo = addVideo;
