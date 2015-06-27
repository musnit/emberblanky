var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var env = require('broccoli-env').getEnv();

var blanky = 'blanky';
blanky = pickFiles(blanky, {
  srcDir: '/',
  destDir: 'blankyapp' // move under appkit namespace
});
var sourceTrees = [blanky];

sourceTrees = sourceTrees.concat(findBowerTrees());

var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });

var appJs = compileES6(appAndDependencies, {
  inputFiles: [
    'blankyapp/**/*.js'
  ],
  outputFile: '/assets/app.js'
});

var appCss = compileSass(sourceTrees, 'blankyapp/blanky.css', 'assets/app.css');

if (env === 'production') {
  appJs = uglifyJavaScript(appJs, {
  });
}

var publicFiles = 'public';

module.exports = 'blanky';//mergeTrees([appJs, appCss, publicFiles])