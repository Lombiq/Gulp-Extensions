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

function compileDir(source, destination) {
    destination = destination ? destination : source;

    // console.log(`Dest: ${destination}\nSource Path: ${source.path},\nSource Name: ${source.name}`)
    return gulp.src(source + '**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest(destination));

    //var copyAssets = function (assets, destination) {
    //    return all(assets.map((asset) => gulp.src(asset.path).pipe(gulp.dest(destination + '/' + asset.name))));
    //};
};

function clean(destination) {
    return async () => await del(destination + '**/*.js');
}

module.exports = { compile, clean, compileOne, compileDir };
