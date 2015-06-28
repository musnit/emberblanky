import Ember from 'ember';
import Fixtures from 'emberblanky/blankylib/fixtures/blanky-fixtures';
var Page = Parse.Object.extend('Page');
var PageCollection = Parse.Collection.extend({
  model: Page
});

export default Ember.Route.extend({
  setupParse: function(){
      Parse.initialize('jMRxP9yPhtv1P9g3oPtrKYhIgwkhZAgD7XPRBwwp', 'WIkGloO6EWK8WakPrFnLpajSvM1kAzsOgB4bPbl4');
  }.on('init'),
  model: function(){
    var self = this;
    return this.getPages().then(
      function(pages) {
        pages.forEach(function(page){
          page.fullName = page.page.name + ' - ' + page.device + ' - ' + page.name + ' - ' + page.objectId
        });
        return pages.sortBy('page.name');
      }, function(reason) {
        alert('issue with loading data from parse: ' + reason);
        self.transitionTo('fixture-tool');
      }
    );
  },
  getPages: function() {
    return new Promise(function(resolve, reject){
      var pageCollection = new PageCollection();
      pageCollection.fetch({
        success: function(pages) {
          resolve(pages.toJSON());
        },
        error: function(collection, error) {
          reject(new Error('error with fetching' + collection + ': ' + error));
        }
      });
    });
  },
  actions: {
    savePage: function(pageJSON){
      var page = new Page();
      page.save(pageJSON, {
        success: function() {
          alert('saved successfully!');
        }
      });
    },
    dupePage: function(pageJSON) {
      var page = new Page();
      page.set('name', 'dup of ' + pageJSON.name);
      page.set('device', pageJSON.device);
      page.set('popups', pageJSON.popups);
      page.set('camera', pageJSON.camera);
      page.set('page', pageJSON.page);
      page.set('sounds', pageJSON.sounds);
      page.save(null, {
        success: function(page) {
          alert('Duplicate page created with objectId: ' + page.id);
        },
        error: function(page, error) {
          alert('Failed to create new page, with error code: ' + error.message);
        }
      });
    },
    newPage: function(){
      var page = new Page();
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
    }
  }
});
