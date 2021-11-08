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
    gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts'));
    gulp.task('default', gulp.parallel('build:styles', 'build:scripts'));

    return this;
}

function setupVendorsCopyAssets(assets) {
    gulp.task('copy:vendor-assets', () => copyAssets.copy(assets, distBasePath + 'vendors'));
    gulp.task('clean:vendor-assets', () => copyAssets.clean(distBasePath + 'vendors'));

    gulp.task('default', gulp.series('copy:vendor-assets'));
    gulp.task('clean', gulp.series('clean:vendor-assets'));

    return this;
}

function setupRecommendedScssAndJsTasksAndVendorsCopyAssets(assets) {
    setupRecommendedScssAndJsTasks();
    setupVendorsCopyAssets(assets);

    gulp.task('default', gulp.parallel('build:styles', 'build:scripts', 'copy:vendor-assets'));
    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts', 'clean:vendor-assets'));
}

function setupCopyAssets(assets) {
    const paths = assets.map((asset) => distBasePath + '' + asset.name);

    gulp.task('copy:assets', () => copyAssets.copy(assets, distBasePath + ''));
    gulp.task(
        'clean:assets',
        async () => {
            for (let i = 0; i < paths.length; i++) {
                copyAssets.clean(paths[i]);
            }
        });

    gulp.task('default', gulp.series('copy:assets'));
    gulp.task('clean', gulp.series('clean:assets'));

    return this;
}

function setupRecommendedScssAndJsTasksAndCopyAssets(assets) {
    setupRecommendedScssAndJsTasks();
    setupCopyAssets(assets);

    gulp.task('default', gulp.parallel('build:styles', 'build:scripts', 'copy:assets'));
    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts', 'clean:assets'));
}

module.exports = {
    setupRecommendedScssTasks,
    setupRecommendedJsTasks,
    setupRecommendedScssAndJsTasks,
    setupVendorsCopyAssets,
    setupRecommendedScssAndJsTasksAndVendorsCopyAssets,
    setupCopyAssets,
    setupRecommendedScssAndJsTasksAndCopyAssets,
};
