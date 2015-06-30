import Ember from 'ember';
import Fixtures from 'emberblanky/blankylib/fixtures/blanky-fixtures';

export default Ember.Route.extend({
  model: function(){
    Fixtures.results.forEach(function(page){
      page.fullName = page.page.name + ' - ' + page.device + ' - ' + page.name + ' - ' + page.objectId;
    });
    return Fixtures.results.sortBy('page.name');
  }
});
