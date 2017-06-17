var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = 'gulp-prefixer';

// 插件级别的函数（处理文件）
function gulpPrefixer(pre , after) {
  pre = new Buffer(pre || '<script>{literal}'); // 提前分配
  after = new Buffer(after ||  '{/literal}</script>')
  // 创建一个 stream 通道，以让每个文件通过
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([pre, file.contents , after]);
    }

    // 确保文件进入下一个 gulp 插件
    this.push(file);

    // 告诉 stream 引擎，我们已经处理完了这个文件
    cb();
  });

  // 返回文件 stream
  return stream;
};

function gulpRemoveTag(){
    var stream = through.obj(function(file, enc, cb) {
      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        return cb();
      }

      if (file.isBuffer()) {
          var str_content = file.contents.toString();
          str_content = str_content.replace(/<script[^>]*>/g , '')
                                    .replace(/<\/script>/g,'')
                                    .replace(/\{literal\}/g,'')
                                    .replace(/\{\/literal\}/g,'')
                                    .replace(/\{\*.*\*\}/g,'');
        //   console.log(str_content);
          file.contents = new Buffer(str_content);

        //   file.contents = Buffer.concat([pre, file.contents , after]);
      }

      // 确保文件进入下一个 gulp 插件
      this.push(file);

      // 告诉 stream 引擎，我们已经处理完了这个文件
      cb();
    });

    // 返回文件 stream
    return stream;
}

function filter(files){


}
// 导出插件主函数
exports.add = gulpPrefixer;
exports.remove = gulpRemoveTag;
exports.filter = filter;
