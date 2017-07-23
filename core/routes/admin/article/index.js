const articleMod = require('../../../model/articleMod');
const moment = require('moment');

function getArticle(req, res, next) {
    articleMod.find().lean(true).limit(10).exec(function (err, doc) {
        if (err) {
            res.json(err);
            return;
        }
        if (doc) {
            for (var i = 0; i < doc.length; i++) {
                doc[i].publishDate = moment(doc[i].publishDate).format('YYYY-MM-DD hh:mm:ss');
            }
        }
        res.render('spider/articlelist.html', {
            articles: doc
        });
    });
}


module.exports = {
    '/': getArticle
}
