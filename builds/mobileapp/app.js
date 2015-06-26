import Famous from "npm:famous";

var Fixtures = require('Fixtures');
window.Fixtures = Fixtures;
var pagesModel = {};
pagesModel.pages = Fixtures.results;
window.pagesModel = pagesModel;
var loopingIDs = ['UHGPYzstxO','gBqF9PtfBm','w9zCNnEbfC','mt1s3uZ90p','rZ4dWe9BGU'];
var loopNum = 1;
var BlankyApp = require('BlankyApp');
var clicked = function(event) {
    var x = event.clientX;
    if (x < document.getElementById('device-screen').getBoundingClientRect().width/2){
        window.orientationController.reset();
    }
    else {
        window.blanky.clearPage();
        window.blanky.loadPage(loopingIDs[loopNum%loopingIDs.length]);
        loopNum++;
    }
};
var startApp = function() {
    window.blanky = new BlankyApp(true);
    window.blanky.loadPage(window.initialPageId);
    document.getElementById('top-screen').addEventListener('click', clicked, false);
};
var startWeb = function() {
    window.blanky = new BlankyApp(false);
    window.blanky.loadPage(window.initialPageId);
    document.getElementById('top-screen').addEventListener('click', clicked, false);
};

var isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
if (isApp){
    document.addEventListener('deviceready', startApp, false);
}
else {
    startWeb();
}