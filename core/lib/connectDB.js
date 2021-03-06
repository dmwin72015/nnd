/**
 *    Created by mjj on 2017/6/22.
 *    connect to mongodb(连接mongodb数据库)
 */
// const MongoClient = require('mongodb').MongoClient;
const MongoConf = require('../conf/mongo-conf')('dev');
// const co = require('co');
// const mongo = require('mongoskin');
//
// let DBConf = {
//     poolSize: 6,
//     loggerLevel: 'info',
//     logger: function(message, ev) {
//         console.log(message);
//     },
//     native_parser: true
// };
//
// let db = mongo.db(MongoConf.url, DBConf);

// var col = db.bind('spider_test');

// col.find({}).limit(3).toArray(function (err, items) {
//     console.log(items);
//     console.log('<========================>');
// });
//
// db['spider_test'].find({}).toArray(function (err, items) {
//     db.close();
//     console.log(db);
// });
var options = {
    db: {native_parser: true},
    server: {poolSize: 5}
    // replset: { rs_name: 'myReplicaSetName' },
    // user: 'myUserName',
    // pass: 'myPassword'
}

var mongoose = require('mongoose');

var db = mongoose.createConnection(MongoConf.url, options);

db.on('open', ()=> {
    console.log('数据库打开====>[' + Date.now() + ']');
});


db.on('error', console.error.bind(console, 'connection error:'));


module.exports = db;


























