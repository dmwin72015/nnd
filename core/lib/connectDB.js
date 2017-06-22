/**
 * Created by mjj on 2017/6/22.
 */
const MongoClient = require('mongodb').MongoClient;
const MongoConf = require('../conf/mongo-conf');
const co = require('co');
const mongo = require('mongoskin');


var db = mongo.db("mongodb://localhost:27017/integration_tests", {native_parser: true});

db.bind('article');

db.article.find().toArray(function (err, items) {
    db.close();
});







let DBConf = {
    poolSize: 6,
    loggerLevel: 'info',
    logger: function (message, ev) {
        console.log(message);
    }
};

function connectDb(url) {

    return function (callback) {
        MongoClient.connect(MongoConf.url, DBConf, function (err, db) {
            if (err) {
                reject(err);
                db.close();
            } else {
                resolve(db);
            }
        });
    }
}