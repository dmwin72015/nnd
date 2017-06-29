;
(function(global, $) {
    if (!$ && global.jQuery !== $) return;
    // oPicCode.onclick = function (ev) {
    //     this.src = '/captcha/new.gif?t=' + Date.now();
    // };
    Vue.component('mask-view', {
        template: '<div class="mask"></div>'
    });

    var regView = Vue.component('reg-view', {
        template: '<div v-bind:class="classObj">\
            <h3 class="box-head">\
                <span class="title">{{title}}</span>\
                <a href="javascript:;" class="close-regBox" v-on:click="hide">关闭按钮</a>\
            </h3>\
            <div class="box-body">\
                <div class="reg-view">\
                    <p><input type="text" name="reg_name"  v-bind:placeholder="tip_name" v-model="uname" v-on:keyup="valid"></p>\
                    <p><input type="text" name="reg_pwd"  v-bind:placeholder="tip_pwd" v-model="upwd1" v-on:keyup="valid"></p>\
                    <p><input type="text" name="reg_pwd"  v-bind:placeholder="tip_pwd2" v-model="upwd2" v-on:keyup="valid"></p>\
                    <p><input type="text" name="reg_picode"  v-bind:placeholder="tip_pcode" v-model="ucaptcha" v-on:keyup="valid"/><span class="pic-code"><img :src="tcha_url" :alt="tip_pcode"></span></p>\
                    <p><input type="button" value="确定" v-on:click="reg"></p>\
                </div>\
            </div>\
        </div>',
        props: [],
        data: function() {
            return {
                title: '注册',
                tip_name: '用户名(必须是邮箱)',
                tip_pwd: '密码(6-18位,必须包含字母、数字)',
                tip_pwd2: '确认密码',
                tip_pcode: '图片码',
                tcha_url: '/captcha/new.gif',
                classObj: {
                    'box': true,
                    'reg-box': true
                },
                uname: '',
                upwd1: '',
                upwd2: '',
                ucaptcha: ''
            }
        },
        methods: {
            hide: function() {
                mask.$data.reg = false;
            },
            reg: function() {
                var _data = this.$data;
                _data.uname = '张三'
            },
            valid: function() {
                console.log(this.$data);
            }
        },
        mounted: function(argument) {
            var dom = this.$el;
            var h = dom.offsetHeight;
            var H = window.innerHeight;
            if (h > window.innerHeight) {
                dom.style.marginTop = 0;
            } else {
                dom.style.marginTop = (H - h) / 2 + 'px';
            }
        }
    });

    var login = new Vue({
        el: '#myform',
        data: {
            uname: '',
            upwd: '',
            nameErr: {
                'status': false,
                'msg_1': '请输入用户名',
                'msg_2': '用户名是你的邮箱或手机号'
            },
            pwdErr: {
                'status': false,
                'msg_1': '请输入密码',
                'msg_2': '密码长度6-18'
            },
            errClass: {
                'error': true,
                'show': false
            },
            errMsg: ''
        },
        components: {
            'err-tip': {
                template: '<label>{{msg}}</label>',
                data: function() {
                    return {
                        //TODO:父级变量传递
                        msg: this.$parent.errMsg || ''
                    }
                }
            }
        },
        methods: {
            login: function(ev) {
                var _this = this;
                if (this.valid()) {
                    $.ajax({
                        url: '/user/login',
                        type: 'post',
                        data: {
                            uname: _this.uname,
                            upwd: _this.upwd
                        }
                    }).done(function(data, text, xhr) {
                        console.log(data);
                    })
                }
            },
            reg: function(ev) {
                mask.$mount('#mask');
                mask.$data.isShow = true;
                mask.$data.reg = true;
            },
            rmTip: function(type) {
                this.errMsg = '';
                if (type == 'name') {
                    this.nameErr.status = false;
                } else if (type == 'pwd') {
                    this.pwdErr.status = false;
                }
            },
            valid: function() {
                var uname = this.uname;
                var upwd = this.upwd;
                if (uname.length < 1) {
                    this.errMsg = this.nameErr.msg_1;
                    this.nameErr.status = true;
                    return false;
                }
                if (upwd.length < 1) {
                    this.errMsg = this.pwdErr.msg_1;
                    this.pwdErr.status = true;
                    return false;
                }
                if (upwd.length > 18 && upwd.length < 6) {
                    this.errMsg = this.pwdErr.msg_1;
                    this.pwdErr.status = true;
                    return false;
                }
                return true;
            }
        }
    });

    var mask = new Vue({
        data: {
            reg: false,
            isShow: false,
            isHide: true
        },
        created: function() {
            // console.log(this.$el);
            // this.$el.classList.remove('hide');
            // this.isHide = false;
        },
        'mounted': function() {
            console.log(this.$el.classList);
        },
        methods: {
            // TODO:淡入淡出效果
            leave: function() {
                // this.isShow = false;
            },
            afterLeave: function() {
                // this.$el.classList.add('hide');
                this.isShow = false;
            }
        }
    });
    global.login = login;
})(window, jQuery);