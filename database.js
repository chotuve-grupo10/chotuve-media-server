// eslint-disable-next-line strict
const mongodb = require('mongodb');

class Database{
  constructor(dbHandler){
    this.db = dbHandler;
    this.collectionName = 'videos';
    this.collection = this.db.collection(this.collectionName);
    console.log('Database initialized');
  }

  async addVideo(video_to_upload){

    var datetime = new Date();
    video_to_upload['upload_date'] = datetime.toLocaleDateString();

    console.log('Document to insert: ' + JSON.stringify(video_to_upload));

    this.collection.insertOne(video_to_upload, function(err, res) {
      if (err) {
        // eslint-disable-next-line max-len
        console.log('Unable to insert document to the mongoDB server. Error:', err);
        throw err;
      }
      console.log('1 document inserted');
    });
  }

  async getAllVideos(callback){
    // Busca todos los videos
    console.log('Getting all videos...');
    this.collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log('Obtained videos list');
      callback(null, result);
    });
  };

  async getAllVideosForUser(user_p, callback){

    console.log('Looking videos from user ' + user_p);
    // Crea la query con el user
    var query = { user: user_p };
    // Busca los videos asociados al user
    this.collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      callback(null, result);
    });
  };

  async getVideoById(id, callback){

    if (mongodb.ObjectID.isValid(id)){
      console.log('The id received is valid');
      var query = { _id: mongodb.ObjectID(id) };
      // Busca los videos asociados al user
      this.collection.findOne(query, function(err, res){
        if (err){
          // eslint-disable-next-line max-len
          console.log('Unable to delete document to the mongoDB server. Error:', err);
          throw err;
        }
        console.log('Document found');
        callback(null, res);
      });
    } else {
      console.log('Invalid ID received to delete');
      callback('Invalid ID received to delete', null);
    }
  };

  async deleteVideoById(id, callback){

    if (mongodb.ObjectID.isValid(id)){
      console.log('The id received is valid');
      var query = { _id: mongodb.ObjectID(id) };
      // Busca los videos asociados al user
      this.collection.findOneAndDelete(query, function(err, res){
        if (err){
          // eslint-disable-next-line max-len
          console.log('Unable to delete document to the mongoDB server. Error:', err);
          throw err;
        }
        console.log('Number of records deleted: ' + res.affectedRows);
        callback(null, res);
      });
    } else {
      console.log('Invalid ID received to delete');
      callback('Invalid ID received to delete', null);
    }
  };
}

// async function addVideo(video_to_upload){
//   MongoClient.connect(url, function(err, client) {
//     if (err) {
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//       throw err;
//     } else {
//       console.log('Connection established to', url);

//       var db = client.db(db_name);

//       var datetime = new Date();
//       video_to_upload['upload_date'] = datetime.toLocaleDateString();

//       console.log('Document to insert: ' + JSON.stringify(video_to_upload));

//       db.collection('videos').insertOne(video_to_upload, function(err, res) {
//         if (err) {
//           // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
//           console.log('Unable to insert document to the mongoDB server. Error:', err);
//           throw err;
//         }
//         console.log('1 document inserted');
//         client.close();
//       });

//       // Close connection
//       client.close();
//     }
//   });
// }

module.exports.Database = Database;
