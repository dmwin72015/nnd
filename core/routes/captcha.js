/**
 * Created by mjj on 2017/6/27.
 */
const svgCaptcha = require('svg-captcha');


module.exports = {
    '/': function (req, res, next) {
        res.sendStatus(403).end();
    },
    'getnew': function (req, res, next) {
        var captcha = svgCaptcha.create();
        req.session.captcha = captcha.text;
        res.set('Content-Type', 'image/svg+xml');
        res.send(captcha.data);
    }
};
