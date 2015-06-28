var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');

var blanky = 'blanky';
blanky = pickFiles(blanky, {
  srcDir: '/',
  destDir: 'blankyapp' // move under appkit namespace
});
var sourceTrees = [blanky];

sourceTrees = sourceTrees.concat('app/famousnodes');

var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });

var appJs = compileES6(appAndDependencies, {
  inputFiles: [
    'blankyapp/**/*.js'
  ],
  outputFile: '/assets/app.js'
});

//var appCss = compileSass(sourceTrees, 'blankyapp/blanky.css', 'assets/app.css');

appJs = uglifyJavaScript(appJs, {
});

var publicFiles = 'public';

module.exports = appAndDependencies;//mergeTrees([appJs, appCss, publicFiles])