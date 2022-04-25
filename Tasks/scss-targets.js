const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const del = require('del');
const stylelint = require('gulp-stylelint');
const process = require('process');
const through = require('through2');

const defaultCompatibleBrowsers = [
    'last 1 Chrome version',
    'last 1 Edge version',
    'last 1 Firefox version',
    'last 1 IE version',
    'last 1 iOS version'];

function normalizeSourceMap() {
    function normalize(buffer) {
        let mapping = null;
        try {
            mapping = JSON.parse(buffer.contents.toString());
        }
        catch (_) {
            return buffer; // If it's not a JSON file, move on.
        }

        if (Array.isArray(mapping.sourcesContent) && mapping.sourcesContent.length > 0) {
            for (let index = 0; index < mapping.sourcesContent.length; index++) {
                mapping.sourcesContent[index] = mapping.sourcesContent[index].replace(/\r\n/g, '\n');
            }

            const stringContents = JSON.stringify(mapping);
            buffer.contents = Buffer.alloc(stringContents.length, stringContents);
        }

        return buffer;
    }

    return through.obj((file, _, callback) => callback(null, normalize(file)));
}

function compile(source, destination, compatibleBrowsers) {
    const compileDestination = destination || source;
    const compileCompatibleBrowsers = compatibleBrowsers || defaultCompatibleBrowsers;

    return gulp.src(source + '**/*.scss')
        .pipe(cache('scss'))
        .pipe(plumber())
        .pipe(stylelint({
            reporters: [
                { formatter: 'verbose', console: true },
            ],
        }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ linefeed: process.platform === 'win32' ? 'crlf' : 'lf' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ overrideBrowserslist: compileCompatibleBrowsers })]))
        .pipe(sourcemaps.write('.', { includeContent: true }))
        .pipe(normalizeSourceMap())
        .pipe(gulp.dest(compileDestination));
}

function minify(destination) {
    return gulp.src([destination + '**/*.css', '!' + destination + '**/*.min.css'])
        .pipe(cache('css'))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(destination));
}

function clean(destination) {
    return () => del([destination + '**/*.css', destination + '**/*.css.map']);
}

function build(source, destination, compatibleBrowsers) {
    const buildDestination = destination || source;
    const buildCompatibleBrowsers = compatibleBrowsers || defaultCompatibleBrowsers;

    return gulp.series(
        () => new Promise((resolve) => compile(source, buildDestination, buildCompatibleBrowsers)
            .on('end', resolve)),
        () => new Promise((resolve) => minify(buildDestination).on('end', resolve)));
}

module.exports = {
    build, compile, minify, clean,
};
