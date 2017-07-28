;
(function(global, $, Vue) {
    Vue.component('user-view', {
        template: '<div> \
            <table class="borded userinfo-table">\
            <tbody>\
                <tr class="info-item">\
                    <th></th>\
                    <th>内容</th>\
                </tr>\
                <tr class="info-item" v-for="item in items" >\
                    <td>{{item.title}}</td>\
                    <td>\
                        <span v-if="status" class="item-val">{{item.val}}</span> \
                        <input v-else class="item-val" type="text" v-model="item.val">\
                    </td>\
                </tr>\
                </tbody>\
            </table>\
            <div class="btn-group userinfo-tool">\
                <template v-if="status">\
                   <span class="btn btn-danger" v-on:click="changeModel">修改</span>\
                </template>\
                <template v-else>\
                    <span class="btn btn-green" v-on:click="saveInfo">保存</span>\
                    <span class="btn btn-danger" v-on:click="changeModel">取消</span>\
                </template>\
            </div>\
        </div>',
        props: ['items', 'status', 'saveInfo', 'changeModel']
    });
    var userInfo = new Vue({
        el:'#user',
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
        methods: {
            changeModel: function() {
                this.model = this.model == 'edit' ? 'display' : 'edit';
            },
            saveInfo: function() {
                alert('a')
            },
            cancle: function() {
                this.model = 'display';
            }
        },
        computed: {
            getStatus: function() {
                return this.model === 'display';
            }
        }
    });
})(window, jQuery, Vue)