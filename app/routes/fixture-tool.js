import Ember from 'ember';
import Fixtures from 'emberblanky/utils/blanky-fixtures';

export default Ember.Route.extend({
  model: function(){
    return Fixtures.results;
  }
});
