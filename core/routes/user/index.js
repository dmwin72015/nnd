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
    id_exits: {
        code: '-102',
        msg: '用户名已经存在'
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
        var sess_capt = req.session.captcha;
        if (sess_capt) {
            if (sess_capt != data.captcha) {
                res.json(capt_err);
                return;
            }
        } else {
            res.json(STATUS.session_404);
            return;
        }
        var _data = {
            uid: data.name,
            uname: data.name,
            upwd: data.pwd,
            created: new Date()
        };
        userMod.insertOne(_data, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    },

    del: function() {


    },
    login: function(req, res, next) {
        var uName = req.body.uname;
        var sPwd = req.body.upwd;
        if (req.session.loginInfo) {
            res.json({
                code: -6,
                msg: '已经登录，请勿重复登录'
            });
            return;
        }
        userMod.findOne({
            uid: uName
        }, (err, data) => {
            if (err) {
                next();
                return;
            }
            if (!data) {
                res.json({
                    code: '-3',
                    msg: '此用户不存在'
                });
                return;
            }
            if (data.upwd !== sPwd) {
                res.json({
                    code: '-4',
                    msg: '账号或密码错误'
                });
            } else {
                res.app.locals.loginInfo = req.session.loginInfo = {
                    id: data.uid,
                    name: data.uname,
                    loginDate: Date.now()
                };
                res.json({
                    code: '1',
                    msg: 'success'
                });
            }
        })
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