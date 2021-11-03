const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const scssTargets = require('./Tasks/scss-targets');
const jsTargets = require('./Tasks/js-targets');
const copyAssets = require('./Tasks/copy-assets');

const assetsBasePath = './Assets/';
const distBasePath = './wwwroot/';
const stylesBasePath = assetsBasePath + 'Styles/';
const scriptsBasePath = assetsBasePath + 'Scripts/';

function setupRecommendedScssTasks() {
    const stylesDistBasePath = distBasePath + 'css/';

    gulp.task('build:styles', scssTargets.build(stylesBasePath, stylesDistBasePath));
    gulp.task('clean:styles', scssTargets.clean(stylesDistBasePath));
    gulp.task('watch:styles', () => watch(stylesBasePath + '**/*.scss', { verbose: true }, gulp.series('build:styles')));
    gulp.task('default', gulp.series('build:styles'));
    gulp.task('clean', gulp.series('clean:styles'));

    return this;
}

function setupRecommendedJsTasks() {
    const scriptsDistBasePath = distBasePath + 'js/';

    gulp.task(
        'build:scripts',
        () => jsTargets.compile(
            scriptsBasePath, scriptsDistBasePath, (pipeline) => pipeline.pipe(babel({ presets: ['@babel/preset-env'] }))));

    gulp.task('clean:scripts', jsTargets.clean(scriptsDistBasePath));
    gulp.task('watch:scripts', () => watch(scriptsBasePath + '**/*.js', { verbose: true }, gulp.series('build:scripts')));
    gulp.task('default', gulp.series('build:scripts'));
    gulp.task('clean', gulp.series('clean:scripts'));

    return this;
}

function setupRecommendedScssAndJsTasks() {
    setupRecommendedScssTasks();
    setupRecommendedJsTasks();

    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts'));

    gulp.task('watch', () => {
        watch(stylesBasePath + '**/*.scss', { verbose: true }, gulp.series('build:styles'));
        watch(scriptsBasePath + '**/*.js', { verbose: true }, gulp.series('build:scripts'));
    });

    gulp.task('build', gulp.parallel('build:styles', 'build:scripts'));
    gulp.task('default', gulp.series('build'));

    return this;
}

function setupVendorsCopyAssets(assets) {
    gulp.task('copy:vendor-assets', () => copyAssets.copy(assets, './wwwroot/vendors'));
    gulp.task('clean:vendor-assets', () => copyAssets.clean('./wwwroot/vendors'));

    gulp.task('default', gulp.series('copy:vendor-assets'));
    gulp.task('clean', gulp.series('clean:vendor-assets'));

    return this;
}

module.exports = {
    setupRecommendedScssTasks, setupRecommendedJsTasks, setupRecommendedScssAndJsTasks, setupVendorsCopyAssets,
};
