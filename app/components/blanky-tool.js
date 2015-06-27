import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';

export default Ember.Component.extend({
  paused: false,
  pageTime: 0,
  intialPageID: 'UHGPYzstxO',
  updateTime: function(){
    this.get('blanky').setTime(this.get('pageTime'));
  }.observes('pageTime'),
  setInitialStuff: function(){
    this.set('currentPageID', this.get('intialPageID'));
    this.set('currentNodeName', 'george');
    this.set('nodesToEdit', this.get('currentPage.popups'));
    this.get('nodesToEdit').push(this.get('currentPage.camera'));
  }.on('init'),
  currentPage: function(){
    if (this.get('blanky')){
      this.get('blanky').clearPage();
      this.get('blanky').loadPage(this.get('currentPageID'));
    }
    return this.get('pages').filterBy('objectId', this.get('currentPageID'))[0];
  }.property('currentPageID'),
  currentNode: function(){
    var node = this.get('currentPage.popups').filterBy('name', this.get('currentNodeName'))[0];
    return node;
  }.property('currentNodeName'),
  start: function(){
    this.set('blanky', new BlankyApp(false, this.get('pages'), this.get('intialPageID')));
  }.on('didInsertElement'),
  actions:
  {
    pausePlay: function(){
      if (this.get('paused')){
        this.get('blanky').playPage();
      }
      else{
        this.get('blanky').pausePage();
      }
      this.toggleProperty('paused');
    },
    setTime: function(time){
      this.get('blanky').setTime(time);
    }
  }
});
