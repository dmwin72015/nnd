;
(function(global, $, Vue) {
    var info_tmpl = {
        template: ' \
        <table class="borded userinfo-table">\
        <tbody>\
            <tr class="info-item">\
                <th></th>\
                <th>内容</th>\
            </tr>\
            <tr class="info-item" v-for="item in items" >\
                <td>{{item.title}}</td>\
                <td>\
                    <span v-if="getStatus" class="item-val">{{item.val}}</span> \
                    <input v-else class="item-val" type="text" v-model="item.val">\
                </td>\
            </tr>\
            </tbody>\
        </table>',
        props: ['items' ,'getStatus'],
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
            infoItems: [
                { title: 'ID', val: '测试' },
                { title: '姓名', val: '测试' },
                { title: '年龄', val: '测试' },
                { title: '性别', val: '测试' },
                { title: '昵称', val: '测试' },
                { title: '组', val: '测试' },
                { title: '注册时间', val: '测试' }
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
