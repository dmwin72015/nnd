;
(function (global, $) {
    if (!$ && global.jQuery !== $) return;
    // var doc = global.document;
    // var body = doc.querySelector('body');
    // var regBtn = doc.querySelector('#btn_reg');
    // regBtn.addEventListener('click', function () {
    //     var logBox = doc.querySelector('.login-box');
    //
    //     // logBox.classList.add('hidden');
    //
    //     var regBox = document.querySelector('.regi-box');
    //     regBox.classList.remove('hide');
    //
    // });
    //
    // var oRegBtn = doc.querySelector('#reg_enter');
    // var oPicCode = document.querySelector('.pic-code>img');
    // var url = '/captcha/valid/';
    //
    // $(oRegBtn).on('click', function () {
    //     $.ajax({
    //         url: url,
    //         type: 'get',
    //         data: {
    //             val: $('#reg_picCode').val()
    //         }
    //     }).done(function (data, text, xhr) {
    //         console.log(data);
    //     })
    // });
    // oPicCode.onclick = function (ev) {
    //     this.src = '/captcha/new.gif?t=' + Date.now();
    // };

    $('body').on('click','.close-regBox',function () {
        $(this).closest('.box').hide();
        $('.mask').hide();
    });
    
    var validForm = function () {


    };
    
    Vue.component('box',{
        template:''
    });

    new Vue({
        el:'#mask'
    })
})(window, jQuery);