/**
 * Created by mjj on 2017/6/22.
 */
const MongoClient = require('mongodb').MongoClient;
const MongoConf = require('../conf/mongo-conf')('dev');
const co = require('co');
const mongo = require('mongoskin');

let DBConf = {
    poolSize: 6,
    loggerLevel: 'info',
    logger: function (message, ev) {
        console.log(message);
    }
};
var db = mongo.db(MongoConf.url, DBConf);

var col = db.bind('spider_test');

col.find({}).limit(3).toArray(function (err, items) {
    console.log(items);
    console.log('<========================>');
});

db['spider_test'].find({}).toArray(function (err, items) {
    db.close();
    console.log(db);
});



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