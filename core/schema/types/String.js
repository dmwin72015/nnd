var SchemaType = require('../schemaType.js');

function SchemaString(key, options) {
	this.enumValues = [];
	this.regExp = null;
	SchemaType.call(this, key, options, 'String');
}

SchemaString.schemaName = 'String';

/*!
 * 继承SchemaType
 */
SchemaString.prototype = Object.create(SchemaType.prototype);
SchemaString.prototype.constructor = SchemaString;


//校验计算
SchemaString.prototype.cast = function(first_argument) {

};

//枚举
SchemaString.prototype.enum = function() {

};

//转换小写
SchemaString.prototype.lowercase = function(shouldApply) {

};

//转换大写
SchemaString.prototype.uppercase = function(shouldApply) {

};

//去空格
SchemaString.prototype.trim = function(shouldTrim) {

};

//最小长度
SchemaString.prototype.minlength = function(value, message) {

};

//最大长度
SchemaString.prototype.maxlength = function(value, message) {

};

// 正则
SchemaString.prototype.match = function match(regExp, message) {

};

//检查是否必须字段
SchemaString.prototype.checkRequired = function checkRequired(value, doc) {
	if (SchemaType._isRef(this, value, doc, true)) {
		return !!value;
	}
	return (value instanceof String || typeof value === 'string') && value.length;
};