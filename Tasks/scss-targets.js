'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const del = require('del');

sass.compiler = nodeSass;

const defaultCompatibleBrowsers = ['last 1 Chrome version', 'last 1 Edge version', 'last 1 Firefox version', 'last 1 IE version', 'last 1 iOS version'];

function compile(source, destination, compatibleBrowsers) {
    destination = destination ? destination : source;
    compatibleBrowsers = compatibleBrowsers ? compatibleBrowsers : defaultCompatibleBrowsers;

    return gulp.src(source + '**/*.scss')
        .pipe(cache('scss'))
        .pipe(plumber())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ linefeed: 'crlf' })).on('error', sass.logError)
        .pipe(postcss([autoprefixer({ overrideBrowserslist: compatibleBrowsers })]))
        .pipe(sourcemaps.write('.', { includeContent: true }))
        .pipe(gulp.dest(destination));
};

function minify(destination) {
    return gulp.src([destination + '**/*.css', '!' + destination + '**/*.min.css'])
        .pipe(cache('css'))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(destination));
};

function clean(destination) {
    return async () => await del([destination + '**/*.css', destination + '**/*.css.map']);
}

function build(source, destination, compatibleBrowsers) {
    destination = destination ? destination : source;
    compatibleBrowsers = compatibleBrowsers ? compatibleBrowsers : defaultCompatibleBrowsers;

    return gulp.series(
        async () => await new Promise((resolve) => compile(source, destination, compatibleBrowsers).on('end', resolve)),
        async () => await new Promise((resolve) => minify(destination).on('end', resolve)));
};

module.exports = { build, compile, minify, clean };