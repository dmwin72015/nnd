var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var tmplEng = require('./core/view_filter/filter.js');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dxirname, 'public', 'favicon.ico')));

/******logger start **************************************/
//保存到文件中
require('./core/conf/log-conf')(app, path.join(__dirname, 'log'));
/******logger end *************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public_new')));

app.engine('html', tmplEng);
app.set('view engine', 'html');
app.set('views', __dirname + '/core/views');

//我自己加的一层，来自动填充路由
var loadRoute = require('./core/lib/loadRoute.js');
loadRoute(app, {
    base: path.join(__dirname, 'core/routes')
});

app.locals.globalName = '就按技术监督局按进度';


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('40x', {
        title: err.status,
        message: '不好意思啊！！！404'
    });
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('40x', {
        title: 500,
        message: err.stack
    });
});

module.exports = app;
