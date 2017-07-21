
function test(req, res , next){
    var data = {
        id:Date.now(),
        title :'测试内容标题',
        subTitle:'子标题',
        author:'速冻',
        editor:'当前登录用户',
        createdDate:new Date(),
        htmlContent:'<div></div>',
        textContent:'adsa',
        source:'哈哈'
    };
}

module.exports = {
    // '*': {
    //     'all': testxx
    // },

    '/:action':{
    	get:test
    }
}
