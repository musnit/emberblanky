//var uglifyJavaScript = require('broccoli-uglify-js');
var copy = require('broccoli-static-compiler');
var merge = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify');
var babel = require('broccoli-babel-transpiler');
var replace = require('broccoli-string-replace');

var app = '.';
var content = '../public';

var other = copy(app, {
  srcDir: '/',
  files: ['index.html', 'app.css', 'config.xml', 'famous.min.js'],
  destDir: '/'
});

app = replace(app, {
  files: [ '**/*.js' ],
  pattern: {
    match: /import Famous from 'npm:famous';/g,
    replacement: 'var Famous = famous;'
  }
});

var appjs = babel(app, {});

appjs = browserify(appjs, {
  entries: ['./main.js'],
  outputFile: 'app.js'
});

module.exports = merge([other, content, appjs]);
