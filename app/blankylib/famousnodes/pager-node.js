import Famous from 'npm:famous';

function PagerNode() {
    Famous.core.Node.apply(this, arguments);
}

PagerNode.prototype = Object.create(Famous.core.Node.prototype);
PagerNode.prototype.constructor = PagerNode;
PagerNode.prototype.showPage = function(contentNode) {
  this.addChild(contentNode);
  this.currentContent = contentNode;
};
PagerNode.prototype.clearPage = function() {
  this.currentContent.dismount();
};
export default PagerNode;
