'use strict';
const SECRET = process.env.TOKEN_SECRET;
var jwt = require('jsonwebtoken');

function is_valid_token_from_admin_user(token_received){
  console.log('Token to verify: ' + token_received);

  try {
    var decoded = jwt.verify(token_received, SECRET);
    console.log('Token decoded successfully');
    return decoded.admin_user;
  } catch (err) {
    console.log('Error decoding token:' + err);
    return false;
  }
}

// function get_valid_token_for_admin_user(user_email) {
// }

module.exports.is_valid_token_from_admin_user = is_valid_token_from_admin_user;
