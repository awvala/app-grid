'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
// Added to update TypeScript version
const typescriptBuild = require('@microsoft/gulp-core-build-typescript');

typescriptBuild.tscCmd.mergeConfig({
overridePackagePath: 'node_modules/typescript'
});
// End custom code
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);
