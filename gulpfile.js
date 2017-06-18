var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var path = require('path');

var tsProject = ts.createProject('tsconfig.json');

var DEST = 'dist';

gulp.task('clean', () => del([DEST]));

gulp.task('graphql', () => {
  var src = path.resolve('src', 'graphql/schemas/*.graphql');
  var dest = path.resolve(DEST, 'graphql/schemas/');
  del.sync(dest);
  return gulp.src([src]).pipe(gulp.dest(dest));
});

gulp.task('compile', ['graphql'], () => {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST));
});

gulp.task('watch', ['compile'], () => {
  return nodemon({
    env: {
      NODE_ENV: 'development',
      DEBUG: 'codebee:*'
    },
    script: path.resolve(DEST, 'server.js'),
    tasks: ['compile'],
    ext: 'ts graphql',
    watch: 'src'
  });
});

gulp.task('compile:watch', ['compile'], () => {
  gulp.watch('src/**/*', ['compile']);
});

gulp.task('default', ['watch']);
