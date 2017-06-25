var fs = require('fs');
var morgan = require('morgan');
var fileStreamRotator = require('file-stream-rotator');
var path = require('path');

var formatLog = {
    'my': ':remote-addr >>>【:method - :date[dm] 】 :url | :status | :res[content-length] - | :response-time ms'
}


module.exports = function(app, logDir) {
    console.log('======================log setting=============\n');
    //判断路径时候存在，不存在创建
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    // create a rotating write stream
    var accessLogStream = fileStreamRotator.getStream({
        date_format: 'YYYY-MM-DD',
        filename: path.join(logDir, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: true
    });
    
    app.use(morgan(formatLog['my'], {
        stream: accessLogStream,
        // skip: function(req, res) {//过滤条件，状态吗《400
        //     return res.statusCode < 400;
        // }
    }));
    console.log('\n=================================================');
    return app;
}
