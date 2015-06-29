var uglifyJavaScript = require('broccoli-uglify-js');
var ES6Modules = require('broccoli-es6modules');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var browserify = require('broccoli-browserify');
var optimizeRequireJs = require('broccoli-requirejs');

var src = 'blanky/src';
src = pickFiles(src, {
  srcDir: '/',
  destDir: ''
});

var famous = browserify('node_modules/famous');

var sourceTrees = [src, 'app/blankylib', famous];

var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });
var amdFiles = new ES6Modules(appAndDependencies, {
  format: 'amd'
});

uglyAmdFiles = uglifyJavaScript(amdFiles, {
});

rJSFiles = optimizeRequireJs(uglyAmdFiles, {
  verbose   : true,
  requirejs : {
    name : 'app',
    out  : 'app.js'
  }
});

var appCss = pickFiles('app/styles/app', {
  srcDir: '/',
  destDir: 'assets' // move under appkit namespace
});
var publicFiles = 'public';
var publicAppFiles = 'blanky/public';
var app = new mergeTrees([rJSFiles, appCss, publicFiles, publicAppFiles]);

module.exports = app;