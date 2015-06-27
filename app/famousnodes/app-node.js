import Famous from 'npm:famous';
var Node = Famous.core.Node;
import PopupPageNode from 'emberblanky/famousnodes/popup-page-node';
import PagerNode from 'emberblanky/famousnodes/pager-node';

function AppNode(scene, topScene) {
    Node.apply(this, arguments);
    scene.addChild(this);
    this.pagerNode = new PagerNode();
    this.addChild(this.pagerNode);
    this.scene = scene;
    this.topScene = topScene;
}

AppNode.prototype = Object.create(Node.prototype);
AppNode.prototype.constructor = AppNode;
AppNode.prototype.createAndShowPage = function(pageJSON, injections) {
    this.contentNode = new PopupPageNode(pageJSON, this.scene, this.topScene, injections);
    this.pagerNode.showPage(this.contentNode);
};
AppNode.prototype.clearPage = function() {
    this.pagerNode.clearPage();
};
AppNode.DEFAULT_OPTIONS = {};

export default AppNode;
