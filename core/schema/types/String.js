let SchemaType = require('../schemaType.js');
let errors = require('../error.js');

function SchemaString(key, options) {
    this.regExp = null;
    this.path = options.key;
    this.value = options.value;
    this.enumValues = options.enum || [];
}


/*!
 * 
 */

SchemaString.prototype.constructor = SchemaString;


//校验计算
SchemaString.prototype.cast = function (first_argument) {

};

//枚举
SchemaString.prototype.enum = function () {

};

//转换小写
SchemaString.prototype.lowercase = function (shouldApply) {

};

//转换大写
SchemaString.prototype.uppercase = function (shouldApply) {

};

//去空格
SchemaString.prototype.trim = function (shouldTrim) {

};

//最小长度
SchemaString.prototype.minlength = function (value, message) {

};

//最大长度
SchemaString.prototype.maxlength = function (value, message) {

};

// 正则
SchemaString.prototype.match = function (regExp, message) {


};

// 验证
SchemaString.prototype.valid = function (schema, data) {


};


module.exports = exports = new SchemaString();