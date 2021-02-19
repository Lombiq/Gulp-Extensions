# Lombiq Gulp Extensions



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
const buildScss = require('path/to/Lombiq.Gulp.Extensions/Tasks/build-scss');

gulp.task('build:styles', () => buildScss('./Assets/scss/**/*.scss', './wwwroot/'));
```

### Copy assets

This helper makes it possible to copy one or multiple assets to a destination folder. 

Import the _Tasks/copy-assets.js_ file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Input parameter is an array of objects where it is possible to specify the source and destination of each assets. Each object should have a `name` property which will be the name of the subfolder created in the destination, and a `path` property which defines one or more files that need to be copied.

Usage:

```
const copyAssets = require('path/to/Lombiq.Gulp.Extensions/Tasks/copy-assets');

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

### JS Targets (ESLint)

This helper makes it possible to copy one or multiple javascript files to a destination folder, after applying a code analyzer (**ESLint**) on it.

Import the _Tasks/js-targets.js_ file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Input parameter is an array of objects where it is possible to specify the source and destination of each assets. Each object should have a `name` property which will be the name of the subfolder created in the destination, and a `path` property which defines one or more files that need to be code analyzed and copied.

Usage:

```
const jsTargets = require('path/to/Lombiq.Gulp.Extensions/Tasks/js-targets');

const path = './Assets/Scripts/'
const destination = './directory-to-copy-into'

gulp.task('build:js', () => jsTargets.compile(path, destination));
```

The rules are found in 3 files:
- *eslint-base.js* these rules come from the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- *lombiq-base.js* these rules are Lombiq overrides for the Airbnb rules.
- *.eslintrc* in this file you can define your own overriding rules

Since these files will be copied int your solution's root you may want to gitignore it:
```
/src/.eslintrc
/src/eslint-base.js
/src/lombiq-base.js
```

Rules can be found in the [ESLint documentation](https://eslint.org/docs/rules/).

The build output or task runner will show you a all the ESLint rule violations in a detailed manner.

If you want to integrate ESLint into MSBuild you need to include Lombiq's [NPM-Targets](https://github.com/Lombiq/NPM-Targets) too.
In the project ESLint needs use, you need to import these files in the `.csproj` file:
```
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.props" />
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.targets" />
<Import Project="path\to\Lombiq.Gulp.Extensions\Lombiq.Gulp.Extensions.targets"/>
```
Then a warning will be sent to the error list if ESLint finds a rule violation.

If you want to use [Visual Studio's built in ESLint](https://docs.microsoft.com/en-us/visualstudio/ide/reference/options-text-editor-javascript-linting?view=vs-2019) aswell, after the first build of Gulp Extensions, the built in ESLint will use the rules found in this extension.


## Contributing and support

Bug reports, feature requests, comments, questions, code contributions, and love letters are warmly welcome, please do so via GitHub issues and pull requests. Please adhere to our [open-source guidelines](https://lombiq.com/open-source-guidelines) while doing so.

This project is developed by [Lombiq Technologies](https://lombiq.com/). Commercial-grade support is available through Lombiq.
