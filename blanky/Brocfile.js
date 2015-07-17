//var uglifyJavaScript = require('broccoli-uglify-js');
//var ES6Modules = require('broccoli-es6modules');
var copy = require('broccoli-static-compiler');
var merge = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify');
var babel = require('broccoli-babel-transpiler');

var app = '.';
var lib = '../app/blankylib';
var content = '../public';

var html = copy(app, {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/'
});

var famous = browserify('node_modules/famous',{

});

var libjs = babel(lib, {});
libjs = browserify(libjs, {
  entries: ['./utils/blanky-app.js'],
  outputFile: 'lib.js'
});

var appjs = babel(app, {});

appjs = browserify(appjs, {
  entries: ['./main.js'],
  outputFile: 'app.js'
});

module.exports = merge([html, content, famous, libjs, appjs]);;
