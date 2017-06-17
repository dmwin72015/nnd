module.exports = {
    '/': function(req, res, next) {
        res.render('login',{titleName:'登录页'});
    },
    '/test': {
        all: function(req, res, next) {
            var query = req.query;
            console.log(query);
            if (query.a) {
                res.send('所有test下路径');
            } else {
                next();
            }
        }
    }
}
