const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const MongoConf = require('./core/conf/mongo-conf')('dev');
var co = require('co');


// Connect using MongoClient
var DBConf = {
    poolSize: 3,
    logger: function (message, ev) {
        console.log(message);
    },
    loggerLevel: 'info'
};


let Db = mongo.Db;

console.dir(Db);

Db.open(function (err) {
    console.log(arguments);
});
// db.find({});