var cnChar = /[\u4E00-\u9FFF]/; //中文
var regCN_EN_Num = /^([\w\d]|[\u4E00-\u9FFF])+$]/g;

;(function () {
    var root = this;
    var lodash = _ = {};
    var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    };
    var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
        reUnescapedHtml = /[&<>"']/g,
        reHasEscapedHtml = RegExp(reEscapedHtml.source),
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

    function basePropertyOf(object) {
        return function (key) {
            return object == null ? undefined : object[key];
        };
    }

    function escape(string) {
        return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
    }

    function unescape(string) {
        return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
    }

    _.escape = escape;
    _.unescape = unescape;
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root._ = _;
        define(function () {
            return _;
        });
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = _;
    } else {
        root._ = _;
    }
}.call(this));