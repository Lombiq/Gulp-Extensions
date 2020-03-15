'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

sass.compiler = nodeSass;

const buildScss = function (source, destination) {
    return gulp.src(source)
        .pipe(cache('scss'))
        .pipe(plumber())
        .pipe(sass({ linefeed: 'crlf' })).on('error', sass.logError)
        .pipe(gulp.dest(destination))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(destination));
};

module.exports = buildScss;