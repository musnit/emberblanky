import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';
import Fixtures from 'emberblanky/utils/blanky-fixtures';

export default Ember.Component.extend({
  start: function(){
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
        window.blanky = new BlankyApp(true, this.get('model'));
        document.getElementById('top-screen').addEventListener('click', clicked, false);
    };
    var startWeb = function() {
        window.blanky = new BlankyApp(false, this.get('model'));
        document.getElementById('top-screen').addEventListener('click', clicked, false);
    };

    var isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    if (isApp){
        document.addEventListener('deviceready', startApp, false);
    }
    else {
        startWeb();
    }
  }.on('didInsertElement')
});
