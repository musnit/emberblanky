import Famous from 'npm:famous';
import ParameterTransformer from '../utils/parameter-transformer';
import ConfigParser from '../utils/config-parser';
import DynamicFunctionParser from '../utils/dynamic-function-parser';
import MathFunctions from '../utils/math-functions';
import PopupNode from './popup-node';

function _createPage() {
    var popupNode;
    var self = this;
    this.popupNodes = [];
    this.cameraBoundNodes = [];
    //Add child twice here - this is a hack that fixes issue with
    //nodes not being cleared properly on page change. idk why lol.
    this.topSceneRoot = this.topScene.addChild();
    this.cameraBoundRoot = this.topSceneRoot.addChild();
    this.popups.forEach(function(popup) {
        if (popup.cameraBound){
            popupNode = new PopupNode(popup, self.model, self.injections);
            self.cameraBoundNodes.push(popupNode);
            self.cameraBoundRoot.addChild(popupNode);
        }
        else {
            popupNode = new PopupNode(popup, self.model, self.injections);
            self.popupNodes.push(popupNode);
            self.addChild(popupNode);
        }
    });
}

function PopupPageNode(model, scene, topScene, injections) {
    var self = this;
    Famous.core.Node.apply(this, arguments);
    this.popups = model.popups;
    this.model = model;
    this.scene = scene;
    this.topScene = topScene;
    this.previousTime = 0;
    this.injections = injections;

    window.orientationController.setTimeKeeper(injections.timeKeeper);

    _createPage.call(this);
    this.camera = new Famous.components.Camera(scene);

    this.parsedConfig = ConfigParser.prototype.parseConfig(model.camera, model);
    this.transformer = new ParameterTransformer(this.parsedConfig, model, injections.timeKeeper);

    this.setupInitialState();

    this.updaterComponent = {
      onUpdate: function(time) {
        self.injections.timeKeeper.update(time);
        if (model.camera.configChanged){
            self.parsedConfig = ConfigParser.prototype.parseConfig(model.camera, model);
            self.setupInitialState();
            self.transformer.setParsedConfig(self.parsedConfig);
            model.camera.configChanged = false;
        }
        if (model.camera.perspectiveZoom){
            var timeOffset = parseFloat(model.camera.timeOffset);
            var perspective = model.page.perspective - self.perspectiveFunction((self.injections.timeKeeper.timePassed+timeOffset)/self.perspectiveZoomSpeed, self.perspectiveZoomAmount);
            self.camera.setDepth(perspective);
        }
        self.requestUpdate(this.id);
      }
    };
    this.updaterComponentID = this.addComponent(this.updaterComponent);
    this.updaterComponent.id = this.updaterComponentID;
    this.requestUpdate(this.updaterComponentID);

    this.componentID = this.transformer.createComponent(this);
    this.requestUpdate(this.componentID);
}

PopupPageNode.prototype = Object.create(Famous.core.Node.prototype);
PopupPageNode.prototype.constructor = PopupPageNode;
PopupPageNode.prototype.setupInitialState = function() {
    this.camera.setDepth(parseFloat(this.model.page.perspective));
    if (this.model.camera.perspectiveZoom){
        this.pageSpeed = parseFloat(this.model.page.speed) || 1;
        this.perspectiveZoomSpeed = this.pageSpeed * parseFloat(this.model.camera.perspectiveZoomSpeed);
        this.perspectiveZoomAmount = parseFloat(this.model.camera.perspectiveZoomAmount);
        this.perspectiveZoomCutStart = parseFloat(this.model.camera.perspectiveZoomCutStart);
        this.perspectiveZoomCutEnd = parseFloat(this.model.camera.perspectiveZoomCutEnd);
        this.perspectiveFunction = DynamicFunctionParser.prototype.getFunctionByType(this.model.camera.perspectiveZoomType);
        if (this.model.camera.perspectiveZoomCut){
            this.perspectiveFunction = MathFunctions.prototype.cutFunction(this.perspectiveFunction, this.perspectiveZoomCutStart, this.perspectiveZoomCutEnd, this.perspectiveFunction.period);
        }
    }

    this.setSizeMode('absolute','absolute');
    this.setAbsoluteSize(parseFloat(this.model.page.x), parseFloat(this.model.page.y));

    this.cameraBoundRoot.setSizeMode('absolute','absolute');
    this.cameraBoundRoot.setAbsoluteSize(parseFloat(this.model.page.x), parseFloat(this.model.page.y));

    this.setPosition(this.transformer.initialPosition[0], this.transformer.initialPosition[1], this.transformer.initialPosition[2]);
    this.setOrigin(this.transformer.initialOrigin[0], this.transformer.initialOrigin[1], this.transformer.initialOrigin[2]);
    this.setMountPoint(this.transformer.initialMountPoint[0], this.transformer.initialMountPoint[1], this.transformer.initialMountPoint[2]);
    this.setAlign(this.transformer.initialAlign[0], this.transformer.initialAlign[1], this.transformer.initialAlign[2]);
    this.setScale(this.transformer.initialScale[0], this.transformer.initialScale[1], this.transformer.initialScale[2]);
};
PopupPageNode.prototype.contentInserted = function() {
  this.popupNodes.forEach(function(popupNode) {
    popupNode.contentInserted();
  });
};
PopupPageNode.prototype.dismount = function() {
  this.cameraBoundRoot.dismount();
  Famous.core.Node.prototype.dismount.apply(this, arguments);
};

export default PopupPageNode;
