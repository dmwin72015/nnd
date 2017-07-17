/**
 * Created by mjj on 2017/7/11.
 */
const db = require('../lib/connectDB');
const co = require('co');
const Schmea = require('./schema');

let dnstatus = db;//1 -> 开启 ; 0 -> 关闭

class Model {

    //构造函数
    constructor(collName, schmea) {
        if (schmea instanceof Schmea) {
            return this;
        }
        this.schema = schmea;
        this.collName = collName;
        this.coll = db.collection(collName);
    }

    // 保存

    saveOne(data ,callback) {
        this.schema.validate(data,function (err,_data) {
            if(err){
                callback(err);
                return;
            }
            this.coll.findOne(data ,callback);
        });
    }
}


