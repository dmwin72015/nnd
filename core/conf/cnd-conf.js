/**
 * Created by dong on 2017/6/17.
 */
const os = require('os');

const Mac = {
    "base": '/xin/static_source',
    'imgs': '/xin/static_source/imgs/',
    'css': '',
    'js': '',
    'cdn_base': 'E:\\html',
    'cdn_ings': ''
};

const win7 = {
    "base": 'E:\\html',
    'imgs': 'E:\\html\\imgs',
    'css': 'E:\\html\\css',
    'js': 'E:\\html\\js',
    'cdn_base':'//cdn.static.cc',
    'cdn_imgs': '//cdn.static.cc/imgs',
    'cdn_css': '//cdn.static.cc/css',
    'cdn_js': '//cdn.static.cc/js',
};

if (os.platform() == 'win32') {
    module.exports = win7;
} else {
    module.exports = Mac;
}
