let SchemaType = require('../schemaType.js');
let errors = require('../error.js');

function SchemaNumber(key, options) {

}


/*!
 *
 */

SchemaNumber.prototype.constructor = SchemaNumber;


//校验计算
SchemaNumber.prototype.cast = function () {
    if( typeof this.value !== 'number'){
        return
    }
};

// 最小值
SchemaNumber.prototype.min = function () {


};


// 最大值
SchemaNumber.prototype.max = function () {


};

// 验证
SchemaNumber.prototype.valid = function (schema, data) {
    this.value = data;
    var valid_result = [];

    if (schema.min) {

    }

};


module.exports = exports = new SchemaNumber();