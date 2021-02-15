/* eslint-disable */
'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

function compile(source, destination) {
    destination = destination ? destination : source;

    return gulp.src(source + '**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulp.dest(destination));
};

module.exports = { compile };
