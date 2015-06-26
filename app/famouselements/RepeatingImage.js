/*** RepeatingImage.js ***/

define(function(require, exports, module) {
    var Element = require('elements/Element');

    function RepeatingImage(node, config) {
      var options = {
        attributes: {},
        properties: {}
      };
      options.tagName = 'div';
      options.myClasses = 'repeating-image';
      options.properties = {
        'background-image': 'url(\''+ config.url +'\')'
      };

      Element.apply(this, [node, options, config]);
    }

    RepeatingImage.prototype = Object.create(Element.prototype);
    RepeatingImage.prototype.constructor = RepeatingImage;
    RepeatingImage.DEFAULT_OPTIONS = {};

    module.exports = RepeatingImage;
});
