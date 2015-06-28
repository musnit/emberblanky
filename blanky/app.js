import Fixtures from '../fixtures/blanky-fixtures';
import BlankyApp from '../utils/blanky-app';

var pages = Fixtures.results;
var loopingIDs = ['UHGPYzstxO','gBqF9PtfBm','w9zCNnEbfC','mt1s3uZ90p','rZ4dWe9BGU'];
var loopNum = 1;
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
    window.blanky = new BlankyApp(true, pages);
    document.getElementById('top-screen').addEventListener('click', clicked, false);
};
document.addEventListener('deviceready', startApp, false);
