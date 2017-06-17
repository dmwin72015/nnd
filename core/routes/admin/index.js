// admin 登录状态验证
var adminAll = function(req, res, next) {
    var method = req.method;
    var query = req.query;


    // console.log(req.originalUrl);

    if (query.a) {
        res.send(dataType(method, '所有admin下路径'));
    } else {
        next();
    }



};

function dataType(method, message) {
    var data = '';
    if (method.toLowerCase() == 'get') {
        data = '所有admin下路径'
    } else {
        data = {
            status: '1',
            data: [],
            message: '所有admin下路径'
        }
    }
    return data;
}

module.exports = {
    '/': adminAll,
    '*': {
        'all': adminAll
    }
}
