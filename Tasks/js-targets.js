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

function clean(destination) {
    return () => del(destination + '**/*.js');
}

module.exports = { compile, clean };
