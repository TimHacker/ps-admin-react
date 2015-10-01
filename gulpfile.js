"use strict";

var gulp = require('gulp');
var gulpConnect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser

var config = {
  port: 9005,
  developmentBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    dist: './dist'
  }
}

//Start a local development server
gulp.task('connect', function() {
  gulpConnect.server({
    root: ['dist'],
    port: config.port,
    base: config.developmentBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({ url: config.developmentBaseUrl + ':' + config.port + '/'}));
});


gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(gulpConnect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);