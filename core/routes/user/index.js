const userMod = require('../../model/userMod');
const STATUS = {
    success: {
        code: '1',
        msg: '登录成功'
    },
    session_404: {
        code: '-103',
        msg: '请刷新页面重试'
    },
    name_404: {
        code: '-101',
        msg: '账号不存在'
    },
    name_typeErr: {
        code: '-102',
        msg: '账号格式错误(必须为邮箱)'
    },
    pwd_err: {
        code: '-201',
        msg: '密码错误'
    },
    pwd_len_err: {
        code: '-202',
        msg: '密码长度有误'
    },
    capt_err: {
        code: '-300',
        msg: '验证码错误'
    }
};

let actions = {
    regi: function(req, res, next) {
        var data = req.body;
        // var sess_capt = req.session.captcha;
        // if (sess_capt) {
        //     if (sess_capt != data.captcha) {
        //         res.json(capt_err);
        //         return;
        //     }
        // } else {
        //     res.json(STATUS.session_404);
        //     return;
        // }
        var _data = {
            uid: data.name,
            uname: data.name,
            upwd: data.pwd,
            created: Date.now()
        };
        userMod.insertOne(_data, function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    },

    del: function() {


    },
    login: function(req, res, next) {

        console.log(req.body);
        STATUS.success.data = req.body
        res.json(STATUS.success);
    }
};


module.exports = {

    '/:id': {
        'post': function(req, res, next) {
            console.log(req.originalUrl);
            actions[req.params.id] ? actions[req.params.id].apply(this, arguments) : next();
        }
    }
};
