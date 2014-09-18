var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var esnext = require('gulp-esnext');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var express = require('express');
var templates = require('gulp-angular-templatecache');

var paths = {
  scripts:    'src/js/**/*.js',
  templates:  'src/js/**/templates/*.html',
  styles:     'src/less/**/*.less'
};

function handleError(error) {
  gutil.beep();
  gutil.log(error);
  this.emit('end');
}

gulp.task('scripts', function() {
  return gulp.src(['src/js/vendor/**/*.js', 'src/js/app.js', 'src/js/**/*-module.js', paths.scripts])
    .pipe(sourcemaps.init())
    .pipe(esnext({
      arrowFunction:      true,
      class:              false,
      defaultParams:      false,
      generator:          false,
      rest:               false,
      spread:             false,
      templates:          true,
      includeRuntime:     false,
      arrayComprehensions: false
    }))
    .on('error', handleError)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(templates({
      module: 'app.templates',
      standalone: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function() {
  return gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/lodash/dist/lodash.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleError)
    .pipe(prefix())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('serve', function() {
  var app = express();

  app.use(express.static('.'));

  app.listen(3000);
});

gulp.task('build', ['vendor', 'scripts', 'templates', 'styles']);

gulp.task('default', ['lint', 'build', 'serve', 'watch']);