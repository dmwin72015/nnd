/**
 * Created by mjj on 2017/7/11.
 */
const db = require('../lib/connectDB');
const schema = require('../lib/schema');
const co = require('co');
const Schmea = require('./schema');

class Model {

    //构造函数
    constructor(schmea, collName) {
        if (schmea instanceof Schmea){
            return this;
        }
        this.schema = schmea;
        this.collName = collName;
    }

    // 保存

    saveOne(data){


    }

}

function Model(schema, collection) {
    this.collName = collection;

}

Model.prototype = Object.create(EventEmitter.prototype);

Model.prototype.constructor = Model;


Model.prototype.saveOne = function () {

};



