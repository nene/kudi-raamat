'use strict';
/* global require */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch('*.scss', ['sass']);
});
