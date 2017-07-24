;!function () {
    var status = 0;
    $('#get_art').on('click', function (ev) {
        var $that = $(this);
        if (status) {
            return
        }
        var artCont = document.querySelector('.art-content');
        $that.text('获取中...');
        status = 1;
        $.ajax({
            url: '/admin/spart/art',
            type: 'post',
            data: {url: $('#art_url').val()},
            success: function (data) {
                console.log(data);
                if (data && data.status == 1) {
                    var html = renderArtlist(data.data);
                    artCont.innerHTML = html;
                }
            }
        }).always(function () {
            status = 0;
            $that.text('获取');
        });
    });

    var sTmpl = '<li><a href="<%href%>" target="_blank"><%title%></a></li>';

    var renderArtlist = function (data) {
        "use strict";
        var sHtml = '<ul>';
        for (var i = 0; i < data.length; i++) {
            sHtml += sTmpl.replace(/<%href%>/g, data[i].href).replace(/<%title%>/g, data[i].title);
        }
        sHtml += '</ul>';
        return sHtml;
    };

    $('#get_btn').on('click', function () {
        "use strict";
        $.ajax({
            url: '/admin/spimg/img',
            type: 'post',
            data: {url: 'aaa'},
            success: function (data) {
                if (data.status != 1) {
                    return;
                }
                shwoImg(data.data);
            }
        });
    });

    var shwoImg = function (data) {
        "use strict";
        var sTmpl = '<li data-id="<%id%>"><i class="fa fa-file-image-o"></i><span><%src%></span></li>';
        var txt = {
            'p1': '小图',
            'p2': '中图',
            'p3': '大图',
            'p4': '超大'
        };
        if (!data) return;
        var sHtml = '<ul>';
        for (var i = 0; i < data.length; i++) {
            var _part = '<li data-id=' + data[i].id + '>';
            _part += '<i class="fa fa-file-image-o"></i><span>' + data[i].path + '</span>';
            _part += '<img src="' + data[i].path + '"/>  ';
            for (var j = 1; j < 5; j++) {
                _part += '<a target="_blank" href="' + (data[i].path) + '">' + txt['p' + j] + '</a>';
            }
            _part += '</li>';

            sHtml += _part;
        }
        sHtml += '</ul>';
        $('.img-list').html(sHtml);
    };

    $('#get_movie').click(function () {
        var url = $('#movie_url').val();
        url = 'http://www.dytt8.net/html/gndy/dyzz/20170723/54571.html';
        if (!url) {
            return;
        }
        $.ajax({
            url: '/admin/spart/movie',
            type: 'post',
            data: {url: url}
        }).done(function (body, text, xhr) {
            var html = body.data;
            var result = html.match(/◎译\s*名(.*?)◎/);

            console.log(result);

        }).fail(function (xhr) {

        })
    });
}();