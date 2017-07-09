/**
 * Created by dong on 2017/6/17.
 */

const userMod = require('../../model/userMod');

let userAll = function(req, res, next) {
    var action = req.params.action;

    if (req.route.methods.get) {
        if (reqGetHander[action]) {
            reqGetHander[action].apply(this, arguments)
        } else {
            next();
        }

    } else {
        if (reqPostHander[action]) {
            reqPostHander[action].apply(this, arguments)
        } else {
            next();
        }
    }
};


let reqGetHander = {
    list: function(req, res, next) {
        res.render('user/adminer.html');
    }
};

let reqPostHander = {

    add: function(req, res, next) {
        "use strict";
        userMod.insertOne(req.body, function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    }
};

module.exports = {
    '/': function(req, res, next) {
        var curUser = req.session.loginInfo;
        console.log(req.session);
        if (curUser) {
            userMod.findOne({ uid: curUser.id }, function(err, data) {
                if(err || !data){
                    next();
                    return;
                }
                var tmpl_data = {
                    uid:data.uid,
                    name:data.uname || data.uid,
                    age:data.age || '',
                    sex:data.sex || '',
                    nick_name:data.alias || data.uid,
                    group:data.gname || '无',
                    reg_date:data.created.toLocaleString()
                };
                var re_data = {};
                re_data.tmplData =[
                    { title: 'ID', val: data.uid },
                    { title: '姓名', val: data.uname || data.uid },
                    { title: '年龄', val: data.age || '' },
                    { title: '性别', val: data.sex || ''},
                    { title: '昵称', val: data.alias || data.uid },
                    { title: '组', val: data.gname || '无' },
                    { title: '注册时间', val: data.created.toLocaleString() }
                ];
                re_data.name = '测试';
                res.render('user/index.html',re_data);
            });
        }else{
           res.redirect('/user/login'); 
        }
    },

    '/:action': {
        get: userAll,
        post: userAll
    }
}
