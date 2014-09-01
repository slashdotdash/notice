var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var esnext = require('gulp-esnext');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

var paths = {
  scripts: 'src/js/**/*.js',
  styles:  'src/less/**/*.less'
};

function handleError(error) {
  gutil.beep();
  gutil.log(error);
  this.emit('end');
}

gulp.task('js', function() {
  return gulp.src(['src/js/app.js', 'src/js/**/*.module.js', paths.scripts])
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
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function() {
  return gulp.src([
      'bower_components/angular/angular.js'
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

gulp.task('less', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleError)
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('default', ['lint', 'vendor', 'js']);