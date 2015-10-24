"use strict";

var gulp = require('gulp');
var gulpConnect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Use conventional text streams with Gulp
var eslint = require('gulp-eslint'); // Lints our JS
var imagemin = require('gulp-imagemin'); //Minifies our images
var pngquant = require('imagemin-pngquant'); //pngquant for image minification
var postcss = require('gulp-postcss'); //Run rules over our CSS
var autoprefixer = require('autoprefixer'); //Add prefixes to CSS for older browsers
var sourcemaps   = require('gulp-sourcemaps'); //Sourcemaps for tracking original line numbers etc
var stylelint = require("stylelint") //Linting for CSS
var mqpacker = require('css-mqpacker'); //Combine all matching media queries in CSS
var cssnano = require('cssnano'); //Minify and optimise CSS

var config = {
  port: 9005,
  developmentBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: ['./src/**/*.+(js|jsx)'],
    images: './src/images/*',
    css: [
      './src/**/*.css'
    ],
    vendorCss: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.jsx'
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
    .pipe(open({ uri: config.developmentBaseUrl + ':' + config.port + '/'}));
});


gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(gulpConnect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(gulpConnect.reload());
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(eslint({config: 'eslint.config.json'}))
    .pipe(eslint.format());
});

gulp.task('library-css', function() {
  gulp.src(config.paths.vendorCss)
    .pipe(concat('library-bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    stylelint,
    mqpacker,
    cssnano
  ];

  gulp.src(config.paths.css)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(gulpConnect.reload());
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
    }))
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(gulpConnect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
})

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'lint', 'css', 'library-css', 'images', 'open', 'watch']);
