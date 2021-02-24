# Lombiq Gulp Extensions



## About

Various JavaScript functions and Gulp tasks that can be handy when developing Gulp pipelines.

When adding this project to the solution it will initialize a *node_modules* folder two levels up in the folder hierarchy assuming that it will be a common root folder for all the other *package.json* files. This way it makes it possible to keep the *package.json* files light (e.g. adding the `gulp` node module won't be necessary).

Also see our [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) library that can make NPM package management a lot easier.


## Includes:

### SCSS build

This helper compiles and minifies the given scss files and copies the output to the given folder. 

Import the *Tasks/build-scss.js* file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Usage:

```
const buildScss = require('path/to/Lombiq.Gulp.Extensions/Tasks/build-scss');

gulp.task('build:styles', () => buildScss('./Assets/scss/**/*.scss', './wwwroot/'));
```

### Copy assets

This helper makes it possible to copy one or multiple assets to a destination folder. 

Import the *Tasks/copy-assets.js* file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

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

You have to copy *.eslintrc* to the root folder of your solution, and specify *lombiq-base.js*'s location inside as described in the file.

Import the *Tasks/js-targets.js* file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

Input parameter is an array of objects where it is possible to specify the source and destination of each assets. Each object should have a `name` property which will be the name of the subfolder created in the destination, and a `path` property which defines one or more files that need to be code analyzed and copied.

Usage:
```
const jsTargets = require('path/to/Lombiq.Gulp.Extensions/Tasks/js-targets');

const path = './Assets/Scripts/'
const destination = './directory-to-copy-into'

gulp.task('build:js', () => jsTargets.compile(path, destination));
```

The rules are found in 2 files:
- *lombiq-base.js*: These rules are Lombiq overrides for the extended [Airbnb rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules).
- *.eslintrc*: In this file you can define your own overriding rules.

Rules can be found in the [ESLint documentation](https://eslint.org/docs/rules/).

The MSBuild output or task runner will show you all of the ESLint rule violations in a detailed manner.

If you want to integrate ESLint into MSBuild you need to include Lombiq's [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) too.
In the project ESLint needs use, you need to import these files in the `.csproj` file:
```
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.props" />
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.targets" />
<Import Project="path\to\Lombiq.Gulp.Extensions\Lombiq.Gulp.Extensions.targets"/>
```
Then a warning will be sent to the error list if ESLint finds a rule violation.

If you use [Visual Studio's built-in ESLint](https://docs.microsoft.com/en-us/visualstudio/ide/reference/options-text-editor-javascript-linting?view=vs-2019) it will recognize the rules and show any violations after the copying of *.eslintrc* as mentioned above.


## Contributing and support

Bug reports, feature requests, comments, questions, code contributions, and love letters are warmly welcome, please do so via GitHub issues and pull requests. Please adhere to our [open-source guidelines](https://lombiq.com/open-source-guidelines) while doing so.

This project is developed by [Lombiq Technologies](https://lombiq.com/). Commercial-grade support is available through Lombiq.
