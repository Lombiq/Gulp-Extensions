'use strict';

const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const { src } = require('gulp');

function compile(source, destination) {
    destination = destination ? destination : source;

    return gulp.src(source + '**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest(destination));
};

function compileOne(source, destination) {
    destination = destination ? destination : source;

    return gulp.src(source)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest(destination));
};

function clean(destination) {
    return async () => await del(destination + '**/*.js');
}

module.exports = { compile, clean, compileOne };
