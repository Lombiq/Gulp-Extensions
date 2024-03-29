# Lombiq Gulp Extensions

## Deprecation notice

This project is being deprecated, and support for it will be ceased. Please consider [migrating](Docs/MigrationToNodeJsExtensions.md) to our [Node.js Extensions](https://github.com/Lombiq/NodeJs-Extensions) project, which provides pre-configured frontend asset pipelines out of the box, without using Gulp.

## About

Various JavaScript functions and Gulp tasks that can be handy when developing Gulp pipelines.

When adding this project to the solution it will initialize a _node_modules_ folder two levels up in the folder hierarchy assuming that it will be a common root folder for all the other _package.json_ files. This way it makes it possible to keep the _package.json_ files light (e.g. adding the `gulp` Node module won't be necessary) by using a single, common _node_modules_ folder (see [the Node docs](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)).

Also see our [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) library that can make NPM package management a lot easier.

We at [Lombiq](https://lombiq.com/) also used this utility for the new client portal for [WTW](https://www.wtwco.com/) ([see case study](https://lombiq.com/blog/lombiq-s-journey-with-wtw-s-client-portal)).

Do you want to quickly try out this project and see it in action? Check it out in our [Open-Source Orchard Core Extensions](https://github.com/Lombiq/Open-Source-Orchard-Core-Extensions) full Orchard Core solution and also see our other useful Orchard Core-related open-source projects!

## Installation and usage

It's recommended that you put this project into a folder named _Lombiq.Gulp.Extensions_ and under the _src/Utilities_ folder.

### Integrating with MSBuild

If you want to integrate ESLint and Stylelint into MSBuild builds then you need to include Lombiq's [NPM MSBuild Targets](https://github.com/Lombiq/NPM-Targets) too. Make sure you have a _package.json_ file with the `dotnet-prebuild` and `dotnet-clean` scripts as indicated in the repository's readme. In the affected projects, you need to import these files in the `.csproj` file:

```xml
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.props" />
<Import Project="path\to\Lombiq.Npm.Targets\Lombiq.Npm.Targets.targets" />
<Import Project="path\to\Lombiq.Gulp.Extensions\Lombiq.Gulp.Extensions.targets"/>
```

Then, warnings will be sent to the error list if the linters find rule violations.

**Note** that when building a solution that utilizes this project from the command line (i.e. with the `dotnet build` or `msbuild` commands) you have to build this project alone first. Otherwise, you'll get "Local gulp not found" errors. Building from Visual Studio doesn't need any special care.

## Gulp tasks

### Included Gulp tasks

- [SCSS targets](Docs/ScssTargets.md)
- [Copy assets](Docs/CopyAssets.md)
- [JS targets](Docs/JsTargets.md)
- [Browsersync](Docs/Browsersync.md)

### Tips for using and naming multiple Gulp tasks

It's recommended to have conventionally named tasks for stylesheets and scripts. We use the `build:styles`/`build:scripts` convention, and similar pairs for `clean` (you may also do this for `watch`). To allow convenient development, we recommend that you add `build`, `clean`, and `watch` tasks as well. We've included a module to set up all the recommended targets automatically:

```js
const recommendedSetup = require('../../Utilities/Lombiq.Gulp.Extensions/recommended-setup');

recommendedSetup.setupRecommendedScssAndJsTasks();

// Or either of these:
recommendedSetup.setupRecommendedJsTasks();
recommendedSetup.setupRecommendedScssTasks();

// And if you want to change e.g. the output path:
recommendedSetup.setupRecommendedScssAndJsTasks('./StylesGoHere/');

// There's also recommendedSetup.setupCopyAssets(assets) and several other such shortcuts.
```

Or here's an sample of a Gulpfile that demonstrates the whole approach:

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

## Using PNPM for package restore

See our notes on PNPM [here](https://github.com/Lombiq/NPM-Targets/#using-pnpm-for-package-restore).

## Contributing and support

If ESLint's or any ESLint plugin's version is updated in Gulp Extension's _package.json_, please update _vs-eslint-package.json_ too.

Bug reports, feature requests, comments, questions, code contributions and love letters are warmly welcome. You can send them to us via GitHub issues and pull requests. Please adhere to our [open-source guidelines](https://lombiq.com/open-source-guidelines) while doing so.

This project is developed by [Lombiq Technologies](https://lombiq.com/). Commercial-grade support is available through Lombiq.
