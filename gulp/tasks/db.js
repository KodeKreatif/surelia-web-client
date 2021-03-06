'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var replace      = require("gulp-replace");
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');

gulp.task('db', function () {
  var db = process.env.DB || "test";
  var host = process.env.DB_HOST || "localhost";
  gulp.src(config.db.src)
    .pipe(replace("test", db))
    .pipe(replace("localhost", host))
    .pipe(gulp.dest(config.db.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
