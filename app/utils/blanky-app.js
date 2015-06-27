import Famous from 'npm:famous';
//var Timer = Famous.Clock;
import OrientationController from 'emberblanky/utils/orientation-controller';
import SoundController from 'emberblanky/utils/sound-controller';
import AppNode from 'emberblanky/famousnodes/app-node';
//import StatsTimer from 'utils/stats-timer';

export default function BlankyApp(isApp, pagesModel, defaultPageID) {
  this.pagesModel = pagesModel;
  this.defaultPageID = defaultPageID || 'w9zCNnEbfC'
  var FamousEngine = Famous.core.FamousEngine;

  this.isApp = isApp;
  FamousEngine.init();

  window.blanky = this;

  var mainScene = FamousEngine.createScene('#device-screen');
  var topScene = FamousEngine.createScene('#top-screen');
  window.appNode = new AppNode(mainScene, topScene);

  window.orientationController = new OrientationController({timePassed: 0});
  window.orientationController.startListening(this);

  this.soundController = new SoundController(isApp);
  this.loadPage(this.defaultPageID);
}

BlankyApp.prototype.clearPage = function() {
    window.appNode.clearPage();
    this.soundController.clearSounds();
  };

BlankyApp.prototype.loadPage = function(pageID) {
    var pageModel = this.pagesModel.filter(function(page) {
        return page.objectId === pageID;
    })[0];
    window.pageModel = pageModel;
    window.appNode.createAndShowPage(pageModel);
    this.soundController.createSounds(window.pageModel.sounds);
};