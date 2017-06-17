"use strict";
const co = require('co');
const baseRequest = require('../../lib/request.js');
const cheerio = require('cheerio');

var haha_conf = {
    hostname: 'www.haha.mx'
};
var ryf_conf = {
    hostname: 'www.ruanyifeng.com',
    path: '/blog/'
};

var COOKIE = {};

function saveCookie(target) {
    COOKIE = baseRequest.saveCookie(target.headers['set-cookie']);
}

// 获取文章
function getArt() {
    return baseRequest({
        req: ryf_conf
    });
}

// 获取文章内的图片
function getImgFromArt(sHtml) {
    var $ = cheerio.load(sHtml);
    var data = [];
    $('#homepage .module-list-item').each(function (i, elm) {
        var href = $(elm).find('a').attr('href');
        var title = $(elm).find('a').text();
        var time = $(elm).find('span').text();
        data.push({
            title: title,
            href: href,
            time: time
        });
    });
    return data;
}

function getArtControl(req, res, next) {
    co(function *() {
        var res = yield getArt();
        saveCookie(res[0]);
        return getImgFromArt(res[1]);
    }).then((data) => {
        res.json({
            status: 1,
            data: data,
            msg: 'success'
        })
    }).catch((e) => {
        console.log(e);
        res.json(e);
    });
}

module.exports = {
    '/': function (req, res, next) {
        res.render('spider/get-art', {
            titleName: '抓取文章页面'
        });
    },
    '/:action': {
        post: function (req, res, next) {
            if (req.params.action == 'art') {
                getArtControl.apply(this, arguments);
            } else {
                next();
            }
        }
    }
};
