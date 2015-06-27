import Ember from 'ember';

export default Ember.TextField.extend({
    input: function(){
        this.get('node').configChanged = true;
    }
});
