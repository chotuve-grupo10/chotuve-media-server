'use strict';

var firebasemock = require('firebase-mock');

var mockdatabase = new firebasemock.MockFirebase();
var mockfirestore = new firebasemock.MockFirestore();
var mockstorage = new firebasemock.MockStorage();
var mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return null;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return null;
  },
);

module.exports = mocksdk;
