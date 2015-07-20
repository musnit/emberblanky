import Famous from 'npm:famous';
//var Timer = Famous.Clock;
import OrientationController from './orientation-controller';
import SoundController from './sound-controller';
import AppNode from '../famousnodes/app-node';
import TimeKeeper from './time-keeper';
//import StatsTimer from './stats-timer';

export default function BlankyApp(isApp, pagesModel, defaultPageID) {
  this.pagesModel = pagesModel;
  this.defaultPageID = defaultPageID || 'UHGPYzstxO';
  this.timeKeeper = new TimeKeeper();
  this.injections = {
    timeKeeper: this.timeKeeper
  };
  var FamousEngine = Famous.core.FamousEngine;

  this.isApp = isApp;
  FamousEngine.init();

  var mainScene = FamousEngine.createScene('#device-screen');
  var topScene = FamousEngine.createScene('#top-screen');
  this.appNode = new AppNode(mainScene, topScene);

  window.orientationController = new OrientationController({timePassed: 0});
  window.orientationController.startListening(this);

  this.soundController = new SoundController(isApp);
  this.loadPage(this.defaultPageID);
}

BlankyApp.prototype.clearPage = function() {
    this.appNode.clearPage();
    this.soundController.clearSounds();
  };

BlankyApp.prototype.loadPage = function(pageID) {
    var pageModel = this.pagesModel.filter(function(page) {
        return page.objectId === pageID;
    })[0];
    this.appNode.createAndShowPage(pageModel, this.injections);
    this.soundController.createSounds(pageModel.sounds);
};

BlankyApp.prototype.pausePage = function() {
  this.timeKeeper.pause();
};

BlankyApp.prototype.playPage = function() {
  this.timeKeeper.play();
};

BlankyApp.prototype.setTime = function(time) {
  this.timeKeeper.setTime(time);
};
