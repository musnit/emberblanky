import Ember from 'ember';

import BlankyApp from 'emberblanky/blankylib/utils/blanky-app';

export default Ember.Component.extend({
  loopNum: 1,
  loopingIDs: [
    'Tk0HHLTeBU', //portrait hands
    '6usYlEkJfA', //desk, squashed basic pull
    'cQE07NGbHk', //desk, basic pull back runon
    'w9zCNnEbfC', //pirate, runon
    'rZ4dWe9BGU', //car, static car
  ],
  start: function(){
    this.set('blanky', new BlankyApp(false, this.get('pages'), this.get('loopingIDs')[0]));
    this.set('width', document.getElementById('device-screen').getBoundingClientRect().width);
  }.on('didInsertElement'),
  click: function(event){
    var x = event.clientX;
    if (x < this.get('width')/2){
      window.orientationController.reset();
      $('#debug-overlay').text(window.orientationController.peekOrientationDifference(Date.now()));
    }
    else {
      var ids = this.get('loopingIDs');
      var num = this.get('loopNum');
      this.get('blanky').clearPage();
      this.get('blanky').loadPage(ids[num%ids.length]);
      this.set('loopNum', num + 1);
    }
  }
});
