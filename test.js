var pinyin = require('pinyin');


var result = pinyin("中心");

console.dir(result[0][0].length);

var count = [];
for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
        count.push(result[i][j]);
    }
}

for (var i = 0; i < count.length; i++) {
    var word = count[i];

    for (var j = 0; j < word.length; j++) {
        
        console.log(word.charAt(j), word.charCodeAt(j));
    }

}

/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */ ! function (a, b, c, d) {
    var e = a(b);

    var _hasWebp = (function(){
        try{
            return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
        }catch(err) {
            return  false;
        }
    })();

    var webpSrc = function(url){
        if(_hasWebp){
            return url + ".webp";
        }else{
            return url;
        }
    };
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }
        var h, i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed &&
        (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container ===
        b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder),
                c.one("appear", function () {
                    if (!this.loaded) {
                        if (j.appear) {
                            var d = i.length;
                            j.appear.call(b, d, j)
                        }
                        var imgsrc = webpSrc(c.attr("data-" + j.data_attribute));
                        a("<img />").bind("load", function () {
                            var d = imgsrc;
                            c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](
                                j.effect_speed), b.loaded = !0;
                            var e = a.grep(i, function (a) {
                                return !a.loaded
                            });
                            if (i = a(e), j.load) {
                                var f = i.length;
                                j.load.call(b, f, j)
                            }
                        }).attr("src", imgsrc);
                    }
                }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() :
        a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left +
        a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset()
            .top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset()
            .left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function (b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);

(function($, window, document, undefined) {
    var $window = $(window);
    var _getQuerys = function (url, name) {
        var vars = {};
        var single = false;
        if (!name) {
            name = url;
            url = window.location.search;
            single = true;
        }
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = window.decodeURIComponent(value);
            });
        return single ? vars : vars[name];
    };

    var _isUrlLike = function (url) {
        return !/^#|javascript|tel|mailto/i.test(url);
    };

    var _fixHref = function (href, query_keys) {
        var hash = href.indexOf('#') ? href.split('#')[1] : '';
        var querys = href.indexOf('#') ? href.split('?')[1].replace('#' + hash, '') : '';
        var path = href.split('?')[0];

        if (typeof  query_keys == 'string') {

        }

        var tmpParam = [];
        var filters = Object.assign({}, filters || {});
        //href中存在，则替换， 不存在则添加,
        for (var key in filters) {
            var reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|$)");
            if (sSearch.match(reg)) {
                if ('' + filters[key]) {
                    sSearch = sSearch.replace(reg, '$1' + key + "=" + filters[key] + '$3');
                } else {
                    sSearch = sSearch.replace(reg, '$1');
                }
            } else {
                tmpParam.push(key + '=' + filters[key]);
            }
        }

        if (tmpParam.length && sSearch) {
            sMain += '?' + sSearch + '&' + tmpParam.join('&');
        } else if (sSearch) {
            sMain += '?' + sSearch
        } else if (tmpParam.length) {
            sMain += '?' + tmpParam.join('&')
        }
        var resUrl = sMain + (sHash ? '#' + sHash : '');
        return resUrl;


    };
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            skip_invisible  : true,
            appear          : null,
            querys          : null,
            filter          : null
        };

        function update() {
            var counter = 0;
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
        settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.on(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. 删除,这个地方对于修改A标签的href没必要*/
            // if ($self.attr("src") === undefined || $self.attr("src") === false) {
            //     if ($self.is("img")) {
            //         $self.attr("src", settings.placeholder);
            //     }
            // }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    //TODO:修改url
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.on(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.on("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.on("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
