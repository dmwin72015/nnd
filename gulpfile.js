var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var wpConf = require('./conf/wp-conf');

var myPlug = require('./conf/mygulpPlugin.js');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var glob = require("glob")

gulp.task('default',function(){

    console.log(wpConf('dev'));

})

gulp.task('bulid:dev', function(callback) {
    webpack(wpConf('dev'), function(err, stats) {
        gutil.log("[bulid:dev]", stats.toString({
            colors: true
        }));
        callback();
    });


});

gulp.task('bulid:php', function(cb) {
    webpack(wpConf('php'), function(err, stats) {
        cb();
    });
});


var base = '/xin/project/www/trunk/application/views';
var entry = [base+'/assets_src/home.js.html'];
var dest = base+'/assets/';
var ignor = ['!(_search|_search_container|transfer|search).js.html'];

var all = ignor.concat(entry);

gulp.task('tt', function(cb) {
    gulp.src(all)
        .pipe(plumber())
        .pipe(myPlug.remove())
        .pipe(uglify())
        .pipe(myPlug.add())
        .pipe(gulp.dest(dest));
});

var entry2 = ['/xin/project/m/trunk/assets/js/src/fix_url_params.src.js'];
var dest2 = '/xin/project/m/trunk';
gulp.task('tm-js', function(cb) {
    gulp.src(entry2)
        .pipe(uglify())
        .pipe(gulp.dest(dest2));
});

var entry3 = ['/xin/project/www/trunk/assets/js/src/fix_url_params.src.js'];
var dest3 = '/xin/project/www/trunk/';
gulp.task('tw-js', function(cb) {
    gulp.src(entry3)
        .pipe(uglify())
        .pipe(gulp.dest(dest3));
});


// var watcher = gulp.watch(['./gulpfile.js'], ['bulid:dev']);
