import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';

export default Ember.Component.extend({
  intialPageID: 'UHGPYzstxO',
  setInitialStuff: function(){
    this.set('currentPageID', this.get('intialPageID'));
    this.set('currentPopupName', this.get('currentPage.popups')[0].name);
    this.set('nodesToEdit', this.get('currentPage.popups'));
    this.get('nodesToEdit').push(this.get('currentPage.camera'));
  }.on('init'),
  currentPage: function(){
    return this.get('pages').filterBy('objectId', this.get('currentPageID'))[0];
  }.property('currentPageID'),
  currentNodeEditing: function(){
    return this.get('currentPage.popups').filterBy('name', this.get('currentPopupName'))[0];
  }.property('currentPageID'),
  start: function(){
    var blanky = new BlankyApp(false, this.get('pages'), this.get('intialPageID'));
  }.on('didInsertElement')
});
