var uglify = require('broccoli-uglify-js');
var merge = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify');
var babel = require('broccoli-babel-transpiler');
var replace = require('broccoli-string-replace');
var funnel = require('broccoli-funnel');

var projectFiles = 'src';
var blankyLib = funnel('../app/blankylib', {
  destDir: 'blankylib'
});

var appJs = funnel('src/js');
var other = funnel('src/other');
var content = '../public';

var allJS = merge([blankyLib, appJs]);

allJS = replace(allJS, {
  files: [ '**/*.js' ],
  pattern: {
    match: /import Famous from 'npm:famous';/g,
    replacement: 'var Famous = famous;'
  }
});

allJS = babel(allJS, {});

allJS = browserify(allJS, {
  entries: ['./main.js'],
  outputFile: 'app.js'
});

allJS = uglify(allJS);

module.exports = merge([other, content, allJS]);
