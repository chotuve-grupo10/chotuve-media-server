'use strict';

// eslint-disable-next-line max-len
async function is_valid_media_server_token(token_received, appServersCollection, callback){
  console.log('Token to verify: ' + token_received);

  // eslint-disable-next-line max-len
  await appServersCollection.getAppServerWithToken(token_received, function(err, appServersList){
    if (err) {
      console.log(err);
      throw err;
    }

    if (appServersList.length === 1) callback(null, true);
    else callback(null, false);
  });
}

module.exports.is_valid_media_server_token = is_valid_media_server_token;
