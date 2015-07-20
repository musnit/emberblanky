import Element from './element-prototype';
import RepeatingImage from './repeating-image';
import MathFunctions from '../utils/math-functions';

function OneLineRunOn(node, config) {
  var self = this;
  this.config = config;
  var options = {
    attributes: {},
    properties: {}
  };
  this.timeKeeper = node.timeKeeper;
  Element.apply(this, [node, {myClasses: 'runon-background'}, config]);

  options.tagName = 'div';
  options.myClasses = 'runon-text';
  options.content = '<div class="highlight-text gradient-shadow" title="' +
             config.text + '"><div class="highlight-text-div hightlight-inactive">' +
             config.text +
             '</div></div>';

  this.textChildNode = node.addChild();
  this.textChildNode.setPosition(0, 0, 2);
  this.textChildNode.setAlign(0, 0.5);
  this.textChildNode.setMountPoint(0, 0.3);
  this.textChildNode.domElement = new Element(this.textChildNode, options, config);
  this.textChildNode.updaterComponent = {
      onUpdate: function() {
        //var sizeX = self.textChildNode.getComputedValue().computedValues.size[0];
        var timePassed = self.timeKeeper.timePassed;
        var xPosition = -MathFunctions.prototype.sawToothFunction((timePassed+self.config.timeOffset)/self.config.singSpeed, self.config.singMotion - self.config.sizeX);
        self.textChildNode.setPosition(xPosition, 0, 2);
        self.textChildNode.requestUpdate(this.id);
      }
  };
  this.textChildNode.updaterComponentID = this.textChildNode.addComponent(this.textChildNode.updaterComponent);
  this.textChildNode.updaterComponent.id = this.textChildNode.updaterComponentID;
  this.textChildNode.requestUpdate(this.textChildNode.updaterComponentID);
  this.textChildNode.setOpacity(1);

  this.backgroundChildNode = node.addChild();
  this.backgroundChildNode.setPosition(0, 0, 0);
  this.backgroundChildNode.setOpacity(0.85);
  this.backgroundChildNode.domElement = new RepeatingImage(this.backgroundChildNode, config);
}

OneLineRunOn.prototype = Object.create(Element.prototype);
OneLineRunOn.prototype.constructor = OneLineRunOn;
OneLineRunOn.DEFAULT_OPTIONS = {};

export default OneLineRunOn;
