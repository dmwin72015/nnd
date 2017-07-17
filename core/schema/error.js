/**
 * Created by mjj on 2017/7/17.
 */

function Error() {

}


Error.prototype.typeErr = function (path, currV, shuldV) {
    return '[' + path + '] correct type is' + shuldV + ', current type is ' + currV;
};


Error.prototype.enumErr = function (path, currV, shuldV) {
    return '[' + path + '] correct value is in [' + shuldV.toString() + '], current type is ' + currV;
};


Error.prototype.requireErr = function (path) {
    return {
        code:-200,
        msg:`lost path [${path}] but must be require`
    }
};



module.exports = exports = new Error();