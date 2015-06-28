import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';
import Fixtures from 'emberblanky/utils/blanky-fixtures';

export default Ember.Component.extend({
  loopNum: 1,
  loopingIDs: ['UHGPYzstxO','gBqF9PtfBm','w9zCNnEbfC','mt1s3uZ90p','rZ4dWe9BGU'],
  start: function(){
    this.set('blanky', new BlankyApp(false, this.get('pages')));
    this.set('width', document.getElementById('device-screen').getBoundingClientRect().width);
  }.on('didInsertElement'),
  click: function(event){
    var x = event.clientX;
    if (x < this.get('width')/2){
        window.orientationController.reset();
    }
    else {
        var ids = this.get('loopingIDs');
        var num = this.get('loopNum');
        this.get('blanky').clearPage()
        this.get('blanky').loadPage(ids[num%ids.length]);
        this.set('loopNum', num + 1);
    }
  }
});
