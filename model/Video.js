'use strict';

const mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  user: {type: String, required: true},
  fileName: {type: String, required: true},
  url: {type: String, required: true},
  isPrivate: {type: Boolean, required: true},
  upload_date: {type: Date, default: Date.now},
  latitude: {type: String, required: false},
  longitude: {type: String, required: false},
}, { collection: 'videos' });

module.exports = mongoose.model('Video', VideoSchema);
