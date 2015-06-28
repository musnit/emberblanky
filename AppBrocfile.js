var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var browserify = require('broccoli-browserify');

var blanky = 'blanky';
blanky = pickFiles(blanky, {
  srcDir: '/',
  destDir: 'blankyapp' // move under appkit namespace
});

var famous = browserify('node_modules/famous');

var sourceTrees = [blanky, 'app/blankylib', famous];

var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });


var appJs = compileES6(appAndDependencies, {
  inputFiles: [
    'blankyapp/**/*.js'
  ],
  outputFile: '/assets/app.js'
});

appJs = uglifyJavaScript(appJs, {
});

var appCss = 'app/styles/app.css';
var publicFiles = 'public';
//var app = new mergeTrees[appJs, appCss, publicFiles]

module.exports = appJs; //mergeTrees([appJs, appCss, publicFiles])