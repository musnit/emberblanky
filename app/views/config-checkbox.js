import Ember from 'ember';

export default Ember.Checkbox.extend({
    click: function(){
        this.get('node').configChanged = true;
    }
});
