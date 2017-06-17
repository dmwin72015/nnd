##关于CMD、AMD总是记不住。这次强化一下记忆
>首先要提的就是ComminJS的规范，为了JS的模块化，而应用而生的规范
CommonJS定义的模块分为:
    {模块引用(require)}
    {模块定义(exports)}
    {模块标识(module)}
代码机构类似于下面：
```javascript
1 //sum.js
2 exports.sum = function(){...做加操作..};
3
4 //calculate.js
5 var math = require('sum');
6 exports.add = function(n){
7     return math.sum(val,n);
8 };
```
当然node是遵循commonJS的规范,本来就是为了给后台JS定的规范。

>####AMD 规范 （Asynchronous Module Definition)
字面理解就是异步加载模块，requireJS应用这个规范。
大体格式如下：
```javascript
require(id,[依赖module], callback);
```
id 依赖module 都是可选的。

>####CMD 规范（Common Module Definition）
这个是seajs推崇的规范，
大体格式如下：
```javascript
define(function(require, exports, module) {
   var clock = require('clock');
   clock.start();
});
```

AMD与CMD的明显区别就在于，依赖引用，
AMD 推荐在声明之前就把所有依赖添加进来，
CMD 则是推荐在需要时在引过来。但是这里是预先下载，延迟执行。也就是说文件是提前下载进来了，只有在require的时候执行。
AMD -> 前置依赖
CMD -> 就近依赖
