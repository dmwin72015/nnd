// var pinyin = require('pinyin');
//
//
// var result = pinyin("中心");
//
// console.dir(result[0][0].length);
//
// var count = [];
// for (var i = 0; i < result.length; i++) {
//     for (var j = 0; j < result[i].length; j++) {
//         count.push(result[i][j]);
//     }
// }
//
// for (var i = 0; i < count.length; i++) {
//     var word = count[i];
//
//     for (var j = 0; j < word.length; j++) {
//
//         console.log(word.charAt(j), word.charCodeAt(j));
//     }
//
// }
// (function($, window,undefined) {
//     var $window = $(window);
//     var _getQuerys = function (url, name) {
//         var vars = {};
//         var single = false;
//         if (!name) {
//             name = url;
//             url = window.location.search;
//             single = true;
//         }
//         var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
//             function (m, key, value) {
//                 vars[key] = window.decodeURIComponent(value);
//             });
//         return single ? vars : vars[name];
//     };
//
//     var _isUrlLike = function (url) {
//         return !/^#|javascript|tel|mailto/i.test(url);
//     };
//
//     var _fixHref = function (href, query_keys) {
//         var hash = href.indexOf('#') ? href.split('#')[1] : '';
//         var querys = href.indexOf('#') ? href.split('?')[1].replace('#' + hash, '') : '';
//         var path = href.split('?')[0];
//
//         if (typeof  query_keys == 'string') {
//
//         }
//
//         var tmpParam = [];
//         var filters = Object.assign({}, filters || {});
//         //href中存在，则替换， 不存在则添加,
//         for (var key in filters) {
//             var reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|$)");
//             if (sSearch.match(reg)) {
//                 if ('' + filters[key]) {
//                     sSearch = sSearch.replace(reg, '$1' + key + "=" + filters[key] + '$3');
//                 } else {
//                     sSearch = sSearch.replace(reg, '$1');
//                 }
//             } else {
//                 tmpParam.push(key + '=' + filters[key]);
//             }
//         }
//
//         if (tmpParam.length && sSearch) {
//             sMain += '?' + sSearch + '&' + tmpParam.join('&');
//         } else if (sSearch) {
//             sMain += '?' + sSearch
//         } else if (tmpParam.length) {
//             sMain += '?' + tmpParam.join('&')
//         }
//         var resUrl = sMain + (sHash ? '#' + sHash : '');
//         return resUrl;
//
//
//     };
//     $.fn.lazyload = function(options) {
//         var elements = this;
//         var $container;
//         var settings = {
//             threshold       : 0,
//             failure_limit   : 0,
//             event           : "scroll",
//             effect          : "show",
//             container       : window,
//             skip_invisible  : true,
//             appear          : null,
//             querys          : null,
//             filter          : null
//         };
//
//         function update() {
//             var counter = 0;
//             elements.each(function() {
//                 var $this = $(this);
//                 if (settings.skip_invisible && !$this.is(":visible")) {
//                     return;
//                 }
//                 if ($.abovethetop(this, settings) ||
//                     $.leftofbegin(this, settings)) {
//                     /* Nothing. */
//                 } else if (!$.belowthefold(this, settings) &&
//                     !$.rightoffold(this, settings)) {
//                     $this.trigger("appear");
//                     /* if we found an image we'll load, reset the counter */
//                     counter = 0;
//                 } else {
//                     if (++counter > settings.failure_limit) {
//                         return false;
//                     }
//                 }
//             });
//
//         }
//
//         if(options) {
//             /* Maintain BC for a couple of versions. */
//             if (undefined !== options.failurelimit) {
//                 options.failure_limit = options.failurelimit;
//                 delete options.failurelimit;
//             }
//             if (undefined !== options.effectspeed) {
//                 options.effect_speed = options.effectspeed;
//                 delete options.effectspeed;
//             }
//
//             $.extend(settings, options);
//         }
//
//         /* Cache container as jQuery as object. */
//         $container = (settings.container === undefined ||
//         settings.container === window) ? $window : $(settings.container);
//
//         /* Fire one scroll event per scroll. Not one scroll event per image. */
//         if (0 === settings.event.indexOf("scroll")) {
//             $container.on(settings.event, function() {
//                 return update();
//             });
//         }
//
//         this.each(function() {
//             var self = this;
//             var $self = $(self);
//
//             self.loaded = false;
//
//             /* If no src attribute given use data:uri. 删除,这个地方对于修改A标签的href没必要*/
//             // if ($self.attr("src") === undefined || $self.attr("src") === false) {
//             //     if ($self.is("img")) {
//             //         $self.attr("src", settings.placeholder);
//             //     }
//             // }
//
//             /* When appear is triggered load original image. */
//             $self.one("appear", function() {
//                 if (!this.loaded) {
//                     //TODO:修改url
//                 }
//             });
//
//             /* When wanted event is triggered load original image */
//             /* by triggering appear.                              */
//             if (0 !== settings.event.indexOf("scroll")) {
//                 $self.on(settings.event, function() {
//                     if (!self.loaded) {
//                         $self.trigger("appear");
//                     }
//                 });
//             }
//         });
//
//         /* Check if something appears when window is resized. */
//         $window.on("resize", function() {
//             update();
//         });
//
//         /* With IOS5 force loading images when navigating with back button. */
//         /* Non optimal workaround. */
//         if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
//             $window.on("pageshow", function(event) {
//                 if (event.originalEvent && event.originalEvent.persisted) {
//                     elements.each(function() {
//                         $(this).trigger("appear");
//                     });
//                 }
//             });
//         }
//
//         /* Force initial check if images should appear. */
//         $(document).ready(function() {
//             update();
//         });
//
//         return this;
//     };
//
//     /* Convenience methods in jQuery namespace.           */
//     /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
//
//     $.belowthefold = function(element, settings) {
//         var fold;
//
//         if (settings.container === undefined || settings.container === window) {
//             fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
//         } else {
//             fold = $(settings.container).offset().top + $(settings.container).height();
//         }
//
//         return fold <= $(element).offset().top - settings.threshold;
//     };
//
//     $.rightoffold = function(element, settings) {
//         var fold;
//
//         if (settings.container === undefined || settings.container === window) {
//             fold = $window.width() + $window.scrollLeft();
//         } else {
//             fold = $(settings.container).offset().left + $(settings.container).width();
//         }
//
//         return fold <= $(element).offset().left - settings.threshold;
//     };
//
//     $.abovethetop = function(element, settings) {
//         var fold;
//
//         if (settings.container === undefined || settings.container === window) {
//             fold = $window.scrollTop();
//         } else {
//             fold = $(settings.container).offset().top;
//         }
//
//         return fold >= $(element).offset().top + settings.threshold  + $(element).height();
//     };
//
//     $.leftofbegin = function(element, settings) {
//         var fold;
//
//         if (settings.container === undefined || settings.container === window) {
//             fold = $window.scrollLeft();
//         } else {
//             fold = $(settings.container).offset().left;
//         }
//
//         return fold >= $(element).offset().left + settings.threshold + $(element).width();
//     };
//
//     $.inviewport = function(element, settings) {
//         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
//             !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
//     };
//
//     /* Custom selectors for your convenience.   */
//     /* Use as $("img:below-the-fold").something() or */
//     /* $("img").filter(":below-the-fold").something() which is faster */
//
//     $.extend($.expr[":"], {
//         "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
//         "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
//         "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
//         "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
//         "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
//         /* Maintain BC for couple of versions. */
//         "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
//         "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
//         "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
//     });
//
// });
// var cnChar = /[\u4E00-\u9FFF]/; //中文
// var regCN_EN_Num = /^([\w\d]|[\u4E00-\u9FFF])+$]/g;
//
// ;(function () {
//     var root = this;
//     var lodash = _ = {};
//     var htmlUnescapes = {
//         '&amp;': '&',
//         '&lt;': '<',
//         '&gt;': '>',
//         '&quot;': '"',
//         '&#39;': "'"
//     };
//     var htmlEscapes = {
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;',
//         '"': '&quot;',
//         "'": '&#39;'
//     };
//
//     var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
//         reUnescapedHtml = /[&<>"']/g,
//         reHasEscapedHtml = RegExp(reEscapedHtml.source),
//         reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
//
//     var escapeHtmlChar = basePropertyOf(htmlEscapes);
//     var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
//
//     function basePropertyOf(object) {
//         return function (key) {
//             return object == null ? undefined : object[key];
//         };
//     }
//
//     function escape(string) {
//         return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
//     }
//
//     function unescape(string) {
//         return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
//     }
//
//     _.escape = escape;
//     _.unescape = unescape;
//     if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
//         root._ = _;
//         define(function () {
//             return _;
//         });
//     } else if (typeof exports === 'object' && typeof module !== 'undefined') {
//         module.exports = _;
//     } else {
//         root._ = _;
//     }
// }.call(this));
//
//
// class Father{
//
//     // 目前无此语法
//     // status = {
//     //     count : 1
//     // }
//
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }
//
// class Son extends Father{
//     constructor(x, y, color) {
//         super(x, y); // 调用父类的constructor(x, y)
//         this.color = color;
//     }
// };
//
//
// var son1 = new Son('张三',20,'#123');
//
// console.dir(son1);

// Symbol 类型(新增的类型), 前六: undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）
// 总是返回一个新的symbol, 唯一的,可作为属性来使用, 以前只能是字符串.

var size = Symbol('size');

class Collection{
    constructor(){
       this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        (this[size])++ ;
    }

    static sizeOf(instance){
        return instance[size];
    }
}

var x = new Collection();

console.log( Collection.sizeOf(x) );

x.add('apple');

console.log( Collection.sizeOf(x) );

