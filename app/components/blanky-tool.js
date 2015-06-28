import Ember from 'ember';

import BlankyApp from 'emberblanky/utils/blanky-app';

export default Ember.Component.extend({
  paused: false,
  pageTime: 0,
  hiddenOverflow: false,
  intialPageID: 'UHGPYzstxO',
  surfaceTypes: [
    {'label': 'Image' , 'value': 'image' },
    {'label': 'Plain' , 'value': 'plain' },
    {'label': 'Highlight', 'value': 'highlight' },
    {'label': 'Singalong', 'value': 'singalong' },
    {'label': 'ChangingPlainText', 'value': 'changingPlain' },
    {'label': 'OneLineRunOn', 'value': 'oneLineRunOn' },
    {'label': 'RepeatingImage', 'value': 'repeatingImage' },
  ],
  motionTypes: [
    {'label': 'Sine' , 'value': 'sine' },
    {'label': 'Triangle' , 'value': 'triangle' },
    {'label': 'Sawtooth', 'value': 'sawtooth' },
    {'label': 'Cos', 'value': 'cos' }
  ],
  currentNodeIsCamera: Ember.computed.equal('currentNode.name','camera'),
  updateTime: function(){
    this.get('blanky').setTime(this.get('pageTime'));
  }.observes('pageTime'),
  setInitialStuff: function(){
    this.set('currentPageID', this.get('intialPageID'));
    this.set('currentNodeName', 'camera');
  }.on('init'),
  nodesToEdit: function(){
    var nodes = this.get('currentPage.popups')
    return nodes.concat(this.get('currentPage.camera'));
  }.property('currentPage,currentPage.popups,currentPage.popups.[]'),
  soundsToEdit: function(){
    var sounds = this.get('currentPage.sounds')
    return sounds;
  }.property('currentPage.sounds,currentPage.sounds.[]'),
  currentPage: function(){
    if (this.get('blanky')){
      this.get('blanky').clearPage();
      this.get('blanky').loadPage(this.get('currentPageID'));
    }
    return this.get('pages').filterBy('objectId', this.get('currentPageID'))[0];
  }.property('currentPageID'),
  currentNode: function(){
    var node = this.get('nodesToEdit').filterBy('name', this.get('currentNodeName'))[0];
    return node;
  }.property('currentNodeName,currentPage'),
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
    },
    addNewPopup: function(){
      var defaultPopup = {'accel':false,'accelAmount':'1','height':'1','initialX':'0','initialY':'0','name':'new','rotateAngle':'100','rotateSpeed':'2000','scale':'1','scaleX':'1','scaleY':'1','timeOffset':'0','timer':{'initialTime':1419434956210},'translate':false,'translateX':'0','translateXSpeed':'1000','translateY':'0','translateYSpeed':'1000','url':'','xyRatio':'1','zoomAmount':'0','zoomSpeed':'2000'};
      this.get('currentPage.popups').push(defaultPopup);
      this.set('currentNodeName', 'new');
      this.notifyPropertyChange('nodesToEdit');
    },
    removeCurrentPopup: function(){
      if(this.get('currentNode.name') === 'camera'){
        alert('cannot remove camera!');
      }
      else{
        var index = this.get('currentPage.popups').indexOf(this.get('currentNode'));
        this.get('currentPage.popups').splice(index, 1);
        this.notifyPropertyChange('nodesToEdit');
        this.set('currentNodeName', 'camera');
      }
    },
    addNewSound: function(){
        this.set('currentPage.sounds', this.get('currentPage.sounds') || []);
        this.get('currentPage.sounds').push({name: '', url:''});
        this.notifyPropertyChange('soundsToEdit');
    },
    removeSound: function(sound){
        var index = this.get('currentPage.sounds').indexOf(sound);
        this.get('currentPage.sounds').splice(index, 1);
        this.notifyPropertyChange('soundsToEdit');
    },
    saveCurrentPage: function(){
      var pageModel = this.get('currentPage');
      var pageJSON = JSON.parse(JSON.stringify(pageModel));
      this.sendAction('save', pageJSON);
    },
    dupeCurrentPage: function(){
      var pageModel = this.get('currentPage');
      var pageJSON = JSON.parse(JSON.stringify(pageModel));
      this.sendAction('dupe', pageJSON);
    },
    newPage: function(){
      this.sendAction('new');
    }
  }
});
