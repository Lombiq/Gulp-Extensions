'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

function compile(source, destination) {
    const copyDestination = destination || source;

    return gulp.src(source + '**/*.js')
        .pipe(eslint())
        .pipe(eslint.format('tap'))
        .pipe(gulp.dest(copyDestination));
}

module.exports = { compile };
