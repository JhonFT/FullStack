const gulp = require('gulp');
const stylus = require('gulp-stylus');
const notify = require('gulp-notify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

const path = {
  entry: {
    styl: './app/public/styl/*.styl',
    js: './app/public/js/app.js',
  },
  output: {
    styl: './app/public/css',
    js: './app/public/des',
  },
};

gulp.task('stylus', function () {
  return gulp.src(path.entry.styl)
    .pipe(stylus())
    .pipe(gulp.dest(path.output.styl))
    .pipe(notify('Stylus se compilo correctamente!'));
});

gulp.task('build', function () {
  return browserify({ entries: path.entry.js, debug: true })
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.output.js))
        .pipe(livereload())
        .pipe(notify('JS se compilo correctamente!'));
});


gulp.task('watchJS', ['build'], function () {
  livereload.listen();
  gulp.watch('./src/js/*.js', ['build']);
});

gulp.task('watch', function () {
  gulp.watch(path.entry.styl, ['stylus']);
});

gulp.task('default', ['watch']);
