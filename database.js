const mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI;

MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var db = client.db("heroku_tvzq5bld");

      let data =
        {
          file_name: 'test',
          file_size: '80KB',
          created_date: '31/5/2020',
          firebase_url: 'firebaseurl',
          user: 'test@test.com'
        };

      db.collection("videos").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });



      //Close connection
      client.close();
    }
});