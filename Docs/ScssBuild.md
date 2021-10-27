# SCSS build Gulp task



This helper lints, compiles and minifies the given scss files and copies the output to the given folder. You can use it as follows:

1. Copy *example.stylelintrc* from the *ESLint* folder of this project to the root folder of your solution (i.e. where you have the sln file), rename it to *.stylelintrc*, and specify *lombiq-base.stylelintrc*'s location inside.
2. Import the *Tasks/scss-targets.js* file in your Gulpfile.
3. Create a Gulp task that uses this helper as a pipeline, see below.

Usage:

```js
const scssTargets = require('path/to/Lombiq.Gulp.Extensions/Tasks/scss-targets');

gulp.task('build:styles', scssTargets.build('./Assets/Styles/', './wwwroot/css/'));
```
