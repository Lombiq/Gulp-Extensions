const gulp = require('gulp');
const all = require('gulp-all');

const copyAssets = function (assets, destination, beforeDest) {
    const src = (asset) => gulp.src(asset.path);
    return all(assets.map((asset) => (beforeDest ? beforeDest(src(asset), asset) : src(asset))
        .pipe(gulp.dest(destination + '/' + asset.name))));
};

module.exports = copyAssets;
