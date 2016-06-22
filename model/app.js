"use strict";
var ObjectId = require('mongodb').ObjectID;

class App {

  static collectionName() {
    return "apps";
  }

  static collection() {
    return global.database.collection(App.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  save(callback) {
    let apps = App.collection();
    apps.save(this, {w:1}, callback);
  }

  static appsForQuery(query, serialise, callback) {
    let apps = App.collection();

    apps.find(query).toArray(function (err, docs) {
      if (!err) {
        if (serialise == true) callback(null, _createAppsFromDocs(docs));
        else callback(null, docs);
      } else {
        console.log('Error fetching apps: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createAppsFromDocs(docs) {
  var apps = [];
  for (var appEntry of docs) {
    apps.push(new App(appEntry));
  }
  return apps;
}

module.exports = App;