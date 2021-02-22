'use strict';

const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');

function compile(source, destination) {
    const copyDestination = destination || source;

    return gulp.src(source + '**/*.js')
        .pipe(eslint())
        .pipe(eslint.format('tap'))
        .pipe(gulp.dest(copyDestination));
}

async function clean(destination) {
    const cleanFunc = await del(destination + '**/*.js');
    return cleanFunc;
}

module.exports = { compile, clean };
