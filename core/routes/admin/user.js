/**
 * Created by dong on 2017/6/17.
 */

const userMod = require('../../model/userMod');

let userAll = function (req, res, next) {
    var action = req.params.action;

    if (req.route.methods.get) {
        reqGetHander[action].apply(this, arguments)
    } else {
        reqPostHander[action].apply(this, arguments)
    }
};


let reqGetHander = {
    list: function (req, res, next) {
        res.render('user/adminer.html');
    }
};
let reqPostHander = {

    addAdminer: function (req, res, next) {
        "use strict";
        var data = req.body;
        userMod.insertOne(data, function (err, data) {

            res.render('user/adminer.html');

        });
    }
};

module.exports = {
    '/': function (req, res, next) {
        userMod.findByName('dongmin', function (err, data) {
            "use strict";
            res.render('user/index.html');
            return;
            if (err || !data) {
                next();
                return;
            }
            if (data) {


            }
        });
    },

    '/:action': {
        get: userAll,
        post: userAll
    }
}