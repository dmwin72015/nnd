var mod = {
    name: 'user'
};

var baseMod = require('./baseModel');
var userMod = new baseMod('user');
// var connectDb = require('../lib/connectDB');


module.exports = {

    findOne: function (data, callback) {
        userMod().then(function (that) {
            var r = that.collection.findOne(data, opt || {});
            callback(null, r);
        }).catch(function (err) {
            callback(err);
        });
    },
    insert: function (data, callback) {


    }
};
