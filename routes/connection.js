import {MongoClient} from 'mongodb'

let client = null;
let collections = {};

exports.init = function() {
  console.log("init")
  return MongoClient.connect(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/CodeWhispers')
  .then((database) => {
    client = database.db("whipser")
  })
};

exports.collection = function(collectionName) {
  if (!collections[collectionName]) {
    collections[collectionName] = client.collection(collectionName);
  }
  return collections[collectionName];
};
