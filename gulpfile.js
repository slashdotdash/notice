var gulp = require('gulp'),
    concat = require('gulp-concat'),
    esnext = require('gulp-esnext'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp.src(['src/app.js', 'src/**/module.js', 'src/**/*.js'])
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

gulp.task('watch', ['js'], function () {
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['js']);