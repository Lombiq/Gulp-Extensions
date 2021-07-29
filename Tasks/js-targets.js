const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');

function compile(source, destination, pipelineModifier) {
    const copyDestination = destination || source;
    const copySource = source.endsWith('/') ? source + '**/*.js' : source;

    let pipeline = gulp.src(copySource)
        .pipe(eslint())
        .pipe(eslint.format('tap'));

    if (typeof pipelineModifier === 'function') {
        pipeline = pipelineModifier(pipeline);
    }

    return pipeline.pipe(gulp.dest(copyDestination));
}

function clean(destination) {
    return () => del(destination + '**/*.js');
}

module.exports = { compile, clean };
