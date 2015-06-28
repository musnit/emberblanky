import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';
import Fixtures from 'emberblanky/utils/blanky-fixtures';

export default Ember.Component.extend({
  loopNum: 1,
  loopingIDs: ['UHGPYzstxO','gBqF9PtfBm','w9zCNnEbfC','mt1s3uZ90p','rZ4dWe9BGU'],
  start: function(){
    var self = this;
    var clicked = function(event) {
        var x = event.clientX;
        if (x < document.getElementById('device-screen').getBoundingClientRect().width/2){
            window.orientationController.reset();
        }
        else {
            var ids = self.get('loopingIDs');
            var num = self.get('loopNum');
            self.get('blanky').clearPage()
            self.get('blanky').loadPage(ids[num%ids.length]);
            self.set('loopNum', num + 1);
        }
    };
    this.set('blanky', new BlankyApp(false, this.get('pages')));
    document.getElementById('top-screen').addEventListener('click', clicked, false);
  }.on('didInsertElement')
});
