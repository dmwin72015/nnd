var path = require('path');
var webpack = require('webpack');
var moment = require('moment');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var libfiles = glob.sync(path.join(__dirname, 'appSrc/lib/*.js'));
var rootPath = '/xin/project/note.yonglinchen.com/static';

//文件入口
var entry = function(env) {
    return {
        lib: ['./appSrc/lib/lib.js', './appSrc/lib/keycode.js', './appSrc/lib/cornify.js','./appSrc/lib/jQuery-3.1.1.min.js','lodash'],
        login: ['./appSrc/login/login.js'],
        dashboard: ['./appSrc/login/dashboard.js'],
        vote: ['./appSrc/less/toupiao.css', './appSrc/less/common.less'],
        spider:['./appSrc/less/spider.less','./appSrc/login/spider.js'],
        'sp-art':['./appSrc/login/sp_art.js']
        // libcss:['./appSrc/css/font-awesome.min.css']
    };
};


//文件出口
var output = function(env) {
    var _outout = {};
    if (env == 'php') {
        var rootPath = '/xin/project/note.yonglinchen.com/static';
    } else if (env == 'dev') {
        var rootPath = path.resolve(__dirname, '../public_new/static');
    }
    var baseJsPath = path.join(rootPath, 'js');
    var baseCssPath = path.join(rootPath, 'css');
    var baseImgPath = path.join(rootPath, 'img');
    var baseMapPath = path.join(rootPath, 'maps');
    _outout =  {
        path: rootPath,
        filename: 'js/[name].bundle.js'
    };
    if(env =='dev'){
        _outout['sourceMapFilename'] = "maps/[file].map";
    }
    return _outout;
};

//TODO: 别名
var alias = function(env) {
    return [];
};

//加载器
var loaders = function(env) {
    return [{
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'less-loader']
        })
    }, {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader?limit=8192&name=img/[name].[ext]'
    }]
};
//插件
var plugins = function(env) {
    var _tmp = [
        new webpack.optimize.CommonsChunkPlugin({
            names:['lib'],
            filename: 'js/[name].js',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            filename: 'js/[name].js',
            minChunks: 2
        }),
        new ExtractTextPlugin('css/tp-[name].css'),
    ];
    if (env == 'pro') { //生产压缩
        _tmp.concat([
            new webpack.optimize.UglifyJsPlugin({
                comoressor: {
                    warnings: true
                }
            })
        ]);
    } else if (env == 'dev') { //开发，增加MAP文件
        _tmp.concat([
            new webpack.BannerPlugin(moment().format('YYYY-MM-DD HH:mm:ss') + '-This file is created by 董敏'),
            new webpack.SourceMapDevToolPlugin({
                filename: "maps/[file].map"
            })
        ]);
    }
    return _tmp;
};

module.exports = function(env) {
    return {
        entry: entry(env),
        output: output(env),
        module: {
            rules: loaders(env)
        },
        stats: {
            colors: true
        },
        devtool: env == 'dev' ? 'source-map' : '',
        plugins: plugins(env)
        //, devServer: {
        //     inline: true,
        // }
    };
};
