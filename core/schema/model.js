/**
 * Created by mjj on 2017/7/11.
 */
const db = require('../lib/connectDB');
const co = require('co');

let dbstatus = db;//1 -> 开启 ; 0 -> 关闭

class Model {

    //构造函数
    constructor(collName, schmea) {
        this.schema = schmea;
        this.collName = collName;
        this.coll = db.collection(collName);
    }

    // 保存

    findOne(data ,callback) {
        this.coll.findOne(data ,callback);
    }

    saveOne(data ,callback) {
        var that = this;
        that.schema.validate(data,function (err,_data) {
            if(err){
                callback(err);
                return;
            }
            
            that.coll.findOne(data ,callback);
        });
    }
}


module.exports = Model;