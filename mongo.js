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
    if (!MONGO_URL) return cb(new Error('MONGO_URL secret is missing'))

    waterfall([
        function connect_to_db(done) {
            MongoClient.connect(MONGO_URL, function(err, db) {
                if(err) return done(err);

                done(null, db);
            });
      },
      function do_something(db, done) {
          db
              .collection('summary_2009_2017.')
              .find({}, function (err, result) {
                  if(err) return done(err);

                  done(null, result);
              });
      }
    ], cb);
};
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help
