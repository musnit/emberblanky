import Fixtures from './blankylib/fixtures/blanky-fixtures';
import BlankyApp from './blankylib/utils/blanky-app';

var pages = Fixtures.results;
var loopingIDs = [
  'Tk0HHLTeBU', //portrait hands
  '6usYlEkJfA', //desk, squashed basic pull
  'cQE07NGbHk', //desk, basic pull back runon
  'w9zCNnEbfC', //pirate, runon
  'rZ4dWe9BGU', //car, static car
];
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
  document.getElementById('top-screen').addEventListener('click', clicked, false);
  window.blanky = new BlankyApp(true, pages, loopingIDs[0]);
};
document.addEventListener('deviceready', startApp, false);
