/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var concat = require('broccoli-concat');
var cleanCSS = require('broccoli-clean-css');

var app = new EmberApp({
  fingerprint: {
    enabled: false
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.;
app.import('vendor/soundjs-0.6.0.min.js');
app.import('vendor/parse-1.3.2.min.js');
app.import('vendor/stats.min.js');

var concatenatedCss = concat('app/styles', {
    inputFiles: [
        '**/*.css'
    ],
    outputFile: '/assets/app.css'
});

if (app.env === 'production') {
    concatenatedCss = cleanCSS(concatenatedCss, {restructuring: false});
}

module.exports = app.toTree([concatenatedCss]);
