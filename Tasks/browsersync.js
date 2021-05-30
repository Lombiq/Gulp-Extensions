const gulp = require('gulp');
const browsersync = require('browser-sync').create('Test Server'); // Initialize the Browsersync server.

async function browsersyncServe(options) {
    const defaultOptions = {
        host: 'localhost',
        port: 65228,
        open: false,
        online: false
    }

    // Merge object properties with the spread operator. 
    // In the case of a key collision, the right - most(last) object's value wins out.
    browsersync.init({ ...defaultOptions, ...options });

    browsersync.watch(options.files, function (event, file) {
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
