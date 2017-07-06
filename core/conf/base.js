"use strict";
//已经废弃，早期思路的参考，
//为了使用express不支持的模板，自己又分装了一层
var express = require('express');
var path = require('path');
var router = express.Router();
/* GET home page.
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});*/
// var dots = require("dot").process({
//     global: "_page.render",
//     destination: path.join(__dirname, "../render"),
//     path: path.join(__dirname, "../views")
// });

class BaseRouter {

    constructor(app) {
        this.globalData = {};
        this.routeCache = [];
    }

    toString() {
        var _str = [];
        for (var x in this) {
            _str.push('"' + x + '":' + this[x]);
        }
        return '{' + _str.join(',') + '}'
    }

    init(app) {
        app.use('/', router);
    }

    global(data) {
        this.tmplData = Object.assign(this.globalData, data || {});
    }

    render(tmpl, data) {
        // var html = dots[tmpl](Object.assign(this.globalData, data || {}));
        // this.res.send(html);
    }

    route(opt, cb) {
        var that = this;
        var path = opt.path || '/';
        router[opt.type || 'get'](path, function(req, res, next) {
            that.res = res;
            that.req = req;
            that.next = next;
            cb && cb.apply(that, arguments);
        })
        this.routeCache.push(path);
    }

    get(path, cb) {
        this.route({
            path: path
        }, cb);

    }

    post(path, cb) {
        this.route({
            type: 'post',
            path: path
        }, cb);
    }
}

module.exports = new BaseRouter();
