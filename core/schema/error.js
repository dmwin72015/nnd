/**
 * Created by mjj on 2017/7/17.
 */

function Error() {

}

const REQUIRE_PATH_ERR = '-101';        //缺少必须字段
const OUT_ENUM_ERR = '-102';            //不在枚举范围内
const TYPE_ERR = '-103';                //数据类型错误


Error.prototype.typeErr = function (path, currV, shuldV) {
    return {
        code: TYPE_ERR,
        msg: '[' + path + '] correct type is' + shuldV + ', current type is ' + currV
    }
};


Error.prototype.enumErr = function (path, currV, shuldV) {
    return {
        code: OUT_ENUM_ERR,
        msg: '[' + path + '] correct value is in [' + shuldV.toString() + '], current type is ' + currV
    }
};


Error.prototype.requireErr = function (path) {
    return {
        code: REQUIRE_PATH_ERR,
        msg: `lost path [${path}], but must be required`
    }
};


module.exports = exports = new Error();

exports.UNKOWN_TYPE = {
    code:'-200',
    msg:'数据类型未知'
};