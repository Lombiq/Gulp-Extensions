const fs = require('fs');
const path = require('path');
const process = require('process');
const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const scssTargets = require('./Tasks/scss-targets');
const jsTargets = require('./Tasks/js-targets');
const copyAssets = require('./Tasks/copy-assets');

const defaultAssetsBasePath = './Assets/';
const defaultDistBasePath = './wwwroot/';
const defaultStylesAssetsBasePath = defaultAssetsBasePath + 'Styles/';
const defaultScriptsAssetsBasePath = defaultAssetsBasePath + 'Scripts/';

function setupRecommendedScssTasks(
    stylesDistBasePath = defaultDistBasePath + 'css/',
    stylesAssetsBasePath = defaultStylesAssetsBasePath,
    includePaths = []) {
    gulp.task('build:styles', scssTargets.build(stylesAssetsBasePath, stylesDistBasePath, undefined, includePaths));
    gulp.task('clean:styles', scssTargets.clean(stylesDistBasePath));
    gulp.task('watch:styles', () => watch(stylesAssetsBasePath + '**/*.scss', { verbose: true }, gulp.series('build:styles')));
    gulp.task('default', gulp.series('build:styles'));
    gulp.task('clean', gulp.series('clean:styles'));

    return this;
}

function setupRecommendedJsTasks(
    scriptsDistBasePath = defaultDistBasePath + 'js/',
    scriptsAssetsBasePath = defaultScriptsAssetsBasePath) {
    gulp.task(
        'build:scripts',
        () => jsTargets.compile(
            scriptsAssetsBasePath, scriptsDistBasePath, (pipeline) => pipeline.pipe(babel({ presets: ['@babel/preset-env'] }))));

    gulp.task('clean:scripts', jsTargets.clean(scriptsDistBasePath));
    gulp.task('watch:scripts', () => watch(scriptsAssetsBasePath + '**/*.js', { verbose: true }, gulp.series('build:scripts')));
    gulp.task('default', gulp.series('build:scripts'));
    gulp.task('clean', gulp.series('clean:scripts'));

    return this;
}

function setupRecommendedScssAndJsTasks(
    stylesDistBasePath,
    scriptsDistBasePath,
    stylesAssetsBasePath,
    scriptsAssetsBasePath,
    stylesIncludePaths = []) {
    setupRecommendedScssTasks(stylesDistBasePath, stylesAssetsBasePath, stylesIncludePaths);
    setupRecommendedJsTasks(scriptsDistBasePath, scriptsAssetsBasePath);

    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts'));
    gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts'));
    gulp.task('default', gulp.parallel('build:styles', 'build:scripts'));

    return this;
}

function setupVendorsCopyAssets(assets, assetsDistBasePath = defaultDistBasePath + 'vendors') {
    gulp.task('copy:vendor-assets', () => copyAssets.copy(assets, assetsDistBasePath));
    gulp.task('clean:vendor-assets', () => copyAssets.clean(assetsDistBasePath));

    gulp.task('default', gulp.series('copy:vendor-assets'));
    gulp.task('clean', gulp.series('clean:vendor-assets'));

    return this;
}

function setupRecommendedScssAndJsTasksAndVendorsCopyAssets(
    assets,
    stylesDistBasePath,
    scriptsDistBasePath,
    assetsDistBasePath,
    stylesAssetsBasePath,
    scriptsAssetsBasePath,
    stylesIncludePaths = []) {
    setupRecommendedScssTasks(stylesDistBasePath, stylesAssetsBasePath, stylesIncludePaths);
    setupRecommendedJsTasks(scriptsDistBasePath, scriptsAssetsBasePath);
    setupVendorsCopyAssets(assets, assetsDistBasePath);

    gulp.task('default', gulp.parallel('build:styles', 'build:scripts', 'copy:vendor-assets'));
    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts', 'clean:vendor-assets'));

    return this;
}

function setupCopyAssets(assets, assetsDistBasePath = defaultDistBasePath) {
    const paths = assets.map((asset) => assetsDistBasePath + asset.name);

    gulp.task('copy:assets', () => copyAssets.copy(assets, assetsDistBasePath));
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

function setupRecommendedScssAndJsTasksAndCopyAssets(
    assets,
    stylesDistBasePath,
    scriptsDistBasePath,
    stylesAssetsBasePath,
    scriptsAssetsBasePath,
    stylesIncludePaths = []) {
    setupRecommendedScssTasks(stylesDistBasePath, stylesAssetsBasePath, stylesIncludePaths);
    setupRecommendedJsTasks(scriptsDistBasePath, scriptsAssetsBasePath);
    setupCopyAssets(assets);

    gulp.task('default', gulp.parallel('build:styles', 'build:scripts', 'copy:assets'));
    gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts', 'clean:assets'));

    return this;
}

function setupRecommended(options) {
    const config = {
        assets: [],
        styles: false,
        scripts: false,
        ...options,
    };

    const build = [];
    const clean = [];
    function add(task, buildName = 'build') {
        build.push(`${buildName}:${task}`);
        clean.push(`clean:${task}`);
    }

    if (config.styles) {
        const styles = config.styles === true ? {} : config.styles;
        setupRecommendedScssTasks(styles.distBasePath, styles.assetsBasePath, styles.includePaths);
        add('styles');
    }

    if (config.scripts) {
        const scripts = config.scripts === true ? {} : config.scripts;
        setupRecommendedJsTasks(scripts.distBasePath, scripts.assetsBasePath);
        add('scripts');
    }

    if (Array.isArray(config.assets)) {
        setupCopyAssets(config.assets);
        add('assets', 'copy');
    }

    console.log('BUILD TASKS', ...build);

    gulp.task('default', gulp.parallel(...build));
    gulp.task('clean', gulp.parallel(...clean));

    return this;
}

function getNugetPath() {
    const steps = ['.nuget', 'packages'];
    Array.from(arguments).forEach((item) => steps.push(item));

    let current = process.env.HOME ?? process.env.USERPROFILE;

    // test and probe
    console.log('CURRENT:', current);
    console.log('CWD:', process.cwd());
    console.log(JSON.stringify(process.env, undefined, 2));
    console.log(fs.readdirSync(current).join('\n'));

    function last(array) { return array[array.length - 1]; }

    for (let i = 0; i < steps.length; i++)
    {
        let step = steps[i] === null || steps[i] === undefined ? '*' : steps[i].toLowerCase();
        if (step === '') continue;

        const results = fs
            .readdirSync(current)
            .filter((name) => step === '*' || name.toLowerCase() === step);

        current = path.resolve(current, last(results));
    }

    return current;
}

module.exports = {
    setupRecommendedScssTasks,
    setupRecommendedJsTasks,
    setupRecommendedScssAndJsTasks,
    setupVendorsCopyAssets,
    setupRecommendedScssAndJsTasksAndVendorsCopyAssets,
    setupCopyAssets,
    setupRecommendedScssAndJsTasksAndCopyAssets,
    setupRecommended,
    getNugetPath,
};
