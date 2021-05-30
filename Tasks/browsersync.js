const gulp = require('gulp');
const browsersync = require('browser-sync').create('Test Server'); // Initialize the Browsersync server.

async function browsersyncServe(destination) {
    browsersync.init({
        logPrefix: 'Test Browsersync',
        host: 'localhost',
        port: 65228,
        open: false,
        notify: true,
        files: destination
    });

    browsersync.watch(destination, function (event, file) {
        if (event === "change") {
            browsersync.notify(file + ' has been changed.', 2000);
        }
    });
}

async function browsersyncReload() {
    browsersync.reload();
}

module.exports = {
    browsersyncServe, browsersyncReload
};
