var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

console.log('★★★★★★★★★★★★★★★★★★★★★★★★');
console.log('★★★★★★★★【APP start】★★★★★★★★★★');
console.log('★★★★★★★★★★★★★★★★★★★★★★★★\n');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public_new', 'favicon.ico')));

/******logger start **************************************/
//保存到文件中
require('./core/conf/log-conf')(app, path.join(__dirname, 'log'));
/******logger end *************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: 'dongmin-pc',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))


var tmplEng = require('./core/view_filter/filter.js');
app.engine('html', tmplEng);
app.set('view engine', 'html');
app.set('views', __dirname + '/core/views');

app.use(express.static(path.join(__dirname, 'public_new')));

//我自己加的一层，来自动填充路由
var loadRoute = require('./core/lib/loadRoute.js');

loadRoute(app, {
    base: path.join(__dirname, 'core/routes')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // if (req.originalUrl.match(/.*\.(js|css|jpg|gif|png)$/)) {
    //     // res.sendStatus(404).end('');
    //
    //     console.log(req.originalUrl,'-----404');
    //
    //     res.status(500).send('NOT FOUND');
    //
    // } else {
    //     res.render('40x', {
    //         title: err.status,
    //         message: '不好意思啊！！！404'
    //     });
    // }
    res.sendStatus(404);
    return;
    res.render('40x', {
        title: err.status,
        message: '不好意思啊！！！404'
    });
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     console.log('50000------')
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('40x', {
//         title: 500,
//         message: err.stack
//     });
// });

module.exports = app;
