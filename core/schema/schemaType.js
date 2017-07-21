const types = require('./types');
const err = require('../schema/error');


/**
 *    SchemaType constructor
 *    @param {String} path ，字段名称
 *    @param {Object} [options] ，选项
 *    @param {Object} [instance] ，实例
 *    @api public
 */
function SchemaType(schema, data) {

    this.validation = [];
    this.result = data || {};
    this.init(schema, data);

}

// 验证
SchemaType.prototype.init = function (schema, data) {
    var paths = schema.paths;
    var options = schema.options;
    var keys = Object.keys(paths);
    var result = this.result;

    for (var i = 0; i < keys.length; i++) {
        var curKey = keys[i];
        if (data[curKey] === void 0) {
            options.strict && (result[curKey] = null);
            break;
        } else {

            var curSaType = types['schema'+getSaType(schema[curKey].type)];

            if(curSaType){
                var _result = curSaType(schema[curKey] , data[curKey]);

                console.log(_result, '数据类型');

                if(_result.val){

                }
            }else{
                this.validation.push(err.UNKOWN_TYPE);
            }
        }
    }

    this.result = result;
};

function typeToStr(obj) {
    return Object.prototype.toString.call(obj || '').match(/\s(\w+)\]$/)[1];
}

function getSaType(fn) {
    if (typeof fn === 'string') {
        return fn;
    } else if (typeof fn === 'function') {
        if (fn.name) {
            return fn.name;
        }
        return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
    }
};
module.exports = SchemaType;

//TODO:[DONE]检查是否必须字段,放在schema里面检测了
// SchemaType.prototype.checkRequired = function (value) {
//     if (this.required) {
//
//     }
// };
//
//
// TODO:唯一主键
// SchemaType.prototype.unique = function () {
//
//
// };