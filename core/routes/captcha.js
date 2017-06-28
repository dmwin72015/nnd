/**
 * Created by mjj on 2017/6/27.
 */
const svgCaptcha = require('svg-captcha');

// svgCaptcha.loadFont('/xin/memory/nnd/public_new/assets/font/FontAwesome.otf');
// svgCaptcha.options.fontSize = '100';

module.exports = {
    '/': function (req, res, next) {
        res.sendStatus(403).end();
    },
    'new.gif': function (req, res, next) {
        var text = '中华FUNC';
        // var captcha = svgCaptcha.create({
        //     color:true,
        //     size:6
        // });
        var svg = svgCaptcha(text, {
            color: true,
            size: 6
        });
        req.session.captcha = text;
        res.set('Content-Type', 'image/svg+xml');
        res.send(svg);
    },
    'valid': function (req, res, next) {
        if (!req.session.captcha) {
            res.json({'code': '1001', 'msg': '请刷新页面重试'});
            return;
        }
        let method = req.method.toLowerCase();
        let cap_val = '';
        if (method == 'get') {
            cap_val = req.query.val;
        } else if (method == 'post') {
            cap_val = req.body.val;
        }
        if (!cap_val) res.json({code: -1, msg: '请求错误'});
        var _data = {
            sess_cap: req.session.captcha,
            captcha: cap_val.toUpperCase()
        };
        res.send(_data);
    }
};