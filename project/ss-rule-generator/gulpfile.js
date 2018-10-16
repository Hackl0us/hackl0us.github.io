const gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify');

gulp.task('default', function () {
  gulp.start('minifycss');
});

// concat and compress css files
gulp.task('minifycss', function () {
  return gulp.src('./src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(notify({
      message: 'css task ok'
    }));
});