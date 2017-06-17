/**
 * Created by dong on 2017/6/17.
 */
module.exports.info = function (title, content) {
    "use strict";
    console.log('*********' + (title || '') + '*********');
    console.log(content);
    console.log('*********' + (title || '') + '*********');
};