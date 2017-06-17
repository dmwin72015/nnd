const http = require('http');
const fs = require('fs');
const request = require('request');

let default_opt = {
    timeout: 2000
};

class Spider {

    constructor(opt) {
        this.limit = 10;
        this.opt = opt || {}
        this.req = http.request(this.opt);
    }

    //发送请求
    fetch(url, callback) {
        var that = this;
        var _data = {}
        http.get(url, function(res) {
            that.event(res, function(trunk) {
                _data.html = trunk;
                _data.res = res;
                callback && callback(null, _data);
            });
        }).on('error', (err) => {
            callback(err)
        });
    }

    event(res, cb) {
        let that = this;
        let html = '';
        res.on('data', function(trunk) {
            html += trunk;
        });
        res.on('end', function(trunk) {
            cb && cb(html);
        });
    }

    request(opt, callback) {
        var that = this;
        return new Promise(function(resolve, reject) {
            http.request(opt, (res) => {
                console.log('返回结果')
                that.event(res, (trunk) => {
                    console.log('ok')
                    resolve({
                        html: trunk,
                        res: res
                    });
                });
            }).on('error', (err) => {
                reject(err)
            });
        });
    }

    requestCB(opt, callback) {
        http.request(opt, (res) => {
            that.event(res, (trunk) => {
                callback && callback(null, trunk, res);
            });
        }).on('error', (err) => {
            callback && callback(err);
        });
    }

    * requestGn(opt, callback) {


    }
}
module.exports = Spider;
