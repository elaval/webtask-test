/* 
  Connects to mongo. The mongo connection url is specified on webtask creation (and is encrypted)
  wt create task -s MONGO_URL=mongodb://<my-secret-url>
*/

var MongoClient = require('mongodb').MongoClient;
var waterfall   = require('async').waterfall;

/**
 * @param {secret} MONGO_URL - Mongo database url
 */
module.exports = function(ctx, cb) {

    var MONGO_URL = ctx.data.MONGO_URL;    
    MongoClient.connect(MONGO_URL, function(err, db) {
      if(err) cb(err, null);
  
      db
        .collection('summary_2009_2017')
        .find({})
        .toArray((err, result) => {
            if(err) cb(err, null);
            cb(null,result)
        });

    });
};
