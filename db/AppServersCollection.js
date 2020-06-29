// eslint-disable-next-line strict
const APP_SERVERS_COLLECTION_NAME = 'appServers';

class AppServersCollection{
  constructor(dbHandler){
    this.db = dbHandler;
    this.collectionName = APP_SERVERS_COLLECTION_NAME;
    this.collection = this.db.collection(this.collectionName);
    console.log('App servers collection initialized');
  }

  async addAppServer(app_server_to_add, callback){

    console.log('Document to insert: ' + JSON.stringify(app_server_to_add));

    this.collection.insertOne(app_server_to_add, function(err, res) {
      if (err) {
        // eslint-disable-next-line max-len
        console.log('Unable to insert app server to the mongoDB server. Error:', err);
        throw err;
      }
      console.log('Inserted app server');
      callback(null, res);
    });
  }

  async getAllAppServers(callback){

    let max_results = 15;
    console.log('Getting all app servers...');
    this.collection.find({}).limit(max_results).toArray(function(err, result) {
      if (err) throw err;
      console.log('Obtained app servers list');
      callback(null, result);
    });
  };

  async getAppServerWithToken(token_to_find, callback){

    console.log('Looking app server with token ' + token_to_find);
    var query = { token: token_to_find};

    this.collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      callback(null, result);
    });
  };

  async deleteAppServerWithToken(token_to_delete, callback){

    // eslint-disable-next-line max-len
    console.log('Requested to delete app server with token: ' + token_to_delete);
    var query = { token: token_to_delete };
    this.collection.findOneAndDelete(query, function(err, res){
      if (err){
        // eslint-disable-next-line max-len
        console.log('Unable to delete document to the mongoDB server. Error:', err);
        throw err;
      }
      callback(null, res);
    });
  };
}

module.exports.AppServersCollection = AppServersCollection;
