const MongoClient = require('mongodb').MongoClient;
const MongoConf = require('../conf/mongo-conf');
var co = require('co');


// Connect using MongoClient
var DBConf = {
    poolSize: 10
};

class BaseMod {

    constructor(collectionName) {
        // this.collection = null;
        this.status = 'close';
        var fn = this.init(collectionName);
        console.log(fn);
    }

    init(collectionName) {
        if (this.collection) {
            return this;
        }
        var that = this;
        return co.wrap(function*() {
            var db = yield MongoClient.connect(MongoConf.url);
            that.collection = db.collection(collectionName);
            return Promise.resolve(that);
        });
    }

    findDoc(data) {


    }

    insertDoc(data) {

    }

    updateDoc(data) {


    }

    removeDoc(data) {

    }

    //connect to database
    connect() {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(MongoConf.url, DBConf, function (err, db) {
                if (err) {
                    reject(err);
                    db.close();
                } else {
                    resolve(db);
                }
            });
        });
    }
}


module.exports = BaseMod;
