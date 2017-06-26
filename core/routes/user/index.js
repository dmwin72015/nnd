const userMod = require('../../model/userMod');

let actions = {

    add: function (req, res, next) {
        userMod.insertOne(req.body, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    },

    del: function () {


    }
};


module.exports = {

    '/:id': {
        'post': function (req, res, next) {
            actions[req.params.id] ? actions[req.params.id].apply(this, arguments) : next();
        }
    }
};