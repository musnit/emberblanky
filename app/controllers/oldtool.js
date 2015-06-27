import Ember from 'ember';
//import Famous from 'npm:famous';
//import Fixtures from 'bookanimation';
import BlankyApp from 'BlankyApp';
import Parse from 'Parse';
import rivets from 'rivets';

export default Ember.Controller.extend({
  start: function(){
    var blanky = new BlankyApp();

    Parse.initialize('U0A3f3L3EHbQpF8Oig2zhlOasUF6PhJkTOQOvjoH', 'aNTIn2zXGxzAEl8BLOnHzuWvaOYySN5QqHPLgA1X');
    var Page = Parse.Object.extend('Page');

    var PageCollection = Parse.Collection.extend({
      model: Page
    });
    var pageCollection = new PageCollection();
    var self = this;
    pageCollection.fetch({
      success: function(pages) {
        var pagesModel = {};
        pagesModel.pages = pages.toJSON();
        window.pagesModel = pagesModel;
        var pagesListView = window.pagesListView || rivets.bind(document.getElementById('editor-section'), pagesModel);
        window.pagesListView = pagesListView;
        window.pagesListView.unbind();
        window.pagesListView.models = pagesModel;
        window.pagesListView.bind();
        document.getElementById('page-chooser').value = window.initialPageId;
        self.loadPage(window.initialPageId);
      },
      error: function(collection, error) {
        alert('error with fetching' + collection + ': ' + error);
      }
    });

    var saver = {};
    saver.saveToParse = function() {
        var self = this;
        var page = new this.Page();
        this.model.objectId = this.currentPageID;
        page.save(this.model, {
          success: function() {
            window.saver.model.objectId = self.currentPageID;
            alert('saved successfully!');
          }
        });
    };
    saver.addNewPopup = function() {
        var defaultPopup = {'accel':false,'accelAmount':'1','height':'1','initialX':'0','initialY':'0','name':'new','rotateAngle':'100','rotateSpeed':'2000','scale':'1','scaleX':'1','scaleY':'1','timeOffset':'0','timer':{'initialTime':1419434956210},'translate':false,'translateX':'0','translateXSpeed':'1000','translateY':'0','translateYSpeed':'1000','url':'','xyRatio':'1','zoomAmount':'0','zoomSpeed':'2000'};
        this.model.popups.push(defaultPopup);
    };
    saver.removePopup = function() {
        var editPopup = this.model.editPopup[0];
        var index = this.model.popups.indexOf(editPopup);
        this.model.popups.splice(index, 1);
        window.editChanger.changeEditing();
    };
    saver.addFrame = function() {
        var editPopup = this.model.editPopup[0];
        editPopup.frames = editPopup.frames || [];
        editPopup.frames.push({url:''});
    };
    saver.deleteFrame = function(frame) {
        var editPopup = this.model.editPopup[0];
        var frameTDs = frame.parentElement.parentElement.children;
        var frameTDsArray = [].slice.call(frameTDs);
        var clickedIndex = frameTDsArray.indexOf(frame.parentElement) - 1;
        editPopup.frames.splice(clickedIndex, 1);
    };
    saver.addSound = function() {
        this.model.sounds = this.model.sounds || [];
        this.model.sounds.push({name: '', url:''});
    };
    saver.deleteSound = function(sound) {
        var soundTDs = sound.parentElement.parentElement.children;
        var soundTDsArray = [].slice.call(soundTDs);
        var clickedIndex = soundTDsArray.indexOf(sound.parentElement) - 1;
        this.model.sounds.splice(clickedIndex, 1);
    };
    saver.dupePage = function() {
        var page = new this.Page();
        page.set('name', 'dup of ' + this.model.name);
        page.set('device', this.model.device);
        page.set('popups', this.model.popups);
        page.set('camera', this.model.camera);
        page.set('page', this.model.page);
        page.set('sounds', this.model.sounds);
        page.save(null, {
          success: function(page) {
            alert('Duplicate page created with objectId: ' + page.id);
          },
          error: function(page, error) {
            alert('Failed to create new page, with error code: ' + error.message);
          }
        });
    };
    saver.addNewPage = function() {
        var page = new this.Page();
        var defaultCamera = {'height':'0','initialX':'0','initialY':'0','motionType':'sine','name':'camera','rotateAngle':'100','rotateSpeed':'2000','scale':'1','timeOffset':'100','translate':false,'translateX':'0','translateXSpeed':'5000','translateY':'200','translateYSpeed':'18000','xyRatio':'1','zoomAmount':'0','zoomSpeed':'2000'};
        var defaultPage = {'name':'new','x':'900','y':'1200'};
        page.set('name', 'new');
        page.set('device', 'new');
        page.set('popups', []);
        page.set('camera', defaultCamera);
        page.set('page', defaultPage);

        page.save(null, {
          success: function(page) {
            alert('New page created with objectId: ' + page.id);
          },
          error: function(page, error) {
            alert('Failed to create new page, with error code: ' + error.message);
          }
        });
    };
    window.saver = saver;

  }.on('init')
});