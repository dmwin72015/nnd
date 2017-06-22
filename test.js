const MongoClient = require('mongodb').MongoClient;
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

class BaseMod {

    constructor(collectionName) {
        // this.collection = null;
        this.status = 'close';
        this.colName = collectionName;
        var fn = this.connect(collectionName);
        fn('some').then(function (val) {
        });
    }

    connect(collectionName, cb) {
        if (this.collection) {
            return this;
        }
        var that = this;
        return co.wrap(function*(args) {
            var db = yield MongoClient.connect(MongoConf.url, DBConf);
            var col = that.collection = db.collection(collectionName);

            db.stats().then(function (stats) {
                console.log(stats);
            });

            db.on('close', function () {

                console.log('数据库关闭了');

            });
            db.close();

            // col.insertOne({
            //     loginname: 'dm_job2013@163.com',
            //     password: '123456',
            //     cn_name: '董敏',
            //     age: 28,
            //     id: Date.now() + 'dm_job2013@163.com',
            //     created: new Date
            // });
            that.status = 'connected';
            return Promise.resolve(col);
        });
    }

    find(data) {
        var that = this;
        if (this.status == 'connected') {
            this.collection.find(data).toArray(function (err, data) {
                console.log(data[0]);
            })
        } else {
            var fn = that.connect(that.colName);
            fn('then').then(function (col) {
                col.find(data).toArray(function (err, data) {
                    console.log(data[0]);
                });
            });
        }
    }

    //connect to database
    connect_prom() {
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
var db = new BaseMod('spider_test');

// db.find({});