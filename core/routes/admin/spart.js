"use strict";
const co = require('co');
const baseRequest = require('../../lib/NativeRequest.js');
const cheerio = require('cheerio');
const request = require('request').defaults({jar: true});
const fs = require('fs');
const async = require('async');
const iconv = require('iconv-lite');

const articleMod = require('../../model/articleMod');
const movieMod = require('../../model/movieMod');

let haha_conf = {
    hostname: 'www.haha.mx'
};
let ryf_conf = {
    hostname: 'www.ruanyifeng.com',
    path: '/blog/'
};

let COOKIE = {};

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3009.0 Safari/537.36',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cookie': 'UM_distinctid=15d6e93d3815c2-068c0bfe9693b1-6e300078-13c680-15d6e93d382868; CNZZDATA1262672230=1695766143-1500798425-http%253A%252F%252Fwww.ruanyifeng.com%252F%7C1500798425; _ga=GA1.2.1039980269.1500798768; _gid=GA1.2.1472451063.1500798768; _gat=1'
};

function saveCookie(target) {
    COOKIE = baseRequest.saveCookie(target.headers['set-cookie']);
}

// 获取文章
function getArt(url) {
    // return baseRequest({
    //     req: ryf_conf
    // });
    return baseRequest(url);
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
// 获取ryf的文章信息

function getArticleInfo(sHtml) {
    var $ = cheerio.load(sHtml);
    var data = {};
    var $article = $('article.hentry');
    data.title = $article.find('#page-title').text();
    data.author = $article.find('.author').text();
    data.publishDate = new Date($article.find('.published').attr('title'));
    data.htmlContent = $article.find('.entry-content').html();
    data.textContent = $article.find('.entry-content').text();
    data.source = 'ryf';
    return data;
}

function getArtControl(req, res, next) {
    var url = req.body.url;
    if (!url) {
        res.json({
            code: '-2',
            msg: '请输入地址'
        });
        return;
    }
    if (!req.session.loginInfo) {
        res.json({
            code: '-3',
            msg: '请登录之后操作'
        });
        return;
    }

    let options = {
        url: url,
        headers: headers,
        timeout: 5000
    };
    let dataArr = [];
    // request(options).on('data', (trunk)=> {
    //     dataArr.push(trunk);
    // }).on('end', (data)=> {
    //     console.log('OVER=>', data);
    //
    //
    //     res.json({
    //         code: "1",
    //         msg: Buffer.concat(dataArr).toString()
    //     })
    // });
    request(options, (err, response, body)=> {
        console.log(response.headers);
        if (err) {
            console.log(err, '=====>network err')
            res.json({
                code: '-3',
                data: err,
                msg: 'error'
            });
            return;
        }
        var srcData = getArticleInfo(body);
        srcData.editor = req.session.loginInfo._id;
        var article = new articleMod(srcData);
        article.save()
            .then((doc)=> {
                res.json({
                    code: "1",
                    data: doc,
                    msg: 'success'
                })
            }).catch((err)=> {
            res.json(err);
        });
    })
}

function testPipe(req, res, next) {
    request.get('https://avatars2.githubusercontent.com/u/17537753?v=4&u=c8eb421c0c796aab82f02e8edb2e2afcda406aba&s=400')
        .on('response', function (resp) {
            // res.json(resp);
        })
        .on('error', (err)=> {
            console.log(err);
        })
        .pipe(request.put('http://node.com/admin/spart/aa?a=12', (err, resp, body)=> {
            if (err) {
                res.json({
                    code: '-1',
                    msg: '保存失败'
                })
            } else {
                res.json(body);
            }
        }))
}

function saveImg(req, res, next) {
    // console.log(req);
    // console.log(req.query.a);
    // req.on('data',(trunk)=>{
    //
    //     console.log(trunk)
    //
    // });
    // req.on('end',function(){
    //
    // })
    var writer = fs.createWriteStream('/xin/memory/nnd/public_new/assets/img/logo2.png');
    req.pipe(writer)
        .on('finish', ()=> {
            res.json({
                code: 1,
                data: ['/xin/memory/nnd/public_new/assets/img/logo.png']
            })
        });
}


function parseMovieHtml(sHtml) {
    var $ = cheerio.load(sHtml);
    var $main = $('#Zoom');
    var sHtml = $main.text();
    var result = sHtml.match(/◎译　　名(.*?)◎/);
    return sHtml;

    var _movie = {
        en_name: '',
        trans_name: '',
        cn_name: '',
        year: '',
        origin: '',
        category: '',
        language: '',           //语言
        subtitle: '',           //字幕
        release_date: '',
        IMDb_score: '',
        IMDb_link: '',
        douban_score: '',       //豆瓣评分
        file_format: '',        //文件格式
        resolution: '',         //分辨率,视屏尺寸
        file_size: {            //文件大小
            val: '',
            unit: ''
        },
        duration: {             //时长
            val: '',
            unit: ''
        },
        director: [],           //导演
        performer: [],          //演员
        introduction: '',       //简介
        awards: [],             //获奖情况
        poster: '',             //海报
        creenshots: [''],       //其他图片
        download_urls: [{
            type: '百度云',
            url: ''
        }, {
            type: '迅雷',
            url: ''
        }]
    };
    return _movie;
}


function getMovieDetail(req, res, next) {
    var url = req.body.url;
    if (!/^https?:\/\//.test(url)) {
        res.json({
            code: '-4',
            msg: 'url格式不正确'
        })
    }
    var reqData = {
        url: url,
        gzip: true
    };
    var data = [];
    request(reqData)
        .on('data', (trunk)=> {
            data.push(trunk);
        })
        .on('end', ()=> {
            var htmlData = parseMovieHtml(iconv.decode(Buffer.concat(data), 'gb2312'));
            res.json({
                code: '1',
                data: htmlData,
                msg: 'success'
            })
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
            var action = req.params.action;
            switch (action) {
                case 'art':
                    getArtControl.apply(this, arguments);
                    break;
                case 'pipe':
                    testPipe.apply(this, arguments);
                    break;
                case 'movie':
                    getMovieDetail.apply(this, arguments);
                    break;
                default:
                    next();

            }
        },
        put: function () {
            saveImg.apply(this, arguments);
        }
    }
};
