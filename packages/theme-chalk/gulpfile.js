'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

gulp.task('compile', function() {
  return gulp
    .src('./src/*.scss') // src下所有scss目录
    .pipe(sass.sync()) // 同步编译scss
    .pipe(
      autoprefixer({
        browsers: ['ie > 9', 'last 2 versions'],
        cascade: false // 是否美化属性值
      })
    ) // autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用她我们可以很潇洒地写代码，不必考虑各浏览器兼容前缀
    .pipe(cssmin()) // css压缩
    .pipe(gulp.dest('./lib')); // 编译到当前目录下到lib文件夹
});

gulp.task('copyfont', function() {
  return gulp
    .src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts')); // 编译到当前目录下到lib/fonts字体文件夹
});

gulp.task('build', ['compile', 'copyfont']);
