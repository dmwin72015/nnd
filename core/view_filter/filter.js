var dust = require('dustjs-linkedin');
var cons = require('consolidate');

// 自定义的filter
dust.filters.unicorn = function(value) {
    if (typeof value === 'string') {
        return value.replace('unicorn', 'horse');
    }
    return value;
};

dust.config.whitespace = true;

console.log('************模板设置*****************');
console.log(JSON.stringify(dust.config) );
console.log('*************************************');
module.exports = cons.dust;
