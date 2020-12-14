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
const eslint = require('gulp-eslint');

sass.compiler = nodeSass;

function compile(source, destination) {
    destination = destination ? destination : source;

    return gulp.src(source + '**/*.js')
        .pipe(eslint({
            'rules': {
                'quotes': [1, 'single', { 'avoidEscape': true }]
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest(destination));
};

function clean(destination) {
    return async () => await del(destination + '**/*.js');
}

module.exports = { compile, clean };
