"use strict";

var gulp = require('gulp');
var gulpConnect = require('gulp-connect'); //Runs a local dev server
var browserSync = require('browser-sync').create(); // Local webserver to watch files
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var uglify = require('gulp-uglify'); //Minifies our JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var buffer = require('vinyl-buffer'); //To convert to buffer to user Browserify with Uglify
var concat = require('gulp-concat'); //Concatenate our files with Gulp
var eslint = require('gulp-eslint'); //Lints our JS
var imagemin = require('gulp-imagemin'); //Minifies our images
var pngquant = require('imagemin-pngquant'); //pngquant for image minification
var cache = require('gulp-cache'); //Cache our minified images
var postcss = require('gulp-postcss'); //Run rules over our CSS
var atImport = require("postcss-import") //Support PostCSS @import-style partials
var simpleVariables = require("postcss-simple-vars") //Support Sass-style variables
var autoprefixer = require('autoprefixer'); //Add prefixes to CSS for older browsers
var sourcemaps   = require('gulp-sourcemaps'); //Sourcemaps for tracking original line numbers etc
var stylelint = require("stylelint") //Linting for CSS
var mqpacker = require('css-mqpacker'); //Combine all matching media queries in CSS
var cssnano = require('cssnano'); //Minify and optimise CSS
var reporter = require('postcss-reporter'); //Formats and prints warnings from PostCSS plugins
var bemLinter = require('postcss-bem-linter'); //BEM linting for CSS

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

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
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
  browserify({
    entries: config.paths.mainJs,
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer()) //To work with Vinyl stream: https://wehavefaces.net/gulp-browserify-the-gulp-y-way-bb359b3f9623#.pi2bd7i1t
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()) // sourcemaps and uglify from https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
    .on('error', console.error.bind(console))
    .pipe(sourcemaps.write('./'))
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
    stylelint,
    bemLinter('bem'),
    atImport,
    simpleVariables,
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker,
    cssnano,
    reporter({clearMessages: true})
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
    .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
    })))
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
