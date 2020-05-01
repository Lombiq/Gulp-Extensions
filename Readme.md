# Gulp Extensions



## About

Various JavaScript functions and Gulp tasks that can be handy when developing Gulp pipelines.

When adding this project to the solution it will initialize a _node_modules_ folder two levels up in the folder hierarchy assuming that it will be a common root folder for all the other _package.json_ files. This way it makes it possible to keep the _package.json_ files light (e.g. adding _gulp_ node module won't be necessary).

Also see our [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) library that can make NPM package management a lot easier.


## Includes:

### SCSS build

This helper compiles and minifies the given scss files and copies the output to the given folder. 

Import the _Tasks/build-scss.js_ file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Usage:

```
const buildScss = require('path/to/Lombiq.GulpExtensions/Tasks/build-scss');

gulp.task('build:styles', () => buildScss('./Assets/scss/**/*.scss', './wwwroot/'));
```

### Copy assets

This helper makes it possible to copy one or multiple assets to a destination folder. 

Import the _Tasks/copy-assets.js_ file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Input parameter is an array of objects where it is possible to specify the source and destination of each assets. Each object should have a `name` property which will be the name of the subfolder created in the destination, and a `path` property which defines one or more files that need to be copied.

Usage:

```
const copyAssets = require('path/to/Lombiq.GulpExtensions/Tasks/copy-assets');

const assets = [        
    {
        name: 'jquery-validation',
        path: './node_modules/jquery-validation/dist/*'
    },
    {
        name: 'images',
        path: './Assets/images/**/*'
    }
]

gulp.task('copy:assets', () => copyAssets(assets, './wwwroot/'));
```


## Contribution and support

Bug reports, feature requests, comments, questions, code contributions, and love letters are warmly welcome, please do so via GitHub issues and pull requests. Please adhere to our [open-source guidelines](https://lombiq.com/open-source-guidelines) while doing so.

This project is developed by [Lombiq Technologies](https://lombiq.com/). Commercial-grade support is available through Lombiq.