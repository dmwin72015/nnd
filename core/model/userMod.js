const DB = require('../lib/connectDB');
const userCol = DB.bind('users');
const schmea = require('../lib/schema');
const co = require('co');
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
        canNull: false
    },
    alias: {
        max: 50,
        default: 'self:uname'
    },
    upwd: {
        max: 18,
        lowercase: true,
        trim: true,
        canNull: false
    },
    age: {
        type: Number,
        max: 150
    },
    sex: {
        type: 'enum',
        val: [0, 1, 2]
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
let ERRMSG_LOST_Login = {
    code: schmea.ERR_LOST_FIELD,
    msg: '请输入账号或密码'
};
let ERRMSG_EXITS_ID = {
    code: schmea.ERR_LOST_FIELD,
    msg: '账号已经被注册'
};
let ERRMSG_UNVALID = function (name) {
    return {
        code: schmea.ERR_NOT_VALID,
        msg: name + '格式错误'
    }
};

let userSchema = new schmea(userField);

module.exports = {

    insertOne: function (data, callback) {
        let keys = Object.keys(userField);
        let _newData = {};
        for (var i = 0; i < keys.length; i++) {
            if(data[keys[i]]){
                _newData = data[keys[i]]
            }
        }

        data = _newData;

        if (!data.uid && !data.uname && !data.upwd) {
            callback(ERRMSG_LOST_Login);
            return;
        }

        let reg_email = /^\w+@(\w+)+(\.\w+)+$/i;

        if (!reg_email.test(data.uid)) {
            callback(ERRMSG_UNVALID('账号名称'));
            return;
        }

        let reg_pwd = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!reg_pwd.test(data.uwpd)) {
            callback(ERRMSG_UNVALID('密码'));
            return;
        }

        let validRes = userSchema.valid(data);
        if (validRes) {
            co(function *() {
                let _res = yield userCol.findOne({uid: data.uid});
                if (_res && _res.length > 0) {
                    callback(ERRMSG_EXITS_ID);
                    return;
                }
                return yield userCol.insertOne(validRes);
            }).then((data)=> {
                callback(null, data);
            }).catch((err)=> {
                callback(err);
            })
        } else {
            callback(userSchema.validators);
        }
    },
    register: function (data, callback) {
        this.insertOne(data, callback);
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
