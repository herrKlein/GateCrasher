var gulp = require('gulp'),
connect = require('gulp-connect'),
tsc = require('gulp-tsc');

var _appname = 'src';

gulp.task('compile', function(){
  gulp.src([_appname + '/**/*.ts'])
    .pipe(tsc({ sourcemap: true, target: 'ES5', out: 'app.js' }))
    .pipe(gulp.dest( _appname + '/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: _appname + '/',
    livereload: true
  });
});

gulp.task('default', ['compile', 'connect'], function(){
    gulp.watch(_appname + '/**/*.ts', ['compile']);
});

