import Ember from 'ember';
import Fixtures from 'emberblanky/blankylib/fixtures/blanky-fixtures';

export default Ember.Route.extend({
  model: function(){
    return Fixtures.results;
  }
});
