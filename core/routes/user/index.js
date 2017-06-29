const userMod = require('../../model/userMod');

let actions = {

    reg: function (req, res, next) {

        var data = req.body;

        console.log(data);

        userMod.insertOne(req.body, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    },

    del: function () {


    },
    reg: function () {


    }
};


module.exports = {

    '/:id': {
        'post': function (req, res, next) {
            actions[req.params.id] ? actions[req.params.id].apply(this, arguments) : next();
        }
    }
};