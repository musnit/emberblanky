import Famous from 'npm:famous';
import ParameterTransformer from '../utils/parameter-transformer';
import ConfigParser from '../utils/config-parser';
import RepeatingImage from '../famouselements/repeating-image';
import HighlightingText from '../famouselements/highlighting-text';
import Image from '../famouselements/image-element';
import PlainText from '../famouselements/plain-text';
import ChangingPlainText from '../famouselements/changing-plain-text';
import SingalongText from '../famouselements/singalong-text';
import OneLineRunOn from '../famouselements/one-line-run-on';

function _createPopup() {
    var self = this;

    this.parsedConfig = ConfigParser.prototype.parseConfig(this.config, this.model);
    this.transformer = new ParameterTransformer(this.parsedConfig, this.model, this.timeKeeper);
    this.setupInitialState();

    self.transformComponentID = this.transformer.createComponent(self);
    self.requestUpdate(self.transformComponentID);

    var ElementType;
    switch (this.parsedConfig.surfaceType) {
        case 'highlight':
            ElementType = HighlightingText;
            break;
        case 'plain':
            ElementType = PlainText;
            break;
        case 'changingPlain':
            ElementType = ChangingPlainText;
            break;
        case 'repeatingImage':
            ElementType = RepeatingImage;
            break;
        case 'singalong':
            ElementType = SingalongText;
            break;
        case 'oneLineRunOn':
            ElementType = OneLineRunOn;
            break;
        default:
            ElementType = Image;
    }
    this.domElement = new ElementType(this, this.parsedConfig, this.model);

    this.refresherComponent = {
        onUpdate: function() {
            if (self.config.configChanged){
              self.setParsedConfig(ConfigParser.prototype.parseConfig(self.config, self.model));
              self.setupInitialState();
              self.transformer.setParsedConfig(self.parsedConfig);
              self.config.configChanged = false;
            }
            self.requestUpdate(this.id);
        }
    };
    this.refresherComponentID = this.addComponent(this.refresherComponent);
    this.refresherComponent.id = this.refresherComponentID;
    this.requestUpdate(this.refresherComponentID);
}

function PopupNode(config, model, injections) {
    Famous.core.Node.apply(this, arguments);
    this.config = config;
    this.model = model;
    this.timeKeeper = injections.timeKeeper;
    _createPopup.call(this);
    this.contentInserted = function() {
      this.domElement.contentInserted();
    };
}

PopupNode.prototype = Object.create(Famous.core.Node.prototype);
PopupNode.prototype.constructor = PopupNode;
PopupNode.prototype.setupInitialState = function() {
  if (this.parsedConfig.sizeX && this.parsedConfig.sizeY){
    this.setSizeMode('absolute','absolute');
    this.setAbsoluteSize(this.transformer.initialSize[0], this.transformer.initialSize[1]);
  }
  if (this.config.animation && this.parsedConfig.numFrames){
    this.setProportionalSize(1 , this.parsedConfig.numFrames);
  }
  this.setPosition(this.transformer.initialPosition[0], this.transformer.initialPosition[1], this.transformer.initialPosition[2]);
  this.setOrigin(this.transformer.initialOrigin[0], this.transformer.initialOrigin[1], this.transformer.initialOrigin[2]);
  this.setMountPoint(this.transformer.initialMountPoint[0], this.transformer.initialMountPoint[1], this.transformer.initialMountPoint[2]);
  this.setAlign(this.transformer.initialAlign[0], this.transformer.initialAlign[1], this.transformer.initialAlign[2]);
  this.setScale(this.transformer.initialScale[0], this.transformer.initialScale[1], this.transformer.initialScale[2]);
  this.setRotation(this.transformer.initialRotate[0], this.transformer.initialRotate[1], this.transformer.initialRotate[2]);
  this.setOpacity(this.transformer.initialOpacity);
};
PopupNode.prototype.setParsedConfig = function(parsedConfig) {
  this.parsedConfig = parsedConfig;
  this.domElement.setParsedConfig(parsedConfig);
};

export default PopupNode;
