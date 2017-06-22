var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([{
        a: 1
    }, {
        a: 2
    }, {
        a: 3
    }], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

var connectDB = function(opt) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(MongoConf.url, DBConf, function(err, db) {
            if (err) {
                reject(err);
                db.close();
            } else {
                resolve(db);
            }
        });
    });
};

var insert = function(db, collection, data) {
    return new Promise(function(resolve, reject) {
        var coll = db.collection(collection);
        coll.insert(data, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
var insertMany = function(db, collection, data) {
    return new Promise(function(resolve, reject) {
        var coll = db.collection(collection);
        coll.insertMany(data, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};