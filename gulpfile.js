var gulp = require('gulp');
var concat = require('gulp-concat');
var esnext = require('gulp-esnext');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('js', function() {
  return gulp.src(['src/app.js', 'src/**/*.module.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
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
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function() {
  return gulp.src([
      'bower_components/angular/angular.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['js']);