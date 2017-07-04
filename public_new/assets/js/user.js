;
(function(global, $, Vue) {
    var info_tmpl = {
        template: ' <table class="borded userinfo-table">\
            <tr class="info-item">\
                <th></th>\
                <th>内容</th>\
            </tr>\
            <tr v-if="getStatus" class="info-item" v-for="item in items" >\
                <td>{{item.title}}</td>\
                <td>\
                    <span v-if="getStatus" class="item-val">{{item.val}}</span> \
                </td>\
            </tr>\
            <tr v-else class="info-item" v-for="item in items" v-if="getStatus">\
                <td>{{item.title}}</td>\
                <td>\
                    <input v-else class="item-val" type="text" v-model="">\
                </td>\
            </tr>\
        </table>\
        <div class="btn-group userinfo-tool">\
            <span v-if="getStatus" class="btn btn-danger" v-on:click="changeModel">修改</span>\
            <span v-else class="btn btn-danger" v-on:click="saveInfo">保存</span>\
        </div>',
        props: ['items'],
        methods: {
            saveInfo: function() {

            },
            changeModel: function() {

            }
        }
    };
    var userInfo = new Vue({
        el: '#user',
        data: {
            model: 'display',
            items: [
                { title: 'ID', val: '' },
                { title: '姓名', val: '' },
                { title: '年龄', val: '' },
                { title: '性别', val: '' },
                { title: '昵称', val: '' },
                { title: '组', val: '' },
                { title: '注册时间', val: '' }
            ]
        },
        components: {
            'user-info': info_tmpl
        },
        methods: {
            changeModel: function() {
                this.model = this.model == 'edit' ? 'display' : 'edit';
            }
        },
        computed: {
            getStatus: function() {
                return this.model === 'display';
            }
        }
    });
})(window, jQuery, Vue)
