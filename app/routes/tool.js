import Ember from 'ember';
import Fixtures from 'emberblanky/utils/blanky-fixtures';

export default Ember.Route.extend({
  model: function(){
    var self = this;
    return this.getParse().then(
      function(pages) {
        pages.forEach(function(page){
          page.fullName = page.page.name + ' - ' + page.device + ' - ' + page.name + ' - ' + page.objectId
        });
        return pages.sortBy('page.name');
      }, function(reason) {
        alert('issue with loading data from parse: ' + reason);
        Parse.initialize('fake', 'fake');
        self.transitionTo('fixture-tool');
      }
    );
  },
  getParse: function(url) {
    return new Promise(function(resolve, reject){
      Parse.initialize('jMRxP9yPhtv1P9g3oPtrKYhIgwkhZAgD7XPRBwwp', 'WIkGloO6EWK8WakPrFnLpajSvM1kAzsOgB4bPbl4');
      var Page = Parse.Object.extend('Page');

      var PageCollection = Parse.Collection.extend({
        model: Page
      });
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
  }
});
