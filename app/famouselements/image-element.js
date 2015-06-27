import Element from 'emberblanky/famouselements/element-prototype';

function Image(node, config) {
  var options = {
    attributes: {},
    properties: {}
  };
  options.tagName = 'img';
  options.attributes = {
    'src': config.url
  };

  Element.apply(this, [node, options, config]);
}

Image.prototype = Object.create(Element.prototype);
Image.prototype.constructor = Image;
Image.DEFAULT_OPTIONS = {};

export default Image;
