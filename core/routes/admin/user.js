/**
 * Created by dong on 2017/6/17.
 */

var userAll = function (req, res, next) {
    console.log(req.originalUrl);
    if(req.params.action == 'photo'){
        next();
        return;
    }
    res.render('user/index.html');
};


module.exports = {
    '/': userAll,

    '/:action': userAll
}