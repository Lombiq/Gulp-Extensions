const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');

function compile(source, destination, pipelineModifier) {
    const copyDestination = destination || source;
    const sourceStream = gulp.src(source + '**/*.js')

    return compileStream(sourceStream, copyDestination, pipelineModifier);
}

function compileFile(sourceFile, destination, pipelineModifier) {
    const copyDestination = destination || sourceFile;
    const sourceStream = gulp.src(sourceFile)

    return compileStream(sourceStream, copyDestination, pipelineModifier);
}

function compileStream(sourceStream, destination, pipelineModifier) {
    let pipeline = sourceStream
        .pipe(eslint())
        .pipe(eslint.format('tap'));

    if (typeof pipelineModifier === 'function') {
        pipeline = pipelineModifier(pipeline);
    }

    return pipeline.pipe(gulp.dest(destination));
}

function clean(destination) {
    return () => del(destination + '**/*.js');
}

module.exports = { compile, compileFile, clean };
