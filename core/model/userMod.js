const DB = require('../lib/connectDB');
const userCol = DB.bind('users');
const schmea = require('../lib/schema');
/**
 *  用户字段
 *  uid      登陆账号 (unique max:50)
 *  uname    姓名  (max: 50)
 *  alias    别名
 *  sex     性别  (0 男性  1 女性  2 其他)
 *  age     年龄  (number  0 - 200)
 *  gid     组ID
 *  gname   组名字
 *  created 创建时间(date)
 */


let userField = {
    uid: {
        primary: true
    },
    uname: {
        max: 50,
        canNull: false,
    },
    alias: {
        max: 50,
        default: 'self:uname'
    },
    upwd: {
        max: 18,
        lowercase: true,
        trim: true,
        canNull: false,
    },
    age: {
        type: Number,
        max: 150
    },
    sex: {
        type: 'enum',
        val: [0, 1, 2],
    },
    gid: {
        max: 50
    },
    gname: {
        max: 100
    },
    created: {
        type: 'Date',
        default: Date.now
    }
};

let userSchema = new schmea(userField);

module.exports = {

    insertOne: function (data, callback) {
        let _res = userSchema.valid(data);
        if (_res) {
            userCol.insertOne(_res, callback);
        } else {
            callback(userSchema.validators);
        }
    },

    insertMany: function (data, callback) {
        for (var i = 0; i < data.length; i++) {
            let _res = userSchema.valid(data);
            if (!_res) {
                callback(userSchema.validators);
                return
            }
        }
        userCol.insertMany(data, callback);
    },

    findByName: function (name, callback) {
        "use strict";
        userCol.findOne({uname: name}, callback);
    }
};
