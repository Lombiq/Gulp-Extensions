# Lombiq Gulp Extensions



## About

Various JavaScript functions and Gulp tasks that can be handy when developing Gulp pipelines.

When adding this project to the solution it will initialize a *node_modules* folder two levels up in the folder hierarchy assuming that it will be a common root folder for all the other *package.json* files. This way it makes it possible to keep the *package.json* files light (e.g. adding the `gulp` Node module won't be necessary) by using a single, common *node_modules* folder (see [the Node docs](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)).

Also see our [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) library that can make NPM package management a lot easier.

Do you want to quickly try out this project and see it in action? Check it out in our [Open-Source Orchard Core Extensions](https://github.com/Lombiq/Open-Source-Orchard-Core-Extensions) full Orchard Core solution and also see our other useful Orchard Core-related open-source projects!


## Included Gulp tasks

It's recommended that you put this project into a folder named _Lombiq.Gulp.Extensions_ and under the _src/Utilities_ folder.

### SCSS build

This helper compiles and minifies the given scss files and copies the output to the given folder. 

Import the *Tasks/scss-targets.js* file in your Gulpfile, then create a Gulp task that uses this helper as a pipeline.

Usage:

```
const scssTargets = require('path/to/Lombiq.Gulp.Extensions/Tasks/scss-targets');

gulp.task('build:styles', scssTargets.build('./Assets/Styles/', './wwwroot/css/'));
```

### Copy assets

This helper makes it possible to copy one or multiple assets to a destination folder. 

Import the *Tasks/copy-assets.js* file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.

The first input parameter is an array of objects where it is possible to specify the source and destination of each assets. Each object should have a `name` property which will be the name of the subfolder created in the destination, and a `path` property which defines one or more files that need to be copied.

Usage:

```
const copyAssets = require('path/to/Lombiq.Gulp.Extensions/Tasks/copy-assets');

const assets = [
    {
        name: 'jquery-validation',
        path: './node_modules/jquery-validation/dist/*',
    },
    {
        name: 'images',
        path: './Assets/images/**/*',
    },
];

gulp.task('copy:assets', () => copyAssets(assets, './wwwroot/'));
```

### JS Targets (ESLint)

This helper makes it possible to copy one or multiple javascript files to a destination folder, after applying a code analyzer (ESLint) on it.

Looking for something similar for .NET? Check out our [.NET Analyzers project](https://github.com/Lombiq/.NET-Analyzers).

You can use ESLint as follows:

1. Copy *example.eslintrc* from the *ESLint* folder of this project to the root folder of your solution (i.e. where you have the sln file), rename it to *.eslintrc*, and specify *lombiq-base.js*'s location inside as described in the file (e.g. `"./src/Utilities/Lombiq.Gulp.Extensions/ESLint/lombiq-base.js"`).
2. Import the *Tasks/js-targets.js* file in your Gulpfile then create a Gulp task that uses this helper as a pipeline.
3. If you use [Visual Studio's built-in ESLint](https://docs.microsoft.com/en-us/visualstudio/ide/reference/options-text-editor-javascript-linting?view=vs-2019), it will recognize the rules and show any violations after the copying of *.eslintrc* as mentioned above. Note that you have to enable the ESLint integration for it to work in the editor. The *vs-eslint-package.json* file is automatically copied into your solution directory as *package.json* to make this work; gitignore it in your repository along the lines of:

    ```
    /src/package.json
    ```

#### Configuring the Gulp task

The input parameters are `string`s of the source and destination folders containing scripts that need to be analyzed and copied.

Usage:
```
const jsTargets = require('path/to/Lombiq.Gulp.Extensions/Tasks/js-targets');

const source = './Assets/Scripts/'
const destination = './wwwroot/js'

gulp.task('build:scripts', () => jsTargets.compile(source, destination));

// Or you can pass a function to modify the pipeline before saving the files and e.g. run Babel:
gulp.task(
    'build:scripts',
    () => jsTargets.compile(source, destination, (pipeline) => pipeline.pipe(babel({ presets: ['@babel/preset-env'] }))));

// You can also pass additional options to ESLint.
// Here's an example for fixing automatically fixable rule violations in-place:
gulp.task(
    'build:scripts--fix',
    () => jsTargets.compile(scriptsBasePath, scriptsBasePath, null, { fix: true }));
```

Read more about `options` in the CLI [documentation](https://eslint.org/docs/developer-guide/nodejs-api#cliengine).

#### ESlint rules

The rules are found in 2 files:
- *lombiq-base.js*: These rules are Lombiq overrides for the extended [Airbnb rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules).
- *.eslintrc*: In this file you can define your own overriding rules.

Details on rules can be found in the [ESLint documentation](https://eslint.org/docs/rules/).

The MSBuild output or the Gulp task runner will show you all of the ESLint rule violations in a detailed manner.

If a certain rule's violation is incorrect in a given location, or you want to suppress it locally, [you can disable them](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments). Just always comment such disables so it's apparent why it was necessary.

#### Integrating with MSBuild

If you want to integrate ESLint into MSBuild builds you need to include Lombiq's [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) too. In the project ESLint needs use, you need to import these files in the `.csproj` file:
```
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.props" />
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.targets" />
<Import Project="path\to\Lombiq.Gulp.Extensions\Lombiq.Gulp.Extensions.targets"/>
```
Then a warning will be sent to the error list if ESLint finds a rule violation.

**Note** that when building a solution that utilizes this project from the command line (i.e. with the `dotnet build` or `msbuild` commands) you have to build this project alone first. Otherwise, you'll get "Local gulp not found" errors. Building from Visual Studio doesn't need any special care.

### Browsersync

This helper enables you to see client-side changes in realtime using [Browsersync](https://browsersync.io). It works by spinning up a local server that watches files (according to the configuration) for changes to be able reload/inject static resources with or without reloading the page for every active browser session. Find more information in the [official documentation](https://browsersync.io/docs/options).

Usage:
```js
const cssFilesPath = '**/*.css';
const jsFilesPath = '**/*.js';

const browsersyncOptions = {    
    files: [
        cssFilesPath,
        jsFilesPath
    ]
}

gulp.task('browsersyncStart', () => browsersync.browsersyncServe(browsersyncOptions));
```

Using [proxy mode](https://browsersync.io/docs/options#option-proxy) requires an existing vhost added in the options, which Browsersync will create a proxy for.

If you are not using the proxy mode, the terminal will ask you to add a snippet just before the closing </body> tag, for example:
```html
<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js'><\/script>".replace("HOST", location.hostname));
//]]></script>
```

## Tips for using and naming multiple Gulp tasks

It's recommended to have conventionally named tasks for stylesheets and scripts. We use the `build:styles`/`build:scripts` convention, and similar pairs for `clean` (you may also do this for `watch`). To allow convenient development, we recommend that you add `build`, `clean`, and `watch` tasks as well. Here's an sample of a Gulpfile that demonstrates this:

```js
const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const scssTargets = require('../../Utilities/Lombiq.Gulp.Extensions/Tasks/scss-targets');
const jsTargets = require('../../Utilities/Lombiq.Gulp.Extensions/Tasks/js-targets');

const assetsBasePath = './Assets/';
const distBasePath = './wwwroot/';
const stylesBasePath = assetsBasePath + 'Styles/';
const stylesDistBasePath = distBasePath + 'css/';
const scriptsBasePath = assetsBasePath + 'Scripts/';
const scriptsDistBasePath = distBasePath + 'js/';

gulp.task('build:styles', scssTargets.build(stylesBasePath, stylesDistBasePath));
gulp.task('clean:styles', scssTargets.clean(stylesDistBasePath));

gulp.task(
    'build:scripts',
    () => jsTargets.compile(
        scriptsBasePath, scriptsDistBasePath, (pipeline) => pipeline.pipe(babel({ presets: ['@babel/preset-env'] }))));

gulp.task('clean:scripts', jsTargets.clean(scriptsDistBasePath));

gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts'));

gulp.task('default', gulp.parallel('build:styles', 'build:scripts'));

gulp.task('watch', () => {
    watch(stylesBasePath + '**/*.scss', { verbose: true }, gulp.series('build:styles'));
    watch(scriptsBasePath + '**/*.js', { verbose: true }, gulp.series('build:scripts'));
});

```


## Using pnpm for package restore

[Pnpm](https://pnpm.io/) is a faster and more efficient package manager. If it's installed globally, then the Gulp Extension module will use that instead of *npm* to restore packages.

### Installation and usage

To install *pnpm* globally run this command: `npm install pnpm -g`. Once it's complete, the module will automatically use that to restore packages.

### Notes

* *pnpm* supports restoring packages directly to a folder so moving the *node_modules* folder to a parent folder is not necessary anymore.
* *pnpm* uses its own package lock file, meaning if you want to keep npm compatibility then you need to maintain both *pnpm-lock.yaml* and *package-lock.json* files in case of adding a new package or updating one.
* *pnpm* will install the latest package dependencies unless it's overriden from the *package.json* file. E.g., the latest *sass* is installed along with the *gulp-dart-sass* that might [cause issues with Bootstrap 4](https://github.com/twbs/bootstrap/issues/34051) so it's overriden with a lower version.


## Contributing and support

If ESLint's or any ESLint plugin's version is updated in Gulp Extension's *package.json*, please update *vs-eslint-package.json* too.

Bug reports, feature requests, comments, questions, code contributions, and love letters are warmly welcome, please do so via GitHub issues and pull requests. Please adhere to our [open-source guidelines](https://lombiq.com/open-source-guidelines) while doing so.

This project is developed by [Lombiq Technologies](https://lombiq.com/). Commercial-grade support is available through Lombiq.
