// eslint-disable-next-line strict
const mongodb = require('mongodb');

class Database{
  constructor(dbHandler){
    this.db = dbHandler;
    this.collectionName = 'videos';
    this.collection = this.db.collection(this.collectionName);
    console.log('Database initialized');
  }

  async addVideo(video_to_upload, callback){

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
      callback(null, res);
    });
  }

  async addNewVideo(video_to_upload) {
    var datetime = new Date();
    video_to_upload['upload_date'] = datetime.toLocaleDateString();
    console.log('Document to insert: ' + JSON.stringify(video_to_upload));
    return this.collection.insertOne(video_to_upload);
  }

  async getAllVideos(callback){
    // Busca todos los videos
    let max_results = 15;
    console.log('Getting all videos...');
    this.collection.find({}).limit(max_results).toArray(function(err, result) {
      if (err) throw err;
      console.log('Obtained videos list');
      callback(null, result);
    });
  };

  async getVideos({for_user, max_results = 15} = {}) {
    if (for_user) {
      // Estoy bastante seguro de que esto no se escribe asi en ingles
      // pero mantengo el mensaje original
      console.log(`Looking videos from user ${for_user}`);
    } else {
      console.log('Getting all videos...');
    }
    var query = for_user ? { user: for_user } : {};
    return this.collection.find(query).limit(max_results).toArray();
  }

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
      callback(null, null);
    }
  };

  async deleteVideoByObjectId(id){
    return new Promise((resolve, reject) => {
      if (mongodb.ObjectID.isValid(id)){
        console.log('The id received is valid');
        var query = { _id: mongodb.ObjectID(id) };
        this.collection.findOneAndDelete(query, function(err, res){
          if (err) return reject(err);
          console.log('Deleted ok. About to resolve the promise');
          resolve(res.value);
        });
      } else {
        console.log('Invalid ID received to delete');
        reject('Invalid ID received to delete');
      }
    });
  };
}

module.exports.Database = Database;
