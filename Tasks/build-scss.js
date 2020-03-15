'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = nodeSass;

const defaultCompatibleBrowsers = ["last 1 Chrome version", "last 1 Edge version", "last 1 Firefox version", "last 1 IE version", "last 1 iOS version"];

const buildScss = function (source, destination, compatibleBrowsers) {
    compatibleBrowsers = compatibleBrowsers ? compatibleBrowsers : defaultCompatibleBrowsers;

    return gulp.src(source)
        .pipe(cache('scss'))
        .pipe(plumber())
        .pipe(sass({ linefeed: 'crlf' })).on('error', sass.logError)
        .pipe(postcss([autoprefixer({ overrideBrowserslist: compatibleBrowsers })]))
        .pipe(gulp.dest(destination))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(destination));
};

module.exports = buildScss;